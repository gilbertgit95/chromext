import axios from 'axios'
import moment from 'moment'
import 'regenerator-runtime/runtime'

export default class DS {
	constructor(props) {
		// data source type: 'remote', 'static'
		this.type = props.type? props.type: 'remote'

		// cacheTime in minutes
		this.cacheTime = props.cacheTime? props.cacheTime: 10

		// request type
		this.requestMethod = props.requestMethod? props.requestMethod: null

		// request header
		this.requestHeader = props.requestHeader? props.requestHeader: null

		// req data
		this.requestData = props.requestData? props.requestData: null

		// url
		this.requestURL = props.requestURL? props.requestURL: null

		// other options
		this.otherOptions = props.otherOptions? props.otherOptions: {}

		// axios
		this.axios = props.axios? props.axios: axios

		// properties that should only be use inside an object
		// cache moment use to check if the cache time olready expired
		this.cacheMoment = null

		// fetching data
		this.inprogress = false
	}

	setConfig(props) {
		// data source type: 'remote', 'static'
		if (props.type) this.type = props.type

		// cacheTime in seconds
		if (props.cacheTime) this.cacheTime = props.cacheTime

		// request type
		if (props.requestMethod) this.requestMethod = props.requestMethod

		// request header
		if (props.requestHeader) this.requestHeader = props.requestHeader

		// req data
		if (props.requestData) this.requestData = props.requestData

		// url
		if (props.requestURL) this.requestURL = props.requestURL

		// other options
		if (props.otherOptions) this.otherOptions = props.otherOptions

		// axios
		if (props.axios) this.axios = props.axios
	}

	setCacheMoment() {
		this.cacheMoment = moment().add(this.cacheTime, 'minutes')
	}

	cacheMomentIsInvalid() {
		// check if the moment is empty
		if (!this.cacheMoment) return true

		// check if the cache moment is expired
		// then set to null
		if (moment().isAfter(this.cacheMoment)) {
			this.cacheMoment = null
			return true
		}

		return false
	}

	fetch() {
		return this.axios({
			...{
				method: this.requestMethod,
				url: this.requestURL,
				data: this.requestData
			},
			...this.otherOptions
		})
	}	

	async getData(source, callback) {
		if (typeof callback == 'function') {
			// run the process below if the data type is static
			if (this.type == 'static') {
				// console.log('static callback')
				return callback(source, null)
			}

			// run the process below if the data type is remote
			if (this.type == 'remote') {
				// console.log('remote')
				if (!this.cacheMomentIsInvalid()) {
					// console.log('cacheMomentIsInvalid callback')
					return callback(source, null)
				}

				if (this.inprogress) {
					return callback(source, null)
				}

				this.inprogress = true
				try {
					// console.log('before fetch')
					let data = await this.fetch()
					// console.log('after fetch')

					this.inprogress = false
					this.setCacheMoment()

					// console.log('remote callback')
					return callback(data.data, null)
				} catch (err) {
					this.inprogress = false
					this.setCacheMoment()
					// console.log('err remote callback')
					return callback(source, err)
				}
			}
		}
	}
}
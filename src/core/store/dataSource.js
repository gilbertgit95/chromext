import axios from 'axios'
import moment from 'moment'

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
				return callback(source, null)
			}

			// run the process below if the data type is remote
			if (this.type == 'remote') {
				if (this.cacheMomentIsInvalid()) {
					return callback(source, null)
				}

				if (this.cacheMomentIsInvalid()) {
					return callback(source, null)
				}

				this.inprogress = true
				try {

					let data = await this.fetch()

					this.inprogress = false
					this.setCacheMoment()

					return callback(data, null)
				} catch (err) {
					this.inprogress = false
					this.setCacheMoment()

					return callback(source, err)
				}
			}
		}
	}
}
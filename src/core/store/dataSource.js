import axios from 'axios'
import moment from 'moment'
import 'regenerator-runtime/runtime'

export default class DS {
	constructor(props) {
		// data source type: 'remote', 'static'
		this.type = props.type? props.type: 'remote'

		// cacheTime in minutes
		this.cacheTime = props.cacheTime? props.cacheTime: 10

		// cacheKey String
		this.cacheKey = props.cacheKey? props.cacheKey: ''

		// request type
		this.method = props.method? props.method: null

		// request header
		this.headers = props.headers? props.headers: null

		// req data
		this.data = props.data? props.data: null

		// url
		this.url = props.url? props.url: null

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

		// cacheKey String
		if (props.cacheKey) {
			// if new key is not the same as the old key,
			// reset the cache moment
			if (this.cacheKey !== props.cacheKey) {
				this.cacheMoment = null
			}
			this.cacheKey = props.cacheKey
		}

		// request type
		if (props.method) this.method = props.method

		// request header
		if (props.headers) this.headers = props.headers

		// req data
		if (props.data) this.data = props.data

		// url
		if (props.url) this.url = props.url

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
				method: this.method,
				url: this.url,
				data: this.data
			},
			...this.otherOptions
		})
	}

	async setData(source, callback) {
		if (typeof callback == 'function') {
			// local storage
			if (this.type == 'localstorage') {
				let storeName = `${ source.groupName }.${ source.storeName }`

				localStorage.setItem(storeName, JSON.stringify(source.dataValue))
				// return callback(source.dataValue, null)
			}
		}
	}

	async getData(source, callback) {
		if (typeof callback == 'function') {
			// run the process below if the data type is static
			if (this.type == 'static') {
				// console.log('static callback')
				return callback(source.dataValue, null)
			}

			// local storage
			if (this.type == 'localstorage') {
				let storeName = `${ source.groupName }.${ source.storeName }`
				let storeVal = localStorage.getItem(storeName)

				// parse storedVal
				if (storeVal) storeVal = JSON.parse(storeVal)

				if (!source.dataValue) {
					return callback(storeVal, null)
				}
				return callback(source.dataValue, null)
			}

			// run the process below if the data type is remote
			if (this.type == 'remote') {
				// console.log('remote')
				if (!this.cacheMomentIsInvalid()) {
					// console.log('cacheMomentIsInvalid callback')
					return callback(source.dataValue, null)
				}

				// if in progress return the current value
				if (this.inprogress) {
					return callback(source.dataValue, null)
				}

				// check for the request requirements
				if (this.url && this.method) {
					return callback(source.dataValue, null)
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

					// this.setCacheMoment()
					// console.log('err remote callback')
					// return callback(source.dataValue, err)

					this.cacheMoment = null
					return callback(null, err)

				}
			}
		}
	}
}
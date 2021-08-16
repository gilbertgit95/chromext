import DS from './dataSource.js'
import { message } './../utilities/'

class Store {
	constructor(config) {
		this.groupName = config.groupName
		this.storeName = config.storeName
		this.dataValue = config.initialValue

		this.ds = new DS(config.dataSource? config.dataSource: {type: 'static'})
	}

	setConfig(config) {
		if (config.initialValue) this.dataValue = config.initialValue
		if (config.dataSource) this.ds = new DS(config.dataSource)
	}

	onChange() {
		// send <group_name>.<store_name>
		// to popup and the active tab
		
	}

	get value() {
		this.ds.getData(this.dataValue, (data, err) => {
			if (err) {
				console.log(JSON.stringify(err))
			}

			this.value = data
		})
		return this.dataValue
	}

	set value(val) {
		this.dataValue = val
		this.onChange()
	}
}

export default Store
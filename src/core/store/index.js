import DS from './dataSource.js'

class Store {
	constructor(config) {
		this.groupName = config.groupName
		this.storeName = config.storeName
		this.dataValue = config.initialValue

		this.ds = new DS(config.dataSource? config.dataSource: {type: 'static'})

		this.onChange = null
	}

	setConfig(config) {
		if (config.initialValue) this.dataValue = config.initialValue
		if (config.dataSource) this.ds.setConfig(config.dataSource)
	}

	onCallback() {

		if (typeof this.onChange == 'function') {
			this.onChange({
				dataValue: this.dataValue,
				groupName: this.groupName,
				storeName: this.storeName,
				inprogress: this.ds.inprogress
			})
		}
		
	}

	get value() {
		this.ds.getData(
			{
				dataValue: this.dataValue,
				groupName: this.groupName,
				storeName: this.storeName
			},
			// has onChange event
			(data, err) => {
				if (err) {
					console.log(JSON.stringify(err))
					this.value = {error: err}
				} else {
					this.value = data
				}
			},
			// no onchange event
			(data, err) => {
				if (err) {
					console.log(JSON.stringify(err))
					this.dataValue = {error: err}
				} else {
					this.dataValue = data
				}
			}
		)

		return {
			dataValue: this.dataValue,
			groupName: this.groupName,
			storeName: this.storeName,
			inprogress: this.ds.inprogress
		}
	}

	set value(val) {
		this.ds.setData(
			{
				dataValue: val,
				groupName: this.groupName,
				storeName: this.storeName
			},
			(data, err) => {
				if (err) console.log(JSON.stringify(err))

				this.dataValue = data
				this.onCallback()
			}
		)

		this.dataValue = val
		this.onCallback()
	}
}

export default Store
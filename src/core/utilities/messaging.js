import 'regenerator-runtime/runtime'

export const messaging = {
	// msg listener
	listen(callback) {
		// has listener insures that there should be only one listener
		// on a single instance
		if (!window.hasListener) {
			window.hasListener = true
			chrome.runtime.onMessage.addListener((msg, sender, response) => {
			    if (typeof callback == 'function') {
			    	callback(msg, sender, response)
				}
			})
		}
	},

	// send to tab
	async sendToContent(msg) {
		return new Promise((resolve, reject) => {
			try {
				chrome.tabs.query(
					{ active: true, currentWindow: true },
					(tabs) => {
					  if (tabs && tabs.length && tabs[0].id) {
					  	chrome.tabs.sendMessage(
						  	tabs[0].id, msg,
						  	(response) => {
						    	resolve(response)
						  	}
						)
					  }
					}
				)
			} catch (err) {
				reject(err)
			}
		})
	},

	// send to extension
	async sendToExtension(msg) {
		return new Promise((resolve, reject) => {
			try {
				chrome.runtime.sendMessage(msg, (response) => {
				  resolve(response)
				})
			} catch (err) {
				reject(err)
			}
		})
	},

	// endpoint handler
	messageHandler() {
		return new MSGHandler()
	}
}

class MSGHandler {
	constructor() {
		this.msgData = null
		this.done = false
	}

	msg(msgData) {
		if (msgData) {
			this.msgData = msgData
			this.done = false
		}

		return this
	}

	handle(endpoint, callback) {
		if (   endpoint
			&& !this.done
			&& this.msgData
			&& this.msgData.endpoint
			&& this.msgData.endpoint == endpoint
			&& typeof callback == 'function') {
			this.done = true
			callback()
		}

		return this
	}

	default(callback) {
		if (!this.done && typeof callback == 'function') {
			callback()
		}
	}
}
import 'regenerator-runtime/runtime'

export const messaging = {
	// msg listener
	listen(callback) {
		// has listener insures that there should be only one listener
		// on a single instance
		if (window.hasListener) {
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
					  chrome.tabs.sendMessage(
					  	tabs[0].id, msg,
					  	(response) => {
					    	resolve(response)
					  	}
					  )
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
				chrome.runtime.sendMessage(msg, function(response) {
				  resolve(response)
				})
			} catch (err) {
				reject(err)
			}
		})
	}
}
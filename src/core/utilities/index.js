import { messaging } from './messaging.js';

// messaging services
export const msg = messaging

// wait services
export const wait = {
	restFor(seconds) {
		let time = seconds? seconds: 1

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true)
			}, time * 1e3)
		})
	}
}
import { messaging } from './messaging.js';
// import { phoneUtils } from './phone_number_util.js';

// messaging services
export const msg = messaging

// phone utilities
// export const phoneUtil = phone

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
import type { ConcurrencyRequestOption, UrlLike } from "../shared"

export const concurrencyRequest = <T>(
	urls: UrlLike[],
	option: ConcurrencyRequestOption
) => {
	const { concurrent = 5, onProgress = () => {} } = option
	return new Promise((resolve) => {
		if (urls.length === 0) {
			resolve([])
			return
		}
		const results: (T | unknown)[] = []
		let index = 0
		let count = 0

		async function request() {
			if (index === urls.length) return
			const i = index
			const url = urls[index]
			index++

			onProgress(i, urls.length)

			try {
				results[i] = (await fetch(url)).statusText
			} catch (err) {
				results[i] = err
			} finally {
				count++
				if (count === urls.length) resolve(results)

				request()
			}
		}

		const times = Math.min(concurrent, urls.length)
		for (let i = 0; i < times; i++) {
			request()
		}
	})
}

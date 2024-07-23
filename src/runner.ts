import { concurrencyRequest } from "."

const urls = []
for (let i = 1; i <= 152; i++) {
	urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}
console.time("concurrencyRequest")

concurrencyRequest(urls, {
	concurrent: 12,
	onProgress: (load, total) => {
		console.log(`${Math.floor((load / total) * 100)}%`)
	},
}).then((res) => {
	console.log(res)
	console.timeEnd("concurrencyRequest")
})

export interface ConcurrencyRequestOption {
	concurrent: number
	onProgress?: (loaded: number, total: number) => void
}

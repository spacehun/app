/**
 * Listado de podcasts
 */
export async function fetchPodcasts() {
	const URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
	const response = await fetch(URL)
	const data = await response.json()
	return data.feed.entry.map(podcast => (
		{
			id: podcast.id.attributes['im:id'],
			name: podcast['im:name'].label,
			author: podcast['im:artist'].label,
			// 0: 55x55
			// 1: 60x60
			// 2: 170x170
			image: podcast['im:image'][2].label,
		}
	))
}

/**
 * Información de un podcast
 */
export async function fetchPodcast(podcast) {

	const url =`https://itunes.apple.com/lookup?id=${podcast}`
	const proxy =`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
	const response = await fetch(proxy)
	const data = await response.json()
	const item = JSON.parse(data.contents).results[0]
	return {
		title: item.collectionName,
		author: item.artistName,
		// La descripción no aparece
		description: item.genres.join(', '),
		image: item.artworkUrl100,
	}
}

async function proxy(url) {
	const proxy =`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
	const response = await fetch(proxy)
	const data = await response.json()
	return JSON.parse(data.contents)
}

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
	const data = await proxy(url) 
	const item = data.results[0]
	return {
		title: item.collectionName,
		author: item.artistName,
		// La descripción no aparece
		description: item.genres.join(', '),
		image: item.artworkUrl100,
	}
}

/**
 * Episodios de un podcast
 */
export async function fetchEpisodes(podcast) {

	const url =`https://itunes.apple.com/lookup?id=${podcast}&entity=podcastEpisode`
	const data = await proxy(url) 
	const items = data.results.slice(1)
	const episodes = []
	for (const item of items) {
		const duration = new Date(null)
		duration.setSeconds(Math.round(item.trackTimeMillis / 1000))
		episodes.push({
			code: item.trackId,
			title: item.trackName,
			date: item.releaseDate,
			duration: duration.toISOString().substr(11, 8),
		})
	}
	return episodes
}

/**
 * Información de un episodio
 */
export async function fetchEpisode(podcast, episode) {

	const url =`https://itunes.apple.com/lookup?id=${podcast}&trackId=${episode}&entity=podcastEpisode`
	const data = await proxy(url) 
	const items = data.results
	for (const item of items) {
		if (item.kind === 'podcast-episode' && item.trackId == episode) {
			return {
				title: item.trackName,
				description: item.description,
				audio: item.episodeUrl,
			}
		}
	}
}

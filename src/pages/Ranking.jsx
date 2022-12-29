import Fuse from 'fuse.js'
import PodcastSummary from '../components/PodcastSummary'
import { fetchPodcasts } from '../api.js'
import { useQuery } from 'react-query'
import { useState } from 'react'
import '../styles/Ranking.css'

const Ranking = () => {

	const [ pattern, setPattern ] = useState('')

	// Descargar
	const { data, isLoading } = useQuery({
		queryKey: 'podcasts',
		queryFn: fetchPodcasts,
		cacheTime: 1000 * 60 * 60 * 24,
	})
	if (isLoading) {
		return (
			<p>Cargando</p>
		)
	}

	// Renderizar
	const fuse = new Fuse(data, {
		keys: ['name', 'author'],
	})
	let entries
	if (pattern) {
		// Filtrar
		const match = fuse.search(pattern)
		entries = match.map(({item}) => (
			<PodcastSummary id={item.id} name={item.name} author={item.author} image={item.image}/>
		))
	} else {
		// No filtrar: mostrar todos
		entries = data.map(({id, name, author, image}) => (
			<PodcastSummary id={id} name={name} author={author} image={image}/>
		))
	}
	return (
		<div className="ranking">
			<input type="text" onChange={event => {setPattern(event.target.value)}}/>
			<div>
				{entries}
			</div>
		</div>
	)
}

export default Ranking

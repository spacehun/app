import PodcastSummary from '../components/PodcastSummary'
import { fetchPodcasts } from '../api.js'
import { useQuery } from 'react-query'

const Ranking = () => {

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
	const entries = data.map(({id, name, author, image}) => (
		<PodcastSummary id={id} name={name} author={author} image={image}/>
	))
	return (
		<div>
			<input type="text"/>
			<div>
				{entries}
			</div>
		</div>
	)
}

export default Ranking

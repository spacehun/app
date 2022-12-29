import { fetchEpisode } from '../api.js'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

const Episode = () => {

	const { podcast, episode } = useParams()

	// Descargar
	const { data, isLoading } = useQuery({
		queryKey: ['episode', podcast, episode],
		queryFn: () => fetchEpisode(podcast, episode),
		cacheTime: 1000 * 60 * 60 * 24,
	})
	if (isLoading) {
		return (
			<p>Cargando</p>
		)
	}
	const {title, description, audio} = data

	// Renderizar
	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>
			<audio controls>
				<source src={audio} type="audio/mpeg"/>
			</audio>
		</div>
	)
}

export default Episode

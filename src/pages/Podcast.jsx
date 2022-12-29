import EpisodeSummary from '../components/EpisodeSummary'
import { fetchEpisodes } from '../api.js'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

const Podcast = () => {

	const { podcast } = useParams()

	// Descargar
	const { data, isLoading } = useQuery({
		queryKey: ['episodes', podcast],
		queryFn: () => fetchEpisodes(podcast),
		cacheTime: 1000 * 60 * 60 * 24,
	})
	if (isLoading) {
		return (
			<p>Cargando</p>
		)
	}

	// Renderizar
	const entries = data.map(({code, title, date, duration}) => (
		<EpisodeSummary podcast={podcast} id={code} title={title} date={date} duration={duration}/>
	))
	return (
		<div>
			<p>{'Episodes: ' + data.length}</p>
			<div>
				<p>Title</p>
				<p>Date</p>
				<p>Duration</p>
			</div>
			{entries}	
		</div>
	)
}

export default Podcast

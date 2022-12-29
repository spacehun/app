import { fetchPodcast } from '../api.js'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import '../styles/PodcastLayout.css'

const PodcastLayout = () => {

	const { podcast } = useParams()

	// Descargar
	const { data, isError, isLoading } = useQuery({
		queryKey: ['podcast', podcast],
		queryFn: () => fetchPodcast(podcast),
		cacheTime: 1000 * 60 * 60 * 24,
	})
	if (isLoading)
		return (
			<p>Cargando</p>
		)
	const {title, author, description, image} = data

	// Renderizar
	return (
		<div className="page">
			<div className="podcast">
				<Link to={`/podcast/${podcast}`}>
					<img src={image} alt=""/>
					<h1>{title}</h1>
					<p>{'by ' + author}</p>
				</Link>
				<h3>Description:</h3>
				<p>{description}</p>
			</div>
			<Outlet/>
		</div>
	)
}

export default PodcastLayout

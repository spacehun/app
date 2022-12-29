import { Link } from 'react-router-dom'
import '../styles/PodcastSummary.css'

const PodcastSummary = ({id, name, author, image}) => (
	<Link to={`/podcast/${id}`} className='PodcastSummary'>
		<img src={image} alt=""/>
		<p>{name}</p>
		<p className='author'>{author}</p>
	</Link>
)

export default PodcastSummary

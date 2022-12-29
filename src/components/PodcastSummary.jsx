import { Link } from 'react-router-dom'

const PodcastSummary = ({id, name, author, image}) => (
	<Link to={`/podcast/${id}`}>
		<img src={image} alt=""/>
		<p>{name}</p>
		<p>{author}</p>
	</Link>
)

export default PodcastSummary

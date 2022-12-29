import { Link } from 'react-router-dom'

const EpisodeSummary = ({podcast, id, title, date, duration}) => (
	<div>
		<Link to={`/podcast/${podcast}/episode/${id}`}>{title}</Link>
		<p>{date}</p>
		<p>{duration}</p>
	</div>
)

export default EpisodeSummary

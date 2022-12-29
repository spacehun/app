import { Link, Outlet } from 'react-router-dom'
import '../styles/MainLayout.css'

const MainLayout = () => (
	<>
		<div className="bar">
			<Link to="/">PODCASTER</Link>
		</div>
		<Outlet/>
	</>
)

export default MainLayout

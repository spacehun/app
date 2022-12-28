import { Link, Outlet } from 'react-router-dom'

const MainLayout = () => (
	<>
		<div>
			<Link to="/">PODCASTER</Link>
		</div>
		<Outlet/>
	</>
)

export default MainLayout

import './styles/App.css';
import MainLayout from './pages/MainLayout'
import PodcastLayout from './pages/PodcastLayout'
import Ranking from './pages/Ranking'
import Podcast from './pages/Podcast'
import Episode from './pages/Episode'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainLayout/>}>
				<Route index element={<Ranking/>}/>
				<Route path="podcast/:podcast" element={<PodcastLayout/>}>
					<Route index element={<Podcast/>}/>
					<Route path="episode/:episode" element={<Episode/>}/>
				</Route>
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App

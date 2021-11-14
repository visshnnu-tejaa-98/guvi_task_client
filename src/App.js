import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Edit from './components/Edit';

function App() {
	return (
		<div>
			<BrowserRouter className='App'>
				<Navbar />
				<Routes>
					<Route path='/' exact element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/edit' element={<Edit />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

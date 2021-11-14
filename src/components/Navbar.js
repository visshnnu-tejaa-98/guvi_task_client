import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const handleLogin = () => {
		navigate('/login');
	};
	return (
		<div className='navbar'>
			<nav className='teal'>
				<div className='nav-wrapper container '>
					<a href='#!' className='brand-logo'>
						<strong>MY APP</strong>
					</a>
					<a href='#' data-target='mobile-demo' className='sidenav-trigger'>
						<i className='material-icons'>menu</i>
					</a>
					<ul className='right hide-on-med-and-down'>
						<li>
							{localStorage.getItem('token') ? (
								<a className='waves-effect waves-dark btn-flat white' onClick={handleLogout}>
									<i className='material-icons right'>forward</i>Logout
								</a>
							) : (
								<a className='waves-effect waves-dark btn-flat white' onClick={handleLogin}>
									<i className='material-icons right'>forward</i>Login
								</a>
							)}
						</li>
					</ul>
				</div>
			</nav>

			<ul className='sidenav' id='mobile-demo'>
				<li></li>
				<li>
					{localStorage.getItem('token') ? (
						<a href='' onClick={handleLogout}>
							Logout
						</a>
					) : (
						<a href='' onClick={handleLogin}>
							Login
						</a>
					)}
				</li>
			</ul>
		</div>
	);
};

export default Navbar;

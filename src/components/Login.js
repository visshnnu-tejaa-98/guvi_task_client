import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../apiEndpoints';

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (data.email && data.password) {
			setLoading(true);
			const req = await fetch(`${BACKEND_URL}/api/v1/user/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const res = await req.json();
			console.log(res);
			setLoading(true);
			if (res.status) {
				localStorage.setItem('token', res.token);
				navigate('/profile');
			} else {
				const M = window.M;
				M.toast({ html: res.data });
			}
			setLoading(false);
		} else {
			const M = window.M;
			M.toast({ html: 'Enter all fields' });
		}
	};
	return (
		<div className='register container component'>
			<div className='card  mt-3 pt-0 mt-0 center' style={{ width: '500px' }}>
				{loading && (
					<div className='progress m-0'>
						<div className='indeterminate'></div>
					</div>
				)}
				<div className='p-2'>
					<i class='far fa-user teal-text icon-size mt-1'></i>
					<h3 className='center teal-text m-1'>Login</h3>
					<form action=''>
						<div className='input-field '>
							<input
								id='email'
								type='email'
								className='validate'
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
							<label htmlFor='email'>Email</label>
						</div>

						<div className='input-field '>
							<input
								id='password'
								type='password'
								className='validate'
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
							/>
							<label htmlFor='password'>Password</label>
						</div>

						<div className='right'>
							<span>Not have an account ? </span>
							<Link to='/'>
								<span className='teal-text'>Register</span>
							</Link>
						</div>
						<div className='center mt-4'>
							<Link
								to=''
								className='waves-effect waves-light btn btn-margin'
								type='submit'
								onClick={handleLogin}
							>
								<i className='material-icons right'>send</i>Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

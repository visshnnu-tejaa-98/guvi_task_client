import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../apiEndpoints';
import '../css/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Edit = () => {
	const [data, setData] = useState({
		name: '',
		password: '',
		confirmPassword: '',
		dob: '',
		age: '',
		email: '',
	});
	// const [startDate, setStartDate] = useState(null);

	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();
	const handleRegister = async (e) => {
		e.preventDefault();
		console.log(data);
		if (data.name && data.password && data.confirmPassword && data.dob && data.age && data.email) {
			setLoading(true);
			const req = await fetch(`${BACKEND_URL}/api/v1/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const res = await req.json();
			console.log(res);
			if (res.status === false) {
				const M = window.M;
				M.toast({ html: res.data });
				setLoading(false);
			}
			if (res.status === true) {
				localStorage.setItem('email', `${data.email}`);
				navigate(`/login`);
			}
			setLoading(false);
		} else {
			const M = window.M;
			M.toast({ html: 'Enter all fields' });
		}
	};

	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	});
	return (
		<div className='edit container component'>
			<div className='card  mt-3 center' style={{ width: '500px' }}>
				{loading && (
					<div className='progress m-0'>
						<div className='indeterminate'></div>
					</div>
				)}
				<div className='p-2'>
					<i class='far fa-user teal-text icon-size mt-1'></i>
					<h3 className='center teal-text m-1'>Register</h3>
					<form action=''>
						<div className='row'>
							<div className='col m6 s12'>
								<div className='input-field '>
									<input
										id='name'
										type='text'
										className='validate'
										value={data.name}
										onChange={(e) => setData({ ...data, name: e.target.value })}
									/>
									<label htmlFor='name'>Name</label>
								</div>
							</div>
							<div className='col m6 s12'>
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
							</div>
						</div>

						<div className='row'>
							<div className='col s12 m6'>
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
							</div>
							<div className='col s12 m6'>
								<div className='input-field '>
									<input
										id='confirmPassword'
										type='password'
										className='validate'
										value={data.confirmPassword}
										onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
									/>
									<label htmlFor='confirmPassword'>Confirm Password</label>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col s12 m6'>
								<div className='input-field '>
									<input
										id='age'
										type='number'
										className='validate'
										value={data.age}
										onChange={(e) => setData({ ...data, age: e.target.value })}
									/>
									<label htmlFor='age'>Age</label>
								</div>
							</div>
							<div className='col s12 m6'>
								<div className='input-field'>
									<DatePicker
										id='dob'
										placeholderText='Date of Birth'
										selected={data.dob}
										onChange={(date) => setData({ ...data, dob: date })}
									/>
								</div>
							</div>
						</div>
						<span className='right p-0 m-0'>
							<span className=''>Have an account ? </span>
							<Link to='/login'>
								<span className=' teal-text'>Login</span>
							</Link>
						</span>
						<div className='center mt-3'>
							<Link
								to=''
								className='waves-effect waves-light btn btn-margin mt-2'
								type='submit'
								onClick={handleRegister}
							>
								<i className='material-icons right'>send</i>Register
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Edit;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BACKEND_URL } from '../apiEndpoints';

const Edit = () => {
	const [data, setData] = useState({
		name: '',
		dob: '',
		age: '',
	});
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();
	const handleRegister = async (e) => {
		e.preventDefault();
		console.log(data);
		if (data.name && data.dob && data.age) {
			setLoading(true);
			const req = await fetch(`${BACKEND_URL}/api/v1/user/edit`, {
				method: 'PUT',
				headers: {
					authorization: localStorage.getItem('token'),
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
				navigate(`/profile`);
			}
			setLoading(false);
		} else {
			const M = window.M;
			M.toast({ html: 'Enter all fields' });
		}
	};

	const getData = async () => {
		const req = await fetch(`${BACKEND_URL}/api/v1/user`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: localStorage.getItem('email') }),
		});
		const res = await req.json();
		if (res.status) {
			setData({
				...data,
				name: res.data.name,
				age: res.data.age,
				email: res.data.email,
			});
			console.log(res);
		} else {
		}
	};

	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	});
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='register container component'>
			<div className='card p-2 mt-3 center' style={{ width: '500px' }}>
				{loading && (
					<div className='progress'>
						<div className='indeterminate'></div>
					</div>
				)}
				<div className=''>
					<i class='far fa-user teal-text icon-size mt-1'></i>
					<h3 className='center teal-text m-1'>Edit</h3>
					<form action=''>
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
						<div className='input-field '>
							<input
								id='age'
								type='text'
								className='validate'
								value={data.age}
								onChange={(e) => setData({ ...data, age: e.target.value })}
							/>
							<label htmlFor='age'>Age</label>
						</div>

						<div className='input-field'>
							<DatePicker
								id='dob'
								selected={data.dob}
								onChange={(date) => {
									console.log(date);
									setData({ ...data, dob: date });
								}}
							/>
							<label htmlFor='dob'>Date of Birth</label>
						</div>

						<div>
							<Link to='/login'>
								<span className='right teal-text'>Login</span>
							</Link>
						</div>
						<div className='center'>
							<Link
								to=''
								className='waves-effect waves-light btn btn-margin'
								type='submit'
								onClick={handleRegister}
							>
								Edit
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Edit;

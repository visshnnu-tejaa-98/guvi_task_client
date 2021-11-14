import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../apiEndpoints';
import ProfileImg from '../images/profile.svg';

const Profile = () => {
	const [userData, setUserData] = useState({});
	var date;
	const getData = async () => {
		const req = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
			method: 'GET',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
		const res = await req.json();
		console.log(res);
		setUserData(res.data);
		date = new Date(res.data.dob);
		console.log(date);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='profile container'>
			<h3 className='center teal-text mb-3'>Profile</h3>
			<div className='row'>
				<div className='col s12 m6 center'>
					<img src={ProfileImg} alt='' style={{ width: '300px' }} />
				</div>
				<div className='col s12 m6'>
					<div>
						{localStorage.getItem('token') && (
							<div>
								<h4 className='m-0 teal-text '>Details</h4>

								<p>
									<span>
										<strong>Name : </strong>
									</span>
									{userData.name}
								</p>
								<p>
									<span>
										<strong>Email : </strong>
									</span>
									{userData.email}
								</p>
								<p>
									<span>
										<strong>Date of Birth : </strong>
									</span>
									{new Date(userData.dob).toString().split(' ').slice(1, 4).join(' ')}
								</p>
								<p>
									<span>
										<strong>Age : </strong>
									</span>
									{userData.age}
								</p>
								<p>
									<span>
										<strong>Contat : </strong>
									</span>
									{userData.email}
								</p>
								<Link to='/edit'>
									<button className='btn'>Edit</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

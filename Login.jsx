import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const storedEmail = localStorage.getItem('userEmail');
		const storedPassword = localStorage.getItem('userPassword');

		if (storedEmail) {
			setEmail(storedEmail);
		}
		if (storedPassword) {
			setPassword(storedPassword);
			navigate('/');
		}
	}, [navigate]);

	const handleLogin = (event) => {
		event.preventDefault();
		setEmailError('');
		setPasswordError('');

		let valid = true;

		if(!email || !password){
			if (!email) {
				setEmailError('Please enter a email.');
				valid = false;
			}
			if (!password) {
				setPasswordError('Please enter a password.');
				valid = false;
			} 
		}

		if(email && password){
			if (email !== 'amit@gmail.com') {
				setEmailError('Incorrect credentials!');
				valid = false;
			} else if(password !== 'password'){
				setEmailError('Incorrect credentials!');
				valid = false;
			}
		}

		if (!valid) return;

		localStorage.setItem('userEmail', email);
		localStorage.setItem('userPassword', password);

		navigate('/');
	};

	return (
		<div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content p-4">
					<div className="modal-header">
						<h5 className="modal-title">User Login</h5>
					</div>
					<div className="modal-body">
						<form onSubmit={handleLogin}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email:</label>
								<input
									type="email"
									className={`form-control ${emailError ? 'is-invalid' : ''}`}
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if(e.target.value && emailError){
											setEmailError("");
										}
									}}
									placeholder="Enter email"
								/>
								{emailError && <div className="invalid-feedback">{emailError}</div>}
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password:</label>
								<input
									type="password"
									className={`form-control ${passwordError ? 'is-invalid' : ''}`}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value)
										if(e.target.value && passwordError){
											setPasswordError("");
										}
									}}
									placeholder="Enter password"
								/>
								{passwordError && <div className="invalid-feedback">{passwordError}</div>}
							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-primary">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
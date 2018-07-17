import React, {Component} from 'react';
var axios = require('axios')


class Login extends Component {
	
	state = {
		username: '',
		password: '',
		terms: false,
	}
	
	  
	handleChange = (event) => {
		if (event.target.name === "terms") {
			this.setState({
				terms: event.target.checked
			})
		} else {
			const {name, value} = event.target
			console.log(name, value)
			this.setState({
				[name]: value
			})
		}
	}
  
	handleSubmit = (event) => {
		console.log('Form value: ' , this.state);
		event.preventDefault();
		//if (!this.state.username.trim() === "" || !this.state.password.trim() === "") {
			// we are good to go submit
			//regular expression checking for email and password here
			// const loginData = {email: this.state.email, password: this.state.password}
			// axios.post(`/api/auth/login`, loginData)
			//   .then(res => ...handle response)
			//	.redirect (/)
			//   .catch(err => ...handle error)
			
			if (!this.state.username.trim() === "" || !this.state.password.trim() === "") {
				const userData = {
					username: this.state.username,
					password: this.state.password
				}
					console.log(userData)
				axios.post('/api/authentication/register', userData)
					.then(res => res.data)
					.catch(err => console.error("Wasn't able to update the database.", err))
				}	else {
					alert("Enter Your User Name or Password!")
				}

  
	render() {
		// let disabledBtn = true;
		// let button = <button disabled={disabledBtn}>Submit</button>
		// if(this.state.email.length > 0 && this.state.password.length > 0) {
		// 	disabledBtn = false;
		// }
	  return (
		<form onSubmit = {this.handleSubmit}>
			<div className="field">
				<label className="label">User Name</label>
					<div className="control">
						<input className="input" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
					</div>
			</div>
			<div className="field">
			<label className="label">Password</label>
				<div className="control">
					<input className="input" type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
				</div>
			</div>
			<div className="field">
				<div className="control">
					<label className="checkbox">
						<input
							name="terms"
							type="checkbox"
							checked={this.state.terms}
							onChange={this.handleChange}
						/>
						I agree to the <a href="https://google.com">terms and conditions</a>
					</label>
				</div>
			</div>
			<button disabled = {this.state.terms ? false : true}> Submit </button>
			{/* {button} */}
		</form>
	  );
	}
  }

export default Login;


		
		
import React, {Component} from 'react';
var axios = require('axios')


class Login extends Component {
	
	state = {
		username: '',
		password: '',
		terms: false,
	}

	handleChange = (event) => {
		const {name, value} = event.target
			console.log(name, value)
			this.setState({
				[name]: value
		})
	}
  
	handleSubmit = (event) => {
		console.log('Form value: ' , this.state);
		event.preventDefault();
		
		const userData = {
			username: this.state.username,
			password: this.state.password
		}
		console.log("Inside handleSubmit");
		console.log(userData);
		axios.post('/api/authentication/login', userData)
		.then(function (response) {
			window.location = response.data.redirect
			
		})
			
			//.then(res => this.props.history.push("/"))
			//.then(res => res.data, console.log(userData))
			.catch(err => console.error("Wasn't able to authenticate in database.", err))
		}	

		
  
	render() {
		const userData = {
			username: this.state.username,
			password: this.state.password
		}
		let disabledBtn = true;
		if(userData.username.length > 0 && userData.password.length > 0) {
				disabledBtn = false;
		}
		let button = <button className="border border-white btn mt-2 text-white transparent-bg" disabled={disabledBtn}>Submit</button>
	    return (
			<div className="align-items-center col-12 d-flex justify-content-center">

				<div className="border border-white card m-2 card-width text-white transparent-bg">
					<div className="border border-white card-header font-weight-bold text-center login-header">
						Login
					</div>
				<div className="card-body">
						<form className= "form" onSubmit = {this.handleSubmit}>
							<div className="field">
								<label className="label">User Name</label>
									<div className="control">
										<input className="input form-control text-white transparent-bg" type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange}/>
									</div>
							</div>
							<div className="field mt-2">
							<label className="label">Password</label>
								<div className="control">
									<input className="input form-control text-white transparent-bg" type="text" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange}/>
								</div>
							</div>
							{/* <button className="mt-2"> Submit </button> */}
							{/* <button disabled = {this.state.terms ? false : true}> Submit </button> */}
							{button}
							
						</form>
					</div>
				</div>
			</div>
	  	);
	}
}


export default Login;


		
//after render
// let disabledBtn = true;
		// let button = <button disabled={disabledBtn}>Submit</button>
		// if(this.state.email.length > 0 && this.state.password.length > 0) {
		// 	disabledBtn = false;
		// }	
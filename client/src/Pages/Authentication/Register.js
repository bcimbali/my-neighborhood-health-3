import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
	
	state = {
        username: '',
        email: '',
        password: '',
        passwordConf: '',
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
			const userData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                passwordConf: this.state.passwordConf
            }
            console.log(userData)
			axios.post('/api/authentication/register', userData)
            .then(res => res.data)
            .catch(err => console.error("Wasn't able to update the database.", err))
        }
	
  
	render() {
		// let disabledBtn = true;
		// let button = <button disabled={disabledBtn}>Submit</button>
		// if(this.state.email.length > 0 && this.state.password.length > 0) {
		// 	disabledBtn = false;
		// }
	  return (
		<div className="card">
		<div className="card-header">  Register for our site  </div>
		<div className="card-body">
		<form onSubmit = {this.handleSubmit}>
            <div className="field">
				<label className="label">UserName</label>
					<div className="control">
						<input className="input" type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange}/>
					</div>
			</div>
			<div className="field mt-2">
				<label className="label">Email</label>
					<div className="control">
						<input className="input" type="text" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
					</div>
			</div>
			<div className="field mt-2">
			<label className="label">Password</label>
				<div className="control">
					<input className="input" type="text" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange}/>
				</div>
			</div>
            <div className="field mt-2">
			<label className="label">Password Confirmation</label>
				<div className="control">
					<input className="input" type="text" name="passwordConf" placeholder="Enter password again" value={this.state.passwordConf} onChange={this.handleChange}/>
				</div>
			</div>
			<div className="field mt-2">
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
			<button className="mt-2" disabled = {this.state.terms ? false : true}> Submit </button>
			{/* {button} */}
		</form>
		</div>
		</div>
	
	  );
	}
  }

export default Register;


//In handle submit after event.preventDefault 
// if (!this.state.email.trim() === "" || !this.state.password.trim() === "") {
			// we are good to go submit
			//regular expression checking for email and password here
			// const loginData = {email: this.state.email, password: this.state.password}
			// axios.post(`/api/auth/login`, loginData)
			//   .then(res => ...handle response)
			//	.redirect (/)
            //   .catch(err => ...handle error)
            //if (req.body.password !== req.body.passwordConf) {
                //   var err = new Error('Passwords do not match.');
                //   err.status = 400;
                //   res.send("passwords dont match");
                //   return next(err);
                // }
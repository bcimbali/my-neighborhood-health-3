import React, {Component} from 'react';
// import './Login.css';

class Login extends Component {
	
	state = {
		email: '',
		password: '',
		terms: false,
	}
	
	// constructor (props) {
	// 	super(props);
	// 	this.state = {
	// 		inputvalue: ''
	// 	}
  
	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.handleSubmit = this.handleSubmit.bind(this);
	// }
  
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
		if (!this.state.name.trim() === "" || !this.state.password.trim() === "") {
			// we are good to go submit
			//regular expression checking for email and password here
			// const loginData = {email: this.state.email, password: this.state.password}
			// axios.post(`/api/auth/login`, loginData)
			//   .then(res => ...handle response)
			//	.redirect (/)
			//   .catch(err => ...handle error)
		}
		
	}
  
	render() {
		let disabledBtn = true;
		let button = <button disabled={disabledBtn}>Submit</button>
		if(this.state.name.length > 0 && this.state.password.length > 0) {
			disabledBtn = false;
		}
	  return (
		<form onSubmit = {this.handleSubmit}>
			<div className="field">
				<label className="label">Email</label>
					<div className="control">
						<input className="input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
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
			{/* <button disabled = {this.state.terms ? false : true}> Submit </button>*/}
			{button}
		</form>
	  );
	}
  }

export default Login;


		
		
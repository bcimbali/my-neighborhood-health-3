import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
	
	// state = {
	// 	email: '',
	// 	password: '',
	// 	terms: false,
	// }
	
	constructor (props) {
		super(props);
		this.state = {
			inputvalue: ''
		}
  
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChange (event) {
		this.setState({
			inputvalue: event.target.value
		})
	}
  
	handleSubmit (event) {
		console.log('Form value: ' + this.state.inputvalue);
		event.preventDefault();
	}
  
	render() {
	  return (
		<div>
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
		</div>
	  );
	}
  }

export default Login;


		
		
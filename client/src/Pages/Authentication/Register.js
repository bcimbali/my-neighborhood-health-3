import React, {Component} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap4-modal';

class Register extends Component {
	
	state = {
        username: '',
        email: '',
        password: '',
		passwordConf: '',
		details: false,
		terms: false,
	}
	
	
	toggle(){
		const currentState = this.state.details;
		this.setState({ details: !currentState }); 
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
            .then(function (response) {
				window.location = response.data.redirect
			})
			.catch(err => console.error("Wasn't able to update the database.", err))
		} 
        
	
	
	
	
  
	render() {
		const userData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			passwordConf: this.state.passwordConf
		}

		let disabledBtn = true;
		
		if(this.state.password.length === this.state.passwordConf.length && this.state.terms === true) {
			disabledBtn = false;
		}
		let button = <button className="border border-white btn text-white transparent-bg" disabled={disabledBtn}>Submit</button>
		  
	  return (
		<div className="align-items-center col-12 d-flex justify-content-center">  
			<div className="border border-white card m-2 card-width text-white transparent-bg">
				<div className="border border-white card-header font-weight-bold text-center login-header">
					Register
				</div>
				<div className="card-body">

				<form  className= "form" onSubmit = {this.handleSubmit}>
					<div className="field">
						<label className="label">User Name</label>
							<div className="control">
								<input className="input form-control text-white transparent-bg w-100" type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange}/>
							</div>
					</div>
					<div className="field mt-2">
						<label className="label">Email</label>
							<div className="control">
								<input className="input form-control text-white transparent-bg w-100" type="text" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
							</div>
					</div>
					<div className="field mt-2">
					<label className="label">Password</label>
						<div className="control">
							<input className="input form-control text-white transparent-bg w-100" type="text" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} onKeyUp={this.check}/>
						</div>
					</div>
					<div className="field mt-2">
					<label className="label">Password Confirmation</label>
						<div className="control">
							<input className="input form-control text-white transparent-bg w-100" type="text" name="passwordConf" placeholder="Enter password again" value={this.state.passwordConf} onChange={this.handleChange} onKeyUp={this.check}/>
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
								<em>   I agree to the</em> <button  className="border border-white btn text-white transparent-bg" onClick={this.toggle.bind(this)}>Terms and Conditions</button>
							</label>
						</div>
					</div>
					{/* <button className="mt-2" disabled = {this.state.terms ? false : true}> Submit </button> */}
					{button}
				</form>

				<Modal visible={this.state.details} onClickBackdrop={()=> this.toggle()}>
					<div className="modal-header mx-auto">
					<h4 className="font-weight-bold modal-title text-dark">Terms and Conditions</h4>
					</div>
					<div className="modal-body text-dark">
					<p>
					My Neighborhood Health does not share your email, username, or password with anyone else.
					</p>
					<p>
					Our Service may contain links to third-party web sites or services that are not owned or controlled by My Neighborhood Health.
					</p>
					<p>
					My Neighborhood Health has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Neighborhood Health shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
					</p>
					<p>
					We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
					</p>
					<p>
					If you have any questions about these Terms, please contact us.
					</p>
					
					</div>
					<div className="modal-footer">
					<button type="button" className="filter-btn btn" onClick={()=> this.toggle()}>
						Close
					</button>
					</div>
				</Modal>

				</div>
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
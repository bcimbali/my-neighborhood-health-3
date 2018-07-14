import React, {Component} from 'react';
import Login from './Login'; 
import Register from './Register';

//fragment instead of wrapping in div

const Authentication = (props) => {
	return (
        <div>
        {/* <Login/> */}
        <Register/>

        </div>

		
	);
	
}

export default Authentication;
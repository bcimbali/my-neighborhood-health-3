import React, {Component} from 'react';
import Login from './Login'; 
import Register from './Register';
import Logout from './Logout';


//fragment instead of wrapping in div

const Authentication = (props) => {
       
                return (
                        <div className="d-flex justify-content-around m-5">
                                <Login/>
                                <Register/>
                                <Logout/>
                        </div>
                );
       
}

export default Authentication;
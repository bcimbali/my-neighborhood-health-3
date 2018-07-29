import React, {Component} from 'react';
import Login from './Login'; 
import Register from './Register';



//fragment instead of wrapping in div

const Authentication = (props) => {
       
                return (
                        <div className="container-fluid d-flex gradient-bg h-100 justify-content-around">
                                <div className="row align-items-center d-flex w-100">
                                                <Login/>
                                                <Register/>
                                </div>
                        </div>
                );
       
}

export default Authentication;
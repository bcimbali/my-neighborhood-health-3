import React, {Component} from 'react';
import Login from './Login'; 
import Register from './Register';



//fragment instead of wrapping in div

const Authentication = (props) => {
       
                return (
                        <div className="container-fluid d-flex gradient-bg h-100 justify-content-around">
                                <Login/>
                                <Register/>
                                
                        </div>
                );
       
}

export default Authentication;
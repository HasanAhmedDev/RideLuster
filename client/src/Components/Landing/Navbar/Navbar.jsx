import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
export default class Navbar extends React.Component{

    render(){
        return (
            <div className="mainNavbar">
                <div className="img"></div>
                <div className="button-containers">
                <Link className="d" to="/signup">
                    <div className="ui blue button signup" tabIndex="0">
                        
                            <div className="visible content" >Sign Up!</div>                
                                {/* <div className="hidden content" ></div> */}
                        
                        
                    </div>
                    </Link>
                    <Link className="d" to="/login">
                        <div className="ui animated button login" tabIndex="0">
                            <div className="visible content">LOGIN
                            
                            </div>
                            
                                <div className="hidden content">
                                <i className="right arrow icon"></i>
                                </div>
                            
                            
                            </div>
                    </Link>
                </div>
            </div>
        )
    }
}
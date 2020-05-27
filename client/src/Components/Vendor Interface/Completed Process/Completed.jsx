import React from 'react';
import './Completed.css';
export default class Completed extends React.Component{
    render(){
        return(
            <div className="main-waiting">
                <h3 className="ui block center header r-head 3">COMPLETED PROCESS</h3>
                <div className="body-request">
                    <div className="ui cards">
                        <div className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/luther-bottrill-EsBufnuK4NE-unsplash.jpg')}/>
                            <div className="header">
                                Elliot Fu
                            </div>
                            <div className="meta">
                                Johar Town
                                <br/>
                                0321-4251291
                                <br/>
                                ID: RL44
                                <br/>
                                Request Time: 12:50 pm
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">General Service</h5>
                                <h6 className="r-h5">STATUS: <span className="green">Completed</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Suzuki Ciaz</li>
                                    <li> <b>VEHICLE TYPE: </b> Sedan</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEB-2319</li>
                                </ul>
                                <h6>Process Time: <span className="green">15 Minutes</span></h6>
                                <h6>Completion Time: <span className="green">12:32 pm</span></h6>
                                <h6>Payment: <span className="red">Pending</span></h6>
                            </div>
                            </div>
                            {/* <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button">Start Process</div>
                                <div className="ui basic red button">Cancel</div>
                            </div>
                            </div> */}
                        </div>
                        
                        
                        
                        </div>
                </div>
            </div>
        )
    }
}
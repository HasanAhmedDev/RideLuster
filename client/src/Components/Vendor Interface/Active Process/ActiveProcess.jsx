import React from'react';
import './ActiveProcess.css';
export default class ActiveProcess extends React.Component{
    render(){
        return (
            <div className="main-active">
                <h3 className="ui block center header r-head 3">ACTIVE PROCESS</h3>
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
                                <h6 className="r-h5">STATUS: <span className="blue">Active</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Suzuki Ciaz</li>
                                    <li> <b>VEHICLE TYPE: </b> Sedan</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEB-2319</li>
                                </ul>
                                <h6>Process Complete in: <span className="yellow">15 Minutes</span></h6>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button">Complete</div>
                                {/* <div className="ui basic red button">Cancel</div> */}
                            </div>
                            </div>
                        </div>
                        
                        
                        <div className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/stas-svechnikov-zXQdgHr2KIw-unsplash.jpg')}/>
                            <div className="header">
                                Ahmad
                            </div>
                            <div className="meta">
                                Faisal Town
                                <br/>
                                0300-2910493
                                <br/>
                                ID: RL75
                                <br/>
                                Request Time: 1:00 pm
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">Simple Wash</h5>
                                <h6 className="r-h5">STATUS: <span className="blue">Active</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Honda N-ONE</li>
                                    <li> <b>VEHICLE TYPE: </b> Hatch-Back</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEE-1144</li>
                                </ul>
                                <h6>Process Complete in: <span className="yellow">10 Minutes</span></h6>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button">Complete</div>
                                {/* <div className="ui basic red button">Cancel</div> */}
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}

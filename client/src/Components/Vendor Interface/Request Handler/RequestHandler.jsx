import React from 'react';
import './RequestHandler.css';
export default class RequestHandler extends React.Component{
    render(){
        return(
            <div className="main-request">
                <h3 className="ui block center header r-head 3">INCOMING REQUESTS</h3>
                <div className="body-request">
                    <div className="ui cards">
                        <div className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui cardimg image" alt="" src={require('../../../assets/luther-bottrill-EsBufnuK4NE-unsplash.jpg')}/>
                            <div className="header">
                                Elliot Fu
                            </div>
                            <div className="meta">
                                Johar Town
                                <br/>
                                0321-4251291
                                <br/>
                                ID: RL140
                                <br/>
                                Requested At: 1:08 pm
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">General Service</h5>
                                <h6 className="r-h5">STATUS: <span className="red">Pending</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Suzuki Ciaz</li>
                                    <li> <b>VEHICLE TYPE: </b> Sedan</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEB-2319</li>
                                </ul>
                                <select name="" id="" className="r-inp">
                                    <option value="0">Time Consumption</option>
                                    <option value="10">10 Minutes</option>
                                    <option value="15">15 Minutes</option>
                                    <option value="20">20 Minutes</option>
                                    <option value="25">25 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                </select>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button">Approve</div>
                                <div className="ui basic red button">Decline</div>
                            </div>
                            </div>
                        </div>
                        <div className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui cardimg image" alt="" src={require('../../../assets/luther-bottrill-EsBufnuK4NE-unsplash.jpg')}/>
                            <div className="header">
                                Ahmad
                            </div>
                            <div className="meta">
                                Model Town 
                                <br/>
                                0335-6969690
                                <br/>
                                ID: RL25
                                <br/>
                                Requested At: 1:11 pm
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">General Service + Body Polish</h5>
                                <h6 className="r-h5">STATUS: <span className="red">Pending</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Suzuki Hustler</li>
                                    <li> <b>VEHICLE TYPE: </b> Hatch-Back</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEX-5161</li>
                                </ul>
                                <select name="" id="" className="r-inp">
                                    <option value="0">Time Consumption</option>
                                    <option value="10">10 Minutes</option>
                                    <option value="15">15 Minutes</option>
                                    <option value="20">20 Minutes</option>
                                    <option value="25">25 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                </select>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic disabled green button">Approve</div>
                                <div className="ui basic red button">Decline</div>
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
                                Requested At: 1:15 pm
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">Simple Wash</h5>
                                <h6 className="r-h5">STATUS: <span className="red">Pending</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> Honda N-ONE</li>
                                    <li> <b>VEHICLE TYPE: </b> Hatch-Back</li>
                                    <li> <b>VEHICLE NUMBER: </b> LEE-1144</li>
                                </ul>
                                <select name="" id="" className="r-inp">
                                    <option value="0">Time Consumption</option>
                                    <option value="10">10 Minutes</option>
                                    <option value="15">15 Minutes</option>
                                    <option value="20">20 Minutes</option>
                                    <option value="25">25 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                </select>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic disabled green button">Approve</div>
                                <div className="ui basic red button">Decline</div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}
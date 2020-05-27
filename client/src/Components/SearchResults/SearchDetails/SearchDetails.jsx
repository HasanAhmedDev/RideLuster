import React from 'react';
import  Nav  from '../../Utility Components/Nav';
import Footer from '../../Footer/Footer';
import './SearchDetails.css';
export default class SearchDetails extends React.Component{
    render(){
        return(
            <div className="details-main">
                <Nav/>
                <div className="details-body">
                    <h3 className="ui block header d-head">Havoline Service Area</h3>
                    <img class="ui big aligned large image" src="https://onlybusinessideas.com/wp-content/uploads/2019/11/Petrol-pump-business.jpg" alt='img'/>
                    <span>
                        <div className="list-grid">
                            <div className="left-grid">
                                <ul>
                                    <li>Location: Johar Town</li>
                                    <li>Status: Open</li>
                                    <li>Timing: 24/7</li>
                                    <li>Waiting Area</li>
                                </ul>
                            </div>
                            <div className="right-grid">
                                <ul>
                                    <li>Wash</li>
                                    <li>Service</li>
                                    <li>Polish</li>
                                    <li>Compound</li>
                                </ul>
                            </div>
                        </div>
                    </span>
                </div>
                <Footer/>
            </div>
        )
    }
}
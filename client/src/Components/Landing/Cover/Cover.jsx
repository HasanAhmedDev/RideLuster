import React from 'react';
import './Cover.css'
import { Link } from 'react-router-dom';
export default class Cover extends React.Component{

    render() {
        return (
            <div className="main-cover">

                <div className="main-grid">
                    {/* TEXT AREA */}
                    <div className="left-s split">
                        <h2><span id="one">MANAGE</span> <span id="two">YOUR</span> <span id="three">BUSINESS</span> <span id="four">CONVENIENTLY</span>  </h2>
                        <Link className="d" to="/signup">
                        <button id="anim-btn" className="ui inverted button">SIGN UP FOR FREE</button>     
                        </Link>   
                    </div>
                    {/* SEARCH AREA */}
                    <div className="right-s split">
                        
                    </div>
                </div>
                    
                {/* OPTION BAR */}
                <div className="my-grid">
                    <div className="column-option option-active">
                        <i className="fas fa-2x fa-car"></i>
                        <div className="txt">Sedan</div>
                    </div>
                    <div className="column-option">
                        <i className="fas fa-2x fa-car-side"></i>
                        <div className="txt">
                            Hatch-Back
                        </div>
                    </div>
                    <div className="column-option">
                        <i className="fas fa-2x fa-motorcycle"></i>
                        <div className="txt">
                            Bike
                        </div>
                    </div>
                    <div className="column-option">
                        <i className="fas fa-2x fa-truck-monster"></i>
                        <div className="txt">
                            4-Wheel/SUV
                        </div>
                    </div>
                    <div className="column-option">
                        <i className="fas fa-2x fa-shuttle-van"></i>
                        <div className="txt">
                            Mini-Van
                        </div>
                    </div>
                </div>
            </div>
        )
      
    }
}
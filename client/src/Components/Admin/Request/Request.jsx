import React from 'react';
import './Request.css';
export default class Request extends React.Component{
    render(){
        return (
            <div className="req">
                <h3 className="ui block header">ACTIVE REQUESTS</h3>
                    <div className="m-req">
                        <div className="r-tabs">
                            <h5>NAME: C-Wash</h5>
                            <div className="btn-group">
                                <button>BOOK APPOINTMENT</button>
                                <button className="danger">CANCEL</button>
                            </div>
                        </div>
                        <div className="r-tabs">
                            <h5>NAME: C-Wash</h5>
                            <div className="btn-group">
                                <button>BOOK APPOINTMENT</button>
                                <button className="danger">CANCEL</button>
                            </div>
                        </div>
                        <div className="r-tabs">
                            <h5>NAME: C-Wash</h5>
                            <div className="btn-group">
                                <button>BOOK APPOINTMENT</button>
                                <button className="danger">CANCEL</button>
                            </div>
                        </div>
                    </div>
            </div>
            
        )
    }
}
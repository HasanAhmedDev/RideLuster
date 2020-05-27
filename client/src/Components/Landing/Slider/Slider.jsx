import React from 'react';
import './Slider.css';
export default class Slider extends React.Component{
    index = 0;
    state = {
    review: [
        {
            url: '../../../assets/jaroslav-devia-xfYiIpHnvhs-unsplash.jpg',
            comment: 'Comments Here'
        },
        {
            url: '../../../assets/stas-svechnikov-zXQdgHr2KIw-unsplash.jpg',
            comment: 'okay'
        },
        {
            url: '../../../assets/stas-svechnikov-zXQdgHr2KIw-unsplash.jpg',
            comment: 'nothing',
        }
    ]
}
    forward = ()=>{
        if(this.index >= 2)
        {
            this.index = 0;
        }
        else{
            this.index++;
        }
    }
    previous = ()=>{
        if(this.index <= 0)
        {
            this.index = 2;
        }
        else{
            this.index--;
        }
    }
    render()
    {
        return(
            <div className="slider-body">
                <div className="text-container">
                    <h3>WE ENSURE QUALITY SERVICE!</h3>
                    <p>Our Professional Team is constantly observing activities and making sure Users best Experience!</p>
                    <h2 className="ohu">OUR HAPPY USERS</h2>
                </div>
                
                <div className="main-slider">
                    <div className="left">
                        <i className="fas fa-chevron-left arrowLR" onClick={this.previous.bind(this)}></i>
                    </div>
                    <div className="review">
                        <img className="ui medium circular slider-img image" src={require('../../../assets/jaroslav-devia-xfYiIpHnvhs-unsplash.jpg')} alt=""/>
                        <p>{this.state.review[this.index].comment}</p>
                    </div>
                    <div className="right">
                        <i className="fas fa-chevron-right arrowLR" onClick={this.forward.bind(this)}></i>
                    </div>
                    
                </div>
            </div>
        )
    }
}
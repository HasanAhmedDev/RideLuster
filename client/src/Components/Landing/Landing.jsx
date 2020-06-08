import React from 'react';
import Navbar from './Navbar/Navbar';
import Cover from './Cover/Cover';
import Slider from './Slider/Slider';
import Contact from './Contact/Contact';
import Footer from '../Footer/Footer';
import './Landing.css'
export default class Landing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="landing-body">
                <div className="bg-img" style={{height: '100vh'}}>
                    <div className="overlay">
                    <Navbar></Navbar>
                    <Cover></Cover>
                    </div>
                </div>
                {/* <div className="carousel">
                    <Slider></Slider>
                </div> */}
                {/* <div className="contact">
                    <Contact></Contact>
                </div> */}
                <div className="footer">
                    <Footer></Footer>
                </div>
            </div>
            </React.Fragment>
            
        )
      
    }
  }
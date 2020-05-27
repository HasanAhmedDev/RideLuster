import React from 'react';
import './Contact.css';
export default class Contact extends React.Component{
    render(){
        return(
            <div className="main-contact">
                <div className="text-container">
                    <h6 className="mini-head"><span><i className="fas fa-wifi"></i></span> &nbsp; 24/7 &nbsp; <span><i className="fas fa-wifi"></i></span></h6>
                    <h2>Contact Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dignissimos magnam nemo quas eum mollitia reprehenderit maiores cupiditate tenetur quam. Iusto eligendi eum doloremque pariatur. Eos aut pariatur mollitia eligendi.</p>
                </div>
                <div className="contact-body">
                    <div className="main-card row">
                        
                        <div className="col-md-7 text-center">
                            <ul className="l-ul">
                                <li className="blue"><span><i className="fas  fa-phone-alt"></i></span> &nbsp; +92-7415-3459</li>
                                <li className="blue"><span><i className="fas  fa-envelope"></i></span> &nbsp; info@travel.com</li>
                                <li className="blue"><span><i className="fas  fa-globe"></i></span> &nbsp; www.travel.com</li>
                                <li className="blue"><span><i className="fas  fa-phone-alt"></i></span> &nbsp; 47 St. Loufer. NY</li>
                            </ul>
                        </div>
                        <div className="col-md-5 text-center">
                            <div className="inp inp1 text-center">
                                <input type="text" placeholder="NAME*"/>
                             </div>
                            <div className="inp text-center">
                                <input type="text" placeholder="EMAIL*"/>
                            </div>
                            <div className="inp inp3 text-center"><textarea name="" id="" placeholder="WRITE A MESSAGE"></textarea></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
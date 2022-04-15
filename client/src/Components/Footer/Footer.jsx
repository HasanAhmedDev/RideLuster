import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
 export default class Footer extends React.Component{
     render(){
         return(
             <div className="main-footer">
                 <div className="container">
                    <Link to="/">
                    <div className="f-logo"></div>
                    </Link>
                    <p className="para">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem dicta voluptatibus explicabo inventore atque ut, placeat expedita rem velit odit hic facilis veniam, blanditiis deserunt ab. Similique blanditiis repudiandae aperiam?</p>
                    <p className="rights">ALL COPYRIGHTS RESERVED 2022</p>
                 </div>
                 
             </div>
         )
     }
 }
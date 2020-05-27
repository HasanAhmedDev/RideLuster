import React from 'react';
import './Admin.css';
import Nav from '../Utility Components/Nav';
import TabHandler from './TabHandler';
export default class AdminPanel extends React.Component{
    
    slide = false;
    classL = "ui left demo vertical inverted sidebar labeled icon menu push"
    state={
        menuName: 'Request'
    }
    redirect = (ea)=>{
        
        this.setState({
            menuName: ea
        });
        this.slidefun();
    }
    slidefun = ()=>{
        var sideBar = document.getElementById('slidebar');
        
        if(this.slide === false){
            sideBar.className += ' visible';
            this.slide = true;
        }
        else{
            sideBar.className = this.classL;
            this.slide = false;
            
        }
    }
    
    render(){
        
        return (
            <div className="m">
                <Nav/>
                <div className="side">

                <div className="ui left demo  vertical inverted sidebar labeled icon menu push" id="slidebar">
                    <div className="a-logo">
                        
                    </div>
                    <li  onClick={()=>this.redirect("Request")} className="item">
                        ACTIVE REQUEST
                    </li>
                    <li  onClick={()=>this.redirect("VendorList")} className="item">
                        VENDOR LIST
                    </li>
                    {/* <li  onClick={()=>this.redirect('t')} className="item">
                        TOTAL SERVICES
                    </li> */}
                    <li onClick={()=> this.redirect("UserList")} className="item">
                        USER LIST
                    </li>
                </div>
                <div className="dimmed pusher">
                    <div onClick={this.slidefun} className="slide-control">                       
                        <i  className="fas fa-align-justify "></i>
                    </div>
                    
                </div>
                
                </div>
                <TabHandler name={this.state.menuName}/>
                
                

            </div>
            
            
        )
    }
}

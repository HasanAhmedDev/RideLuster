import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ShowLoader = () => {

  const loaderState = useSelector(st => st.loader);
 

  useEffect(()=>{
    var loader = document.getElementById('segment');
    if(loaderState.loader){
      window.scrollTo(0,0)
      loader.style.display = 'block';
    }
    else{
      loader.style.display = 'none';
    }
  })
  

  return (
    <div id="segment" className="ui segment">
    <p></p>
    <div className="ui active dimmer" style={{height: '100vh', position: 'fixed', top: '0'}}>
      <div className="ui massive loader"></div>
    </div>
  </div>
)}

export default ShowLoader;
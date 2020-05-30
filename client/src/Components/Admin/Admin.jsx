import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import './Admin.css';
import Nav from '../Utility Components/Nav';
import TabHandler from './TabHandler';
const AdminPanel = props => {


  let slide = false;
  let classL = 'ui left demo vertical inverted sidebar labeled icon menu push';
  const [state, setState] = useState({
    menuName: 'Request',
    render: null
  })
  const userAuth = useSelector(st => st.userAuth);
  if((!userAuth.isAuthenticated || userAuth.userType !== 'admin') && userAuth.userLoaded)
    props.history.replace('login');
  const redirect = (ea) => {
    setState({
      ...state,
      menuName: ea,
    });
    slidefun();
  };
  const slidefun = () => {
    var sideBar = document.getElementById('slidebar');

    if (slide === false) {
      sideBar.className += ' visible';
      slide = true;
    } else {
      sideBar.className = classL;
      slide = false;
    }
  };
  if(userAuth.isAuthenticated && userAuth.userLoaded && userAuth.userType === 'admin' && state.render === null){
    const template = (
        <div className='m'>
          <Nav />
          <div className='side'>
            <div
              className='ui left demo  vertical inverted sidebar labeled icon menu push'
              id='slidebar'
            >
              <div className='a-logo'></div>
              <li onClick={() => redirect('Request')} className='item'>
                ACTIVE REQUEST
              </li>
              <li onClick={() => redirect('VendorList')} className='item'>
                SERVICE STATION LIST
              </li>
              {/* <li  onClick={()=>this.redirect('t')} className="item">
                          TOTAL SERVICES
                      </li> */}
              <li onClick={() => redirect('UserList')} className='item'>
                USER LIST
              </li>
            </div>
            <div className='dimmed pusher'>
              <div onClick={slidefun} className='slide-control'>
                <i className='fas fa-align-justify '></i>
              </div>
            </div>
          </div>
          <TabHandler name={state.menuName} />
        </div>
    )  
    setState({
      ...state,
      render: template
    })
  }
    return state.render;
}

export default AdminPanel;
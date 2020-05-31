import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import SearchResults from './SearchResults/SearchResultsWrapper';
import vendor from './Vendor Interface/vendorWrapper';
import addServiceStation from '../Components/Vendor Interface/AddServiceStation';
import SearchDetails from './SearchResults/SearchDetails/SearchDetails';
import AdminPanel from './Admin/Admin';
import BookingForm from './BookingForm/BookingForm';
import Alert from './Utility Components/Alert';
import { Provider } from 'react-redux';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/userAuth';
import photoUpload from './Utility Components/photoUpload';

if (localStorage.Token) {
  setAuthToken(localStorage.Token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Alert />
      {/* <Loader/> */}
      <BrowserRouter>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/landing' component={Landing}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/searchResult' component={SearchResults}></Route>
        <Route exact path='/serviceStationDetails' component={SearchDetails}></Route>
        <Route exact path='/vendor' component={vendor}></Route>
        <Route exact path='/addSS' component={addServiceStation}></Route>
        <Route exact path='/admin' component={AdminPanel}></Route>
        <Route exact path='/book' component={BookingForm}></Route>
        <Route exact path='/photoUpload' component={photoUpload}></Route>
      </BrowserRouter>
    </Provider>
  );
};
export default App;

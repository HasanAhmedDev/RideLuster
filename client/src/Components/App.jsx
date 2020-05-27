import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import SearchResults from './SearchResults/SearchResultsWrapper';
import vendor from './Vendor Interface/vendorWrapper';
import SearchDetails from './SearchResults/SearchDetails/SearchDetails';
import AdminPanel from './Admin/Admin';
import BookingForm from './BookingForm/BookingForm';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/landing' component={Landing}></Route>
          <Route exact path='/signup' component={Signup}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/searchResult' component={SearchResults}></Route>
          <Route
            exact
            path='/searchResult/:id'
            component={SearchDetails}
          ></Route>
          <Route exact path='/vendor' component={vendor}></Route>
          <Route exact path='/admin' component={AdminPanel}></Route>
          <Route exact path='/book' component={BookingForm}></Route>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;

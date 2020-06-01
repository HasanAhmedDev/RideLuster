import React from 'react';
import './SearchResults.css';
import { Grid, Card, Button, Dropdown } from 'semantic-ui-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Nav from '../Utility Components/Nav';
import Footer from '../Footer/Footer';
import Loader from '../Utility Components/Loader';
import { withRouter } from 'react-router-dom';
import { searchServiceStation, getAllServiceStation } from '../../actions/user';
import { showLoader } from '../../actions/loader';
import { Pagination } from 'semantic-ui-react'
import { useEffect } from 'react';
import { useState } from 'react';

const SearchResults = (props) => {
  const [state, setState] = useState({
    areas: [],
    areasLoaded: false
  })
  const user = useSelector((st) => st.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(showLoader(true));
    dispatch(getAllServiceStation());
    
  },[]);
  if(user.areas.length && !state.areasLoaded){
    let areasArray = user.areas.map((area)=>{
      return {
        key: area,
        text: area,
        value: area
      }
    })
    setState({
      ...state,
      areas: areasArray,
      areasLoaded: true
    })
  }
  const searchSS = async (e, { value }) => {
    dispatch(showLoader(true));
    dispatch(searchServiceStation({area: value, page: 1}));
  };

  const ssDetails = (index) => {
    dispatch(showLoader(true));
    setTimeout(()=>{
      props.history.push({
        pathname: 'serviceStationDetails',
        ssID: index,
      });
    }, 1000)
  };
  const onPageChange = (event, data) =>{
    dispatch(showLoader(true));
    dispatch(searchServiceStation({area: user.docs[0].area,page: data.activePage}));
  }
  const serviceDetails = () =>{
    dispatch(showLoader(true));
    setTimeout(()=>{
      props.history.push({
        pathname: 'serviceDetails',
        render: true
      })
    }, 1000)
    
  }

  const booking = (ssID)=>{
    dispatch(showLoader(true));
    setTimeout(()=>{
      props.history.push({
        pathname: 'book',
        ssID: ssID
      })
    }, 1000)
  }
  return (
    <div>
      <Loader />
      <div className='nav'>
        <Nav />
      </div>
      <div className='searchres'>
        {user.docs.length ? (
          <h3 className='ui block header'>
            {' '}
            {'Search Results: For ' + user.docs[0].area}{' '}
          </h3>
        ) : null}
      </div>
      <div className='main'>
        <button onClick={serviceDetails} class="ui fluid positive button">Completed Services</button>
        <div className='searchBarUser'>
          <Dropdown
            onChange={searchSS}
            placeholder='Select Location'
            fluid
            selection
            options={state.areas}
          />
        </div>
        <Grid centered>
          {user.docs.length ? (
            user.docs.map((ss, index) => {
              return (
                <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                  <Card className='card'>
                    <img
                      className='searchimg'
                      src={`http://localhost:5000/servicestations_photos/${ss.photo}`}
                      alt='No Image Uploaded'
                    />
                    <Card.Content>
                      <Card.Header>{ss.name}</Card.Header>
                      <Card.Meta>
                        <span className='date'>
                          {ss.area}:{' '}
                          <span
                            className={ss.status === 'Open' ? 'green' : 'red'}
                          >
                            {' '}
                            {ss.status}
                          </span>
                        </span>
                      </Card.Meta>
                      <Card.Description className='desc'>
                        Basic:
                        <ul className='services'>
                          <li>
                            Wash/Service{' '}
                            <div className='ic'>
                              {ss.services.find(
                                (service) => service === 'Wash'
                              ) ? (
                                <i className='green check circle icon'></i>
                              ) : (
                                <i className='red times circle icon'></i>
                              )}
                            </div>
                          </li>
                          <li>
                            Compound/Polish{' '}
                            <div className='ic'>
                              {ss.services.find(
                                (service) => service === 'Polish'
                              ) ? (
                                <i className='green check circle icon'></i>
                              ) : (
                                <i className='red times circle icon'></i>
                              )}
                            </div>
                          </li>
                          <li>
                            Oil Change{' '}
                            <div className='ic'>
                              {ss.services.find(
                                (service) => service === 'Oil Change'
                              ) ? (
                                <i className='green check circle icon'></i>
                              ) : (
                                <i className='red times circle icon'></i>
                              )}
                            </div>
                          </li>
                        </ul>
                        <Button
                          style={{ marginBottom: '1%' }}
                          fluid
                          content='Book Now'
                          primary
                          onClick={()=> booking(ss._id)}
                        />
                        <Button
                          fluid
                          content='Details'
                          onClick={() => ssDetails(index)}
                        />
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })
          ) : !user.docs.length ? (
            <h3 className='ui block header'>
              Search Your Nearest Service Station{' '}
            </h3>
          ) : null}
        </Grid>
        {user.docs.length ?
        <div className="pagination">
          <Pagination
            // boundaryRange={0}
            defaultActivePage={1}
            // ellipsisItem={null}
            // firstItem={user.prevpage}
            // lastItem={user.nextpage}
            siblingRange={1}
            totalPages={user.totalpages}
            onPageChange={onPageChange}
          />
        </div> : null
        }
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(connect(null)(SearchResults));

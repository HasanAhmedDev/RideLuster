import React from 'react';
import './SearchResults.css';
import { Grid, Card, Button, Dropdown } from 'semantic-ui-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Nav from '../Utility Components/Nav';
import Footer from '../Footer/Footer';
import Loader from '../Utility Components/Loader';
import { withRouter } from 'react-router-dom';
import { searchServiceStation } from '../../actions/user';
import { showLoader } from '../../actions/loader';
import { Pagination } from 'semantic-ui-react'
import { useEffect } from 'react';

const locationOptions = [
  {
    key: 'johar',
    text: 'Johar Town',
    value: 'Johar Town',
  },
  {
    key: 'Wapda',
    text: 'Wapda Town',
    value: 'Wapda Town',
  },
  {
    key: 'Faisal',
    text: 'Faisal Town',
    value: 'Faisal Town',
  },
];

const SearchResults = (props) => {
  const user = useSelector((st) => st.user);
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("USE EFFECT SR")
    dispatch(showLoader(false));
  });
  const searchSS = async (e, { value }) => {
    dispatch(showLoader(true));
    dispatch(searchServiceStation(value, 1));
  };

  const ssDetails = (index) => {
    dispatch(showLoader(true));
    props.history.push({
      pathname: 'serviceStationDetails',
      ssID: index,
    });
  };
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
        <div className='searchBarUser'>
          <Dropdown
            onChange={searchSS}
            placeholder='Select Location'
            fluid
            selection
            options={locationOptions}
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
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={user.nextpage}
            lastItem={user.prevpage}
            siblingRange={1}
            totalPages={user.totalpages}
          />
        </div> : null
        }
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(connect(null)(SearchResults));

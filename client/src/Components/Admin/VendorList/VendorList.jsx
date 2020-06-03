import React, { useEffect } from 'react';
import axios from 'axios';
import './VendorList.css';
import { Grid, Segment, Card, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loadSS } from '../../../actions/admin';
const VendorList = (props) => {
  let SS;
  const isAuthenticated = useSelector((st) => st.userAuth.isAuthenticated);
  const userType = useSelector((st) => st.userAuth.userType);
  useEffect(() => {
    props.loadSS();
  }, []);

  const servicestations = useSelector((st) => st.admin.servicestations);

  if (isAuthenticated == null && userType !== 'admin') {
    return <Redirect to='/login' />;
  }
  const handleDelete = async (id) => {
    if (id) {
      const res = await axios.delete(
        `/api/auth/admin/deleteservicestation/${id}`
      );
      console.log(res);
      props.loadSS();
    }
  };
 

  if (servicestations) {
    SS = servicestations.map((d) => (
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Segment className='segment'>
          <Card className='card'>
            <img className='searchimg' src={`http://localhost:5000/servicestations_photos/${d.photo}`} alt='No Image Uploaded' />
            <Card.Content>
              <Card.Header>{d.name}</Card.Header>
              <Card.Header>{d.area}</Card.Header>
              <Card.Meta>
                <span className='date'>
                  Owner Name: <span className='green'> {d.owner.name}</span>
                </span>
              </Card.Meta>
              {/* <Link to='/searchResult/1'>
                <Button fluid content='Details' />
              </Link> */}
              <Button
                style={{ marginTop: '1%' }}
                fluid
                onClick={() => handleDelete(`${d._id}`)}
                content='Delete'
                color='red'
              />
            </Card.Content>
          </Card>
        </Segment>
      </Grid.Column>
    ));
  } else {
    SS = (
      <div className='noreq'>
        <h5>No Service Station Registered</h5>
      </div>
    );
  }
  return (
    <div className='main'>
      <div class='ui fluid action input' id='search'>
        <input type='text' placeholder='Search...' />
        <div class='ui button'>Search</div>
      </div>
      <Grid centered>
        {SS}
      </Grid>
    </div>
  );
};
export default connect(null, { loadSS })(VendorList);

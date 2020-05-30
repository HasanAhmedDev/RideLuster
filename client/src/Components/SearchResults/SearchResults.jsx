import React, {useState} from "react";
import "./SearchResults.css";
import { Grid, Segment, Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import Nav from '../Utility Components/Nav';
import Footer from '../Footer/Footer';
import { Link, Redirect } from 'react-router-dom';
const SearchResults = props => {
  
    return (
      <div>
        <div className="nav">
          <Nav/>
        </div>
        <div className="searchres">
          <h3 className="ui block header">Search Results: For Johar Town</h3>
        </div>
        <div className="main">
          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Segment className="segment">
                <Card className="card">
                <img
                className="searchimg"
                    src="https://onlybusinessideas.com/wp-content/uploads/2019/11/Petrol-pump-business.jpg"
                    alt="img"
                  />
                  <Card.Content>
                    <Card.Header>Total Service Station</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Basic:
                      <ul className="services">
                      <li>Wash/Service <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Compound/Polish <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Oil Change <div className="ic"><i className="green check circle icon"></i></div></li>
                      </ul>
                      <Button
                        style={{ marginBottom: "1%" }}
                        fluid
                        content="Book Now"
                        primary
                      />
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Segment>
                <Card>
                <img
                className="searchimg"
                    src="https://jooinn.com/images/petrol-station-6.jpg"
                    alt="img"
                  />
                  <Card.Content>
                    <Card.Header>Total Service Station</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="red"> Closed</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Basic:
                      <ul className="services">
                        <li>Wash/Service <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Compound/Polish <div className="ic"><i className="red times circle icon"></i></div></li>
                        <li>Oil Change <div className="ic"><i className="green check circle icon"></i></div></li>
                      </ul>
                      <Button
                        style={{ marginBottom: "1%" }}
                        fluid
                        content="Book Now"
                        primary
                      />
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Segment>
                <Card>
                <img
                className="searchimg"
                    src="https://onlybusinessideas.com/wp-content/uploads/2019/11/Petrol-pump-business.jpg"
                    alt="img"
                  />
                  <Card.Content>
                    <Card.Header>Total Service Station</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Basic:
                      <ul className="services">
                      <li>Wash/Service <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Compound/Polish <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Oil Change <div className="ic"><i className="red times circle icon"></i></div></li>
                      </ul>
                      <Button
                        style={{ marginBottom: "1%" }}
                        fluid
                        content="Book Now"
                        primary
                      />
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Segment>
                <Card>
                  <img
                  className="searchimg"
                    src="https://onlybusinessideas.com/wp-content/uploads/2019/11/Petrol-pump-business.jpg"
                    alt="img"
                  />
                  <Card.Content>
                    <Card.Header>Total Service Station</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Basic:
                      <ul className="services">
                      <li>Wash/Service <div className="ic"><i className="green check circle icon"></i></div></li>
                        <li>Compound/Polish <div className="ic"><i className="red times circle icon"></i></div></li>
                        <li>Oil Change <div className="ic"><i className="red times circle icon"></i></div></li>
                      </ul>
                      <Button
                        style={{ marginBottom: "1%" }}
                        fluid
                        content="Book Now"
                        primary
                      />
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        <Footer/>
      </div>
    );
}

export default connect(null)(SearchResults);

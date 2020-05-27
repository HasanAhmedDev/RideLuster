import React from "react";
import "./VendorList.css";
import { Grid, Segment, Card, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
export default class VendorList extends React.Component{
    render(){
        return(
            <div className="main">
                <div class="ui fluid action input" id="search">
                <input type="text" placeholder="Search..."/>
                <div class="ui button">Search</div>
            </div>
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
                    <Card.Header>ID RL-147</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Served Vehicle: 38              
                      <div class="ui star rating" data-rating="3"></div>        
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
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
                    <Card.Header>ID RL-147</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Served Vehicle: 38                      
                      <Link to="/searchResult/1">
                        <Button fluid content="Details" />
                      </Link>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
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
                    <Card.Header>ID RL-147</Card.Header>
                    <Card.Meta>
                      <span className="date">Johar Town: <span className="green"> Open</span></span>
                    </Card.Meta>
                    <Card.Description className="desc">
                      Served Vehicle: 38                      
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
        )
    }
}
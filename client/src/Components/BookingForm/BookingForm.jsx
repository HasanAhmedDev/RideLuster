import React, { Component } from "react";
import { Button, Form, Input, Dropdown } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import "./BookingForm.css";
import { connect } from "react-redux";
import { bookService } from  '../../actions/user';
import { Redirect } from "react-router";

const initialState = {
  vhType: "",
  service: false,
  polish: false,
  oil: false,
  make: "",
  model: "",
  reg: "",
  con: "",
  vhErr:"",
  serErr:"",
  makeErr:"",
  modelErr:"",
  regErr:"",
  conErr:""
};

const serviceOptions = [
  {
    key: 'Wash',
    text: 'Wash',
    value: 'Wash',
  },
  {
    key: 'Polish',
    text: 'Polish',
    value: 'Polish',
  },
  {
    key: 'Oil Change',
    text: 'Oil Change',
    value: 'Oil Change',
  },
]

const divStyle = {
  height: window.screen.height,
};

class BookingForm extends Component {
  constructor(props){
    super(props)
    if(!props.location.ssID){
      props.history.replace('searchResult');
    }
  }
  state = initialState;
  
  changeService=()=>{
    this.setState({
      service: !this.state.service
    });
  }
  
  changePolish=()=>{
    this.setState({
      polish: !this.state.polish
    });
  }
  changeOil=()=>{
    this.setState({
      oil: !this.state.oil
    });
  }

  vaidate = () => {
    let vhErr=""
    let serErr=""
    let makeErr=""
    let modelErr=""
    let regErr=""
    let conErr=""

    if (!this.state.vhType) {
      vhErr = "* This field must be non-empty.";
    }
    this.setState({ vhErr });

    
    if (!(this.state.service||this.state.polish||this.state.oil)) {
      serErr = "* This field must be non-empty.";
    }
    this.setState({ serErr });

    if (this.state.make) {
      if (/^[A-Za-z]+\s*/.test(this.state.make) === false) {
        makeErr = "* Can contain only alphabets";
      }
    } else {
      makeErr = "* This field must be non-empty.";
    }

    this.setState({ makeErr });

    if (this.state.model) {

    } else {
      modelErr = "* This field must be non-empty.";
    }
    this.setState({ modelErr });

    if (this.state.reg) {
      if (/^[A-Za-z]+[0-9]+/.test(this.state.reg) === false) {
        regErr = "* Must be in valid format like LEX1212";
      }
    } else {
      regErr = "* This field must be non-empty.";
    }
    this.setState({ regErr })
    
    if (this.state.con) {
      if (/[0-9]/.test(this.state.con) === false) {
        conErr = "* Must be numbers only.";
      }
      else if (this.state.con.length!==11) {
        conErr = "* Must be 11 digits.";
      }
    } else
    {
      conErr = "* This field must be non-empty.";
    }
    this.setState({ conErr })

    if (vhErr || serErr || modelErr || makeErr || regErr || conErr) {
      return false;
    }
    return true;
  };

  handleSubmit = (evt) => {
    
    evt.preventDefault();
    let isvalid = this.vaidate();
    if (isvalid) {
      this.setState(initialState);
      console.log(this.props);
      this.props.bookService({
        vehicleType: this.state.vhType,
        vehicleMake: this.state.make,
        vehicleModel: this.state.model,
        vehicleNo: this.state.reg,
        serviceType: this.state.service,
        contactNo: this.state.con,
        clientId: this.props.location.cID,
        serviceStationId: this.props.location.ssID
      });
      this.props.history.replace('searchResult');
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  
  vehicleType = (e, {value}) => {
    this.setState({
      ...this.state,
      vhType: value
    })
  }

  serviceType = (e, {value}) => {
    this.setState({
      ...this.state,
      service: value
    })
  }

  render() {
    return (
      <Form.Field className="body" style={divStyle}>
        <Form.Field className="overlay">
          <Form.Field className="main-form">
            <Form onSubmit={this.handleSubmit} className="inside-form">
              <h4>Booking Details</h4>
              
                <Dropdown
                  placeholder='Select Vehicle'
                  fluid
                  selection
                  onChange={this.vehicleType}
                  options={[{
                    key: 'Car',
                    text: 'Car',
                    value: 'Car',
                  },
                  {
                    key: 'Bike',
                    text: 'Bike',
                    value: 'Bike',
                  }
                ]}
                />
              <div className="valerr" style={{margin: '10px'}}>{this.state.vhErr}</div>
                <Dropdown
                  placeholder='Select Service'
                  fluid
                  selection
                  onChange={this.serviceType}
                  options={serviceOptions}
                />
              <div style={{margin: '10px'}} className="valerr">{this.state.serErr}</div>
                <Form.Input
                  name="make"
                  value={this.state.make}
                  onChange={this.handleChange}
                  label="Make"
                  placeholder="Enter Make"
                
                />
                <div className="valerr">{this.state.makeErr}</div>
                <Form.Input
                  name="model"
                  value={this.state.model}
                  onChange={this.handleChange}
                  label="Model"
                  placeholder="Enter Model"
                  type="number"
                />
              <div className="valerr">{this.state.modelErr}</div>

              <Form.Field>
                <label>Reg Number</label>
                <Input
                  name="reg"
                  onChange={this.handleChange}
                  value={this.state.reg}
                  placeholder="LEX1232"
                />
                <div className="valerr">{this.state.regErr}</div>
              </Form.Field>
              <Form.Field>
                <label>Contact Number</label>
                <Input
                  name="con"
                  onChange={this.handleChange}
                  value={this.state.con}
                  placeholder="03241111111"
                  type="number"
                />
                <div className="valerr">{this.state.conErr}</div>
              </Form.Field>
              <Form.Field>
                <Button fluid color="blue" type="submit">
                  Book
                </Button>
              </Form.Field>
            </Form>
          </Form.Field>
        </Form.Field>
        <Footer />
      </Form.Field>
    );
  }
}
const mapDispatchToProps = {
  bookService
 };
export default connect(null, mapDispatchToProps)(BookingForm);

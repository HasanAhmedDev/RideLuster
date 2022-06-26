import React, { Component } from "react";
import { Button, Form, Input, Dropdown } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import "./BookingForm.css";
import { connect } from "react-redux";
import { bookService } from  '../../actions/user';
import DateTimePicker from 'react-datetime-picker';

const initialState = {
  vhType: "",
  make: "",
  model: "",
  reg: "",
  con: "",
  vhErr:"",
  serErr:"",
  makeErr:"",
  modelErr:"",
  regErr:"",
  conErr:"",
  dateErr: "",
  date: "",
  service: [],
  vehicles: [],
  doc: {}
};

let vehicles = [];
let services = [];

const divStyle = {
  height: window.screen.height,
};

class BookingForm extends Component {
  date = new Date();
  constructor(props){
    super(props)
    if(!props.location.ssID){
      props.history.replace('searchResult');
    } else {
      this.state = initialState;
      this.initOptions(props)
    }

  }

  initOptions = (props) => {
    props.user.docs.forEach((doc) => {
      if(doc._id == props.location.ssID) {
        let serviceOptions = []
        let vehicleOptions = []
        if(!serviceOptions.length)
          doc.services.forEach((service) => {
            serviceOptions.push({
              key: service,
              text: service,
              value: service,
            })
          })
        if(!vehicleOptions.length)
          doc.vehicles.forEach((vehicle) => {
            vehicleOptions.push({
              key: vehicle,
              text: vehicle,
              value: vehicle,
            })
          })

        vehicles = vehicleOptions
        services = serviceOptions
        console.log("COMINg", services, vehicles)
      }
    })
  }
  
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
    let dateErr=""

    if (!this.validateDate(this.date)) {
      dateErr = "Please Enter a valid Date and time.";
    }
    this.setState({ dateErr });

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

    if (vhErr || serErr || modelErr || makeErr || regErr || conErr || dateErr) {
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
        serviceStationId: this.props.location.ssID,
        date: this.date
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

  dateChange = (event) => {
    this.date = event;
  }

  validateDate = (date) => {
    if(date < new Date()) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Form.Field className="body" style={divStyle}>
        <Form.Field className="overlay">
          <Form.Field className="main-form">
            <h1 className='ui block header' style={{ }}>Booking Details</h1>
            <div style={{ margin: '20px auto', width: 'fit-content'}}>
              <DateTimePicker onChange={this.dateChange} value={this.date} />
              <div className="valerr" style={{margin: '10px'}}>{this.state.dateErr}</div>
            </div>
            <Form onSubmit={this.handleSubmit} className="inside-form">
                <label>Vehicle Type</label>
                <Dropdown
                  placeholder='Select Vehicle'
                  fluid
                  selection
                  onChange={this.vehicleType}
                  options={vehicles}
                />
              <div className="valerr" style={{margin: '10px'}}>{this.state.vhErr}</div>
                <label>Service Type</label>
                <Dropdown
                  placeholder='Select Service'
                  fluid multiple selection
                  onChange={this.serviceType}
                  options={services}
                  value={this.state.service}
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

const mapStateToProps = (state) => ({
  user: state.user
})
const mapDispatchToProps = {
  bookService
 };
export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);

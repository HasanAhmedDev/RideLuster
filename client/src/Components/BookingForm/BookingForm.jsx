import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import "./BookingForm.css";

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

const divStyle = {
  height: window.screen.height,
};

class BookingForm extends Component {
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
      if (/^[A-Za-z]+\s*/.test(this.state.model) === false) {
        modelErr = "* Can contain only alphabets";
      }
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
    console.log(this.state);
    let isvalid = this.vaidate();
    if (isvalid) {
      this.setState(initialState);
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
      <Form.Field className="body" style={divStyle}>
        <Form.Field className="overlay">
          <Form.Field className="main-form">
            <Form onSubmit={this.handleSubmit} className="inside-form">
              <h4>Booking Details</h4>
              <Form.Group>
                <label className="vhbold">Vehicle Type: </label>
                <Form.Field
                  label="Car"
                  control="input"
                  type="radio"
                  name="vhType"
                  value="car"
                  checked={this.state.vhType === "car"}
                  onChange={this.handleChange}
                  width={8}
                />
                <Form.Field
                  label="Bike"
                  control="input"
                  type="radio"
                  name="vhType"
                  value="bike"
                  checked={this.state.vhType === "bike"}
                  onChange={this.handleChange}
                  width={8}
                />
              </Form.Group>
              <div className="valerr">{this.state.vhErr}</div>
              <Form.Group>
                <label className="vhbold">Service: </label>
                <Form.Field
                  label="Wash"
                  control="input"
                  type="checkbox"
                  checked={this.state.service}
                  onChange={this.changeService}
                  width={4}
                />
                <Form.Field
                  label="Polish"
                  control="input"
                  type="checkbox"
                  checked={this.state.polish}
                  onChange={this.changePolish}
                  width={4}
                />
                <Form.Field
                  label="Oil Change"
                  control="input"
                  type="checkbox"
                  checked={this.state.oil}
                  onChange={this.changeOil}
                  width={4}
                />
              </Form.Group>
              <div className="valerr">{this.state.serErr}</div>
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
export default BookingForm;

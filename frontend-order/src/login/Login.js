import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Card, CardHeader, CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import {login} from '../actions/loginAction';
import swal from 'sweetalert';
import axios from '../axios-store';
import './Login.css';


class Login extends Component {
  state = {};

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value})
    
  }
  
  onChangePassword = (event) => {
    this.setState({ password: event.target.value})
  }

  onLogin = () => { 
    swal("Login...", {
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: false
    });
    axios.post('/api/auth/login', this.state).then(res => {
      swal.close();
      this.props.login(res);
    }).catch(err => {
      swal("Fail to connect to the server", "Please try again", "error");
    })
  }

  componentDidMount() {
    axios.get('/api/auth/login').then(res => {
      this.props.login(res);
    }).catch(err => {
      throw err;
    })
  }

  render() {
    return (
      <Card className="Login">
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <Col>
            <FormGroup>
              <Label>username</Label>
              <Input
                onChange={this.onChangeUsername}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                onChange={this.onChangePassword}
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button onClick={this.onLogin}>Submit</Button>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = function(state) {
  return {
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    login: (data) => {
      dispatch(login(data));
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);
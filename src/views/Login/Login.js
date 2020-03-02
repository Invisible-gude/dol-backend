import React, { Component } from 'react';
import swal from 'sweetalert';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import UserModel from '../../models/UserModel';


var user_model = new UserModel;
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fireRedirect: false
    }
  }
  async componentDidMount() {

  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var employee_username = document.getElementById("employee_username").value;
    var employee_password = document.getElementById("employee_password").value;
    if (employee_username == '') {
      swal({
        title: "Warning!",
        text: "Please Check Your Username ",
        icon: "warning",
        button: "Close",
      });

    } else if (employee_password == '') {
      swal({
        title: "Warning!",
        text: "Please Check Your Password ",
        icon: "warning",
        button: "Close",
      });
    } else {
      arr['employee_username'] = employee_username;
      arr['employee_password'] = employee_password;
      const user_login = await user_model.getLogin(arr);
      if (user_login) {
        localStorage.setItem('user_login', JSON.stringify(user_login));
        window.location.reload()
      } else {
        swal({
          title: "Warning!",
          text: "Please Check Your  Username  Or Password ",
          icon: "warning",
          button: "Close",
        });

      }
    }

  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} id="myForm" style={{backgroundColor:'#fff'}}>
        <div>
          <Container className="flex-login">
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4  background-login-card">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="employee_username" name="employee_username" placeholder="Username" aria-describedby="inputGroupPrepend21"  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="employee_password" name="employee_password" placeholder="Password"  />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" id="login_btn" name="login_btn" className="px-4"  >Login</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </Form>
    );
  }
}

export default Login;


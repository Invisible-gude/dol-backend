import React, { Component } from 'react';
import GOBALS from '../../GOBALS';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  FormFeedback,
  Input
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import UserModel from '../../models/UserModel';
import DepartmentModel from '../../models/DepartmentModel';
import { Select } from 'antd'


var employee_model = new UserModel;
var department_model = new DepartmentModel;

const { Option } = Select;

class EmployeeInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      department: [],
      select_value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const department = await department_model.getDepartmentBy();
    this.setState({
      department: department.data,
    })
  }



  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var employee_name = document.getElementById("employee_name").value;
    var employee_lastname = document.getElementById("employee_lastname").value;
    var employee_department = this.state.select_value;
    var employee_email = document.getElementById("employee_email").value;
    var employee_tel = document.getElementById("employee_tel").value;
    var employee_username = document.getElementById("employee_username").value;
    var employee_password = document.getElementById("employee_password").value;

    if (employee_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Name ",
        icon: "warning",
        button: "Close",
      });

    } else if (employee_lastname == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Lastname ",
        icon: "warning",
        button: "Close",
      });
    } else if (employee_tel == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Telephone Number ",
        icon: "warning",
        button: "Close",
      });
    } else if (employee_department == '') {
      swal({
        title: "Warning!",
        text: "Please Select Department ",
        icon: "warning",
        button: "Close",
      });
    } else if (employee_username == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Username ",
        icon: "warning",
        button: "Close",
      });
    } else if (employee_password == '') {
      swal({
        title: "Warning!",
        text: "Please Enter password ",
        icon: "warning",
        button: "Close",
      });
    } else if (employee_email == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Email ",
        icon: "warning",
        button: "Close",
      });
    }else {
    arr['department_id'] = employee_department;
    arr['employee_name'] = employee_name;
    arr['employee_lastname'] = employee_lastname;
    arr['employee_email'] = employee_email;
    arr['employee_tel'] = employee_tel;
    arr['employee_username'] = employee_username;
    arr['employee_password'] = employee_password;

    const employee = await employee_model.insertEmployee(arr);
    // console.log('employee ', arr);
    if (employee.query_result == true) {
      swal("Save success!", {
        icon: "success",
      });
      this.props.history.push('/employee');
    } else {
      window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
    }
  }
}
  _onAdminUserChange(event) {

    const employee_user_text = event.target.value;
    console.log("employee_user_text", employee_user_text)
    let USER_REGEX = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]{5}$/;


    if (employee_user_text == '') {
      this.setState({
        employee_user_validate: "",
        employee_user_validate_text: "",
      })
    } else if (USER_REGEX.test(employee_user_text) === false) {
      this.setState({
        employee_user_validate: "INVALID-FORMAT",
        employee_user_validate_text: "Invalid user format.",
      })
      console.log("INVALID-FORMAT : ", employee_user_text);
      return false;
    } else {
      employee_model.checkUsernameEmployee({ 'employee_username': employee_user_text }).then((responseJson) => {
        console.log("employee_user_text",employee_user_text)
        console.log('finduser', responseJson)
        if (responseJson.data.length == 0) {
          this.setState({
            employee_user_validate: "VALID",
            employee_user: employee_user_text
          })
          console.log("VALID : ", employee_user_text);
        } else {
          this.setState({
            employee_user_validate: "INVALID-DUPLICATE",
            employee_user_validate_text: "This user already exists.",
          })
          console.log("INVALID-DUPLICATE : ", employee_user_text);
        }
        this.render();
      });

    }
  }
  _onChange(value) {
    //console.log(value) - just to see what we recive from <Select />
    this.setState({ select_value: value });
  }
  render() {
    let department_select = this.state.department.map((item, index) => (
      <Option key={index} value={item.department_id}>{item.department_name}</Option>
    ))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <Form onSubmit={this.handleSubmit} id="myForm">
                <CardHeader>
                  เพิ่มลูกค้า / Add Customer
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อ / Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="employee_name" name="employee_name" className="form-control" />
                        <p className="help-block">Example : วินัย.</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>นามสกุล / Lastname <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="employee_lastname" name="employee_lastname" className="form-control" />
                        <p className="help-block">Example : ชาญชัย.</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>แผนก / Department <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกแผนก"
                          id="employee_department"
                          onChange={this._onChange.bind(this)}
                          value={this.state.select_value}>
                          {department_select}
                        </Select>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>อีเมล์ / Email <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="employee_email" name="employee_email" className="form-control" />
                        <p className="help-block">Example : winai@gmail.com</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>หมายเลขโทรศัพท์ / Tel. <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="employee_tel" name="employee_tel" className="form-control" />
                        <p className="help-block">Example : 0812345678</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>Username<font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="employee_username" name="employee_username" className="form-control"
                          valid={this.state.employee_user_validate == "VALID"}
                          invalid={this.state.employee_user_validate == "INVALID-FORMAT" || this.state.employee_user_validate == "INVALID-DUPLICATE"}
                          onChange={(e) => { this._onAdminUserChange(e) }}
                        />
                      
                        <FormFeedback valid >You can use this username.</FormFeedback>
                        <FormFeedback invalid >{this.state.employee_user_validate_text}</FormFeedback>
                      </FormGroup>

                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>Password <font color="#F00"><b>*</b></font></Label>
                        <Input type="password" id="employee_password" name="employee_password" className="form-control" />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Link to="/employee"><Button type="buttom" size="sm" > Back </Button></Link>
                  {/* <Button type="button" onClick={this.uploadImage} size="sm" color="danger"> Reset</Button> */}
                  <Button type="submit" size="sm" color="primary">Save</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default EmployeeInsert;


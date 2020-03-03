import React, { Component } from 'react';
import GOBALS from '../../GOBALS';

import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  Input, CardFooter,
  CustomInput
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import UserModel from '../../models/UserModel';
import DepartmentModel from '../../models/DepartmentModel';
import { Select } from 'antd'

var employee_model = new UserModel;
var department_model = new DepartmentModel;
const { Option } = Select;

class EmployeeUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
        department:[],
        upload_url: 'employee',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const employee_id = this.props.match.params.employee_id;
    const emp_id = employee_id;
    const employee_bycode = await employee_model.getEmployeeByEmployeeCode({ employee_id: emp_id });
    let employee = employee_bycode.data[0]
    // console.log("employee",employee)
    document.getElementById("employee_id").value = employee.employee_id
    document.getElementById("employee_name").value = employee.employee_name;
    document.getElementById("employee_lastname").value = employee.employee_lastname;
    document.getElementById("employee_email").value = employee.employee_email;
    document.getElementById("employee_tel").value = employee.employee_tel;
    const department = await department_model.getDepartmentBy();
    this.setState({
      department: department.data,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var employee_id = document.getElementById("employee_id").value;
    var employee_name = document.getElementById("employee_name").value;
    var employee_lastname = document.getElementById("employee_lastname").value;
    var employee_email = document.getElementById("employee_email").value;
    var employee_tel = document.getElementById("employee_tel").value;
    if (employee_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });

    } else if (employee_lastname == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Lastname ",
        icon: "warning",
        button: "Close",
      });
    } else {

      arr['employee_id'] = employee_id;
      arr['employee_name'] = employee_name;
      arr['employee_lastname'] = employee_lastname;
      arr['employee_email'] = employee_email;
      arr['employee_tel'] = employee_tel;
      
      const employee = await employee_model.updateEmployeeByEmployeeCode(arr);
      console.log('image',employee);
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
  _onChange(value) {
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
                    แก้ไขพนักงาน / Edit Employee
                    </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="3">
                        <FormGroup>
                          <Label>ชื่อ / Name <font color="#F00"><b>*</b></font></Label>
                          <Input type="hidden" id="employee_id" name="employee_id" className="form-control" />
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


export default EmployeeUpdate;


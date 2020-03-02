import React, { Component } from 'react';
import GOBALS from '../../GOBALS';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
   CardFooter,
  CustomInput
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import DepartmentModel from '../../models/DepartmentModel';
import { Input, Select } from 'antd'

var department_model = new DepartmentModel;

const { Option } = Select;
class EmployeeInsert extends Component {

    constructor(props) {
      super(props)
      this.state = {
        employee_id: '',
        department_name:''
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    async componentDidMount() {
      console.log("componentDidMount");
      const res = await department_model.getDepartmentBy();
      let employee = res.data.map((item,index) => res.data[index].department_name)
      console.log(res.data.map((item,index) => res.data[index].department_name));
      this.setState(
        {department_name : employee}
      )
      console.log(this.state.department_name);
      }
    
  
  
    async handleSubmit(event) {
      event.preventDefault();
      var arr = {};
      var employee_name = document.getElementById("employee_name").value;
      var employee_lastname = document.getElementById("employee_lastname").value;
  
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
      } 
        arr['customer_name'] = employee_name;
        arr['employee_lastname'] = employee_lastname;
        
        const employee = await department_model.insertCustomer(arr);
        console.log('customer ',employee);
        if (employee.ressult == true) {
          swal("Save success!", {
            icon: "success",
          });
          this.props.history.push('/customer');
        } else {
          window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
        }
      }
    
  
 
  
    render() {
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
                          <Input type="text" id="customer_name" name="customer_name" class="form-control" />
                          <p class="help-block">Example : วินัย.</p>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label>นามสกุล / Lastname <font color="#F00"><b>*</b></font></Label>
                          <Input type="text" id="customer_lastname" name="customer_lastname" class="form-control" />
                          <p class="help-block">Example : ชาญชัย.</p>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label>แผนก / Department <font color="#F00"><b>*</b></font> </Label>
                          <Select mode="multiple" placeholder="Please select favourite colors">
                            <Option value={this.state.department_name}>{this.state.department_name}</Option>
                            {/* <Option value="green">Green</Option>
                            <Option value="blue">Blue</Option> */}
                          </Select>        
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Link to="/user"><Button type="buttom" size="sm" > Back </Button></Link>
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


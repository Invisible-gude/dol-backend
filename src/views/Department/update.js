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
import DepartmentModel from '../../models/DepartmentModel';
import { Select } from 'antd'

var department_model = new DepartmentModel;
const { Option } = Select;

class DepartmentUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
        department:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const department_id = this.props.match.params.department_id;
    const department_bycode = await department_model.getDepartmentByCode({ department_id: department_id });
    let department = department_bycode.data[0]
    document.getElementById("department_id").value = department.department_id;
    document.getElementById("department_name").value = department.department_name;
    this.setState({
      department: department.data,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var department_id = document.getElementById("department_id").value;
    var department_name = document.getElementById("department_name").value;
    if (department_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });

    }  else {

      arr['department_id'] = department_id;
      arr['department_name'] = department_name;

      const department = await department_model.updateDepartmentByCode(arr);
      if (department.query_result == true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/department');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
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
                  เพิ่มแผนก / Add Department
                </CardHeader>
                <CardBody>
                <FormGroup row>
                    <Col lg="6">
                      <FormGroup>
                        <Label>ชื่อแผนก / Department Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="hidden" id="department_id" name="department_id" className="form-control" />
                        <Input type="text" id="department_name" name="department_name" className="form-control" />
                        <p className="help-block">Example : นายช่างรังวัดปฏิบัติงาน</p>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Link to="/department"><Button type="buttom" size="sm" > Back </Button></Link>
                  <Button type="submit" size="sm" color="primary">Save</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  };
}

  export default DepartmentUpdate;
import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  Input
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ProcessModel from '../../models/ProcessModel';
import DepartmentModel from '../../models/DepartmentModel';
import { Select } from 'antd'


var process_model = new ProcessModel();
var department_model = new DepartmentModel();
const { Option } = Select;

class ProcessInsert extends Component {

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
    var process_name = document.getElementById("process_name").value;
    var process_department = this.state.select_value;

    if (process_name === '') {
      swal({
        title: "Warning!",
        text: "Please Enter Name ",
        icon: "warning",
        button: "Close",
      });
    }else {
    arr['department_id'] = process_department;
    arr['process_name'] = process_name;

    const process = await process_model.insertProcess(arr);
    console.log('process ', arr);
    if (process.query_result === true) {
      swal("Save success!", {
        icon: "success",
      });
      this.props.history.push('/process');
    } else {
      window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
    }
  }
}
  _
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
                  เพิ่มขั้นตอน / Add Process
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อขั้นตอน / Process Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="process_name" name="process_name" className="form-control" />
                        <p className="help-block">Example : แก้ทะเบียน</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>แผนก / Department <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกแผนก"
                          id="process_department"
                          onChange={this._onChange.bind(this)}
                          value={this.state.select_value}>
                          {department_select}
                        </Select>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Link to="/process"><Button type="buttom" size="sm" > Back </Button></Link>
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


export default ProcessInsert;


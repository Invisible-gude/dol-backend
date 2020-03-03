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
import ProcessModel from '../../models/ProcessModel';
import DepartmentModel from '../../models/DepartmentModel';
import { Select } from 'antd'
var department_model = new DepartmentModel;
var process_model = new ProcessModel;
const { Option } = Select;

class ProcessUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
        department:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const process_id = this.props.match.params.process_id;
    const process_bycode = await process_model.getProcessByCode({ process_id: process_id });
    let process = process_bycode.data[0]
    document.getElementById("process_id").value = process.process_id;
    document.getElementById("process_name").value = process.process_name;
    const department = await department_model.getDepartmentBy();
    this.setState({
      department: department.data,
      select_value:process.department_id

    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var process_id = document.getElementById("process_id").value;
    var process_name = document.getElementById("process_name").value;
    var process_department = this.state.select_value;
    if (process_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });

    }  else {
      arr['process_id'] = process_id;
      arr['process_name'] = process_name;
      arr['department_id'] = process_department;
      const process = await process_model.updateProcessByProcessCode(arr);
      
      if (process.query_result == true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/process');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
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
                  เพิ่มแผนก / Add Process
                </CardHeader>
                <CardBody>
                <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อขั้นตอน / Process Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="hidden" id="process_id" name="process_id" className="form-control" />
                        <Input type="text" id="process_name" name="process_name" className="form-control" />
                        <p className="help-block">Example : วินัย.</p>
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
  };
}

  export default ProcessUpdate;
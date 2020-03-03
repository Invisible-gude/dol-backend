import React, { Component } from 'react';
import GOBALS from '../../GOBALS';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  FormFeedback,
  Input,
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceGroupModel from '../../models/ServiceGroupModel';
import { Select } from 'antd'


var servicetype_model = new ServiceTypeModel;
var servicegroup_model = new ServiceGroupModel;

const { Option } = Select;

class ServiceTypeInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicegroup: [],
      select_value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const servicegroup = await servicegroup_model.getServiceGroupBy();
    this.setState({
      servicegroup: servicegroup.data,
    })
  }



  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_type_name = document.getElementById("service_type_name").value;
    var service_group_id = this.state.select_value;

    if (service_type_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Name ",
        icon: "warning",
        button: "Close",
      });

    } else {
      arr['service_type_name'] = service_type_name;
      arr['service_group_id'] = service_group_id;

    const servicetype = await servicetype_model.insertServiceType(arr);
    console.log('employee ', arr);
    if (servicetype.query_result == true) {
      swal("Save success!", {
        icon: "success",
      });
      this.props.history.push('/servicetype');
    } else {
      window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
    }
  }
}
_onAdminUserChange(event) {
  const servicetype_name_text = event.target.value;
  if (servicetype_name_text == '') {
    this.setState({
      servicetype_name_validate: "",
      servicetype_name_validate_text: "",
    })
  } else {
    servicetype_model.checkServiceTypename({ 'service_type_name': servicetype_name_text }).then((responseJson) => {
      if (responseJson.data.length == 0) {
        this.setState({
          servicetype_name_validate: "VALID",
          servicetype_name: servicetype_name_text
        })
      } else {
        this.setState({
          servicetype_name_validate: "INVALID-DUPLICATE",
          servicetype_name_validate_text: "มีประเภทงานชื่อนี้แล้ว",
        })
      }
      this.render();
    });

  }
}
  _onChange(value) {
    this.setState({ select_value: value });
  }
  render() {
    let servicegroup_select = this.state.servicegroup.map((item, index) => (
      <Option key={index} value={item.service_group_id}>{item.service_group_name}</Option>
    ))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <Form onSubmit={this.handleSubmit} id="myForm">
                <CardHeader>
                  เพิ่มหัวเรื่อง / Add Service Type
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อหัวเรื่อง / Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="service_type_name" name="service_type_name" className="form-control" 
                         valid={this.state.servicetype_name_validate == "VALID"}
                         invalid={this.state.servicetype_name_validate == "INVALID-FORMAT" || this.state.servicetype_name_validate == "INVALID-DUPLICATE"}
                         onChange={(e) => { this._onAdminUserChange(e) }}
                       />
                       <FormFeedback valid >สามารถใช้ชื่อนี้ได้</FormFeedback>
                       <FormFeedback invalid >{this.state.servicetype_name_validate_text}</FormFeedback>
                        <p className="help-block">Example : งานรังวัด</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ประเภทงาน / Service Group <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_group_id"
                          onChange={this._onChange.bind(this)}
                          value={this.state.select_value}>
                          {servicegroup_select}
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


export default ServiceTypeInsert;


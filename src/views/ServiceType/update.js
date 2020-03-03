import React, { Component } from 'react';
import GOBALS from '../../GOBALS';

import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  Input, CardFooter,
  FormFeedback
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceGroupModel from '../../models/ServiceGroupModel';
import { Select } from 'antd'

var servicetype_model = new ServiceTypeModel;
var servicegroup_model = new ServiceGroupModel;
const { Option } = Select;

class ServiceGroupUpdte extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicegroup: [],
      select_value: "",
        upload_url: 'servicetype',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const service_type_id = this.props.match.params.service_type_id;
    const service_type_bycode = await servicetype_model.getServiceTypeByCode({ service_type_id: service_type_id });
    let servicetype = service_type_bycode.data[0];

    const servicegroup = await servicegroup_model.getServiceGroupBy();
    this.setState({
      servicegroup: servicegroup.data,
      select_value: servicetype.service_group_id,
      servicetype_select :  service_type_id
    })
    console.log("employee",servicetype)
    document.getElementById("service_type_id").value = servicetype.service_type_id
    document.getElementById("service_type_name").value = servicetype.service_type_name;
    document.getElementById("service_group_id").value = servicetype.service_group_id;
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_type_name = document.getElementById("service_type_name").value;
    var service_group_id = this.state.select_value;
    if (service_type_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Service Group Name ",
        icon: "warning",
        button: "Close",
      });
    }else {
      arr['service_type_name'] = service_type_name;      
      arr['service_group_id'] = service_group_id;     
      console.log("arr",arr);
       
      const servicetype = await servicetype_model.updateServiceTypeByCode(arr);
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
                    แก้ไขประเภทงาน / Edit Service Group
                    </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="3">
                        <FormGroup>
                          <Label>รหัสหัวเรื่อง / Service Type ID</Label>
                          <p>
                          <font color="#F00">
                              <b id="service_type_id" name="service_type_id" color="#F00">{this.state.servicetype_select}</b>
                            </font>
                          </p>
                        </FormGroup>
                      </Col>        
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
                          <p className="help-block">Example : งานแล้วเสร็จวันเดียว</p>
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
                    <Link to="/servicegroup"><Button type="buttom" size="sm" > Back </Button></Link>
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


export default ServiceGroupUpdte;


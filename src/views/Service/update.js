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
import ServiceModel from '../../models/ServiceModel';
import { Select } from 'antd'

var servicetype_model = new ServiceTypeModel;
var service_model = new ServiceModel;
const { Option } = Select;

class ServiceUpdte extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicetype: [],
      select_value: "",
        upload_url: 'service',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const service_id = this.props.match.params.service_id;
    const service_bycode = await service_model.getServiceByCode({ service_id: service_id });
    let service = service_bycode.data[0];
    
    const servicetype = await servicetype_model.getServiceTypeBy();
    this.setState({
      servicetype: servicetype.data,
      select_value: service.service_type_id,
      service_select :  service_id
    })
    document.getElementById("service_name").value = service.service_name;
    document.getElementById("service_type_id").value = service.service_type_id;
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_name = document.getElementById("service_name").value;
    var service_type_id = document.getElementById("service_type_id").value;
    if (service_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Service Group Name ",
        icon: "warning",
        button: "Close",
      });
    }else {
      arr['service_name'] = service_name;      
      arr['service_type_id'] = service_type_id;     
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
    let servicetype_select = this.state.servicetype.map((item, index) => (
      <Option key={index} value={item.service_type_id}>{item.service_type_name}</Option>
    ))

    return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <Form onSubmit={this.handleSubmit} id="myForm">
                  <CardHeader>
                    แก้ไขบริการ / Edit Service
                    </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="3">
                        <FormGroup>
                          <Label>รหัสบริการ/ Service ID</Label>
                          <p>
                          <font color="#F00">
                              <b id="service_type_id" name="service_type_id" color="#F00">{this.state.service_select}</b>
                            </font>
                          </p>
                        </FormGroup>
                      </Col>        
                      <Col lg="3">
                        <FormGroup>
                          <Label>ชื่อบริการ / Service Name <font color="#F00"><b>*</b></font></Label>
                          <Input type="text" id="service_name" name="service_name" className="form-control"
                          valid={this.state.servicetype_name_validate == "VALID"}
                          invalid={this.state.servicetype_name_validate == "INVALID-FORMAT" || this.state.servicetype_name_validate == "INVALID-DUPLICATE"}
                          onChange={(e) => { this._onAdminUserChange(e) }}
                        />
                        <FormFeedback valid >สามารถใช้ชื่อนี้ได้</FormFeedback>
                        <FormFeedback invalid >{this.state.servicetype_name_validate_text}</FormFeedback> 
                          <p className="help-block">Example : ขายฝาก</p>
                        </FormGroup>
                    </Col>    
                    <Col lg="3">
                        <FormGroup>
                        <Label>หัวเรื่อง / Service Group <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_group_id"
                          onChange={this._onChange.bind(this)}
                          value={this.state.select_value}>
                          {servicetype_select}
                        </Select>
                        </FormGroup>
                      </Col>              
                    </FormGroup>               
                  </CardBody>
                  <CardFooter>
                    <Link to="/service"><Button type="buttom" size="sm" > Back </Button></Link>
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


export default ServiceUpdte;


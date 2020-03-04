import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  Input, CardFooter,
  FormFeedback
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ServiceGroupModel from '../../models/ServiceGroupModel';

var servicegroup_model = new ServiceGroupModel();

class ServiceGroupUpdte extends Component {

  constructor(props) {
    super(props)
    this.state = {
        serGroup:[],
        upload_url: 'servicegroup',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const service_group_id = this.props.match.params.service_group_id;
    const servicegroup_id = service_group_id;
    const service_group_bycode = await servicegroup_model.getServiceGroupByCode({ service_group_id: servicegroup_id });
    let servicegroup = service_group_bycode.data[0]
    // console.log("employee",servicegroup)
    document.getElementById("service_group_id").value = servicegroup.service_group_id
    document.getElementById("service_group_name").value = servicegroup.service_group_name;
    this.setState({
      servicegroup_select :  service_group_id

    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_group_id = document.getElementById("service_group_id").value;
    var service_group_name = document.getElementById("service_group_name").value;
    if (service_group_name === '') {
      swal({
        title: "Warning!",
        text: "Please Enter Service Group Name ",
        icon: "warning",
        button: "Close",
      });
    }else {
      arr['service_group_id'] = service_group_id;      
      arr['service_group_name'] = service_group_name;      
      const servicegroup = await servicegroup_model.updateServiceGroup(arr);
      if (servicegroup.query_result === true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/servicegroup');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
    }
  }
  _onAdminUserChange(event) {
    const servicegroup_name_text = event.target.value;
    if (servicegroup_name_text === '') {
      this.setState({
        servicegroup_name_validate: "",
        servicegroup_name_validate_text: "",
      })
    } else {
      servicegroup_model.checkServiceGroupname({ 'service_group_name': servicegroup_name_text }).then((responseJson) => {
        if (responseJson.data.length === 0) {
          this.setState({
            servicegroup_name_validate: "VALID",
            servicegroup_name: servicegroup_name_text
          })
        } else {
          this.setState({
            servicegroup_name_validate: "INVALID-DUPLICATE",
            servicegroup_name_validate_text: "มีประเภทงานชื่อนี้แล้ว",
          })
        }
        this.render();
      });

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
                    แก้ไขประเภทงาน / Edit Service Group
                    </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <FormGroup>
                          <Label>รหัสประเภทงาน / Service Group ID</Label>
                          <p>
                          <font color="#F00">
                              <b id="service_group_id" name="service_group_id" color="#F00">{this.state.servicegroup_select}</b>
                            </font>
                          </p>
                        </FormGroup>
                      </Col>        
                      <Col lg="5">
                        <FormGroup>
                          <Label>ชื่อประเภทงาน / Name <font color="#F00"><b>*</b></font></Label>
                          <Input type="text" id="service_group_name" name="service_group_name" className="form-control"
                          valid={this.state.servicegroup_name_validate === "VALID"}
                          invalid={this.state.servicegroup_name_validate === "INVALID-FORMAT" || this.state.servicegroup_name_validate === "INVALID-DUPLICATE"}
                          onChange={(e) => { this._onAdminUserChange(e) }}
                        />
                        <FormFeedback valid >สามารถใช้ชื่อนี้ได้</FormFeedback>
                        <FormFeedback invalid >{this.state.servicegroup_name_validate_text}</FormFeedback> 
                          <p className="help-block">Example : งานแล้วเสร็จวันเดียว</p>
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


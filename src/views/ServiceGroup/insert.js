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
import ServiceGroupModel from '../../models/ServiceGroupModel';
import { Select } from 'antd'


var servicegroup_model = new ServiceGroupModel;

const { Option } = Select;

class ServiceGroupInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      department: [],
      select_value: "",
      
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const servicegroup_list = await servicegroup_model.getServiceGroupBy();
    // console.log("servicegroup_list ===",servicegroup_list);
    
    this.setState({
        servicegroup_list : servicegroup_list.data,
        servicegroup_id : servicegroup_list.data.map((item,index) => item.service_group_id)
    })
    // console.log("servicegroup_id",this.state.servicegroup_id)
  }



  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_group_name = document.getElementById("service_group_name").value;

    if (service_group_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Service Group Name ",
        icon: "warning",
        button: "Close",
      });
    }else {
    arr['service_group_name'] = service_group_name;

    const service_group = await servicegroup_model.insertServiceGroup(arr);
    // console.log('employee ', arr);
    if (service_group.query_result == true) {
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
    if (servicegroup_name_text == '') {
      this.setState({
        servicegroup_name_validate: "",
        servicegroup_name_validate_text: "",
      })
    } else {
      servicegroup_model.checkServiceGroupname({ 'service_group_name': servicegroup_name_text }).then((responseJson) => {
        if (responseJson.data.length == 0) {
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
                เพิ่มประเภทงาน / Add Service Group
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อประเภทงาน / Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="service_group_name" name="service_group_name" className="form-control"
                         valid={this.state.servicegroup_name_validate == "VALID"}
                         invalid={this.state.servicegroup_name_validate == "INVALID-FORMAT" || this.state.servicegroup_name_validate == "INVALID-DUPLICATE"}
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


export default ServiceGroupInsert;


import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  Input,
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceModel from '../../models/ServiceModel';
import { Select } from 'antd'


var servicetype_model = new ServiceTypeModel();
var service_model = new ServiceModel();

const { Option } = Select;

class ServiceTypeInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicetype: [],
      select_value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const servicetype = await servicetype_model.getServiceTypeBy();
    this.setState({
      servicetype: servicetype.data,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var service_name = document.getElementById("service_name").value;
    var service_type_id = this.state.select_value;

    if (service_name === '') {
      swal({
        title: "Warning!",
        text: "Please Enter Name ",
        icon: "warning",
        button: "Close",
      });

    } else {
      arr['service_name'] = service_name;
      arr['service_type_id'] = service_type_id;

    const service = await service_model.insertService(arr);
    console.log('employee ', arr);
    if (service.query_result === true) {
      swal("Save success!", {
        icon: "success",
      });
      this.props.history.push('/service');
    } else {
      window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
    }
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
                  เพิ่มบริการ / Add Service
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อบริการ / Service Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="service_name" name="service_name" className="form-control"                       
                       />
                        <p className="help-block">Example : งานรังวัด</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>หัวเรื่อง / Service Type <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_type_id"
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


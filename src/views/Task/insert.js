import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  Input, NavLink
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import DepartmentModel from '../../models/DepartmentModel';
import ServiceGroupModel from '../../models/ServiceGroupModel';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceModel from '../../models/ServiceModel';
import { Radio, Select, Table } from 'antd';

var department_model = new DepartmentModel();
var servicegroup_model = new ServiceGroupModel();
var servicetype_model = new ServiceTypeModel();
var service_model = new ServiceModel();

const { Option } = Select;

class TaskInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicegroup_list: [],
      servicegroup: [],
      servicetype_list: [],
      servicetype: [],
      disabled: true,
      disabledservice: true,
      disabledgroup: false,
      service: [],
      new_arr: [],
      selectgroup_name:[],
      selectgroup_value:[],
      selecttype_name:[],
      selecttype_value:[],
      selectservice_name:[],
      selectservice_value:[],
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this._inserTable = this._inserTable.bind(this)
    this._getServiceTypeByServiceGroup = this._getServiceTypeByServiceGroup.bind(this)
    this._getServiceByServiceType = this._getServiceByServiceType.bind(this)
  }

  async componentDidMount() {
    const servicegroup_list = await servicegroup_model.getServiceGroupBy();
    this.setState({
      servicegroup: servicegroup_list.data,
    })
    console.log("servicetype", this.state.servicetype.map(item => item.service_type_id));


  }
  async _onChangeServiceGroup(value,name) {
    await this.setState({
      selectgroup_value: value,
      selectgroup_name: name,
      disabled: false,
    });
    this._getServiceTypeByServiceGroup()
  }

  async _getServiceTypeByServiceGroup() {
    console.log("this.state.select_value", this.state.select_value);
    const servicetype_list = await servicetype_model.getServiceTypeByServiceGroupCode({ service_group_id: this.state.selectgroup_value });
    console.log("servicetype_list", this.state.servicetype_list);
    this.setState({
      servicetype: servicetype_list.data
    })
    
  }
  async  _onChangeServiceType(value,name) {
    await this.setState({
      selecttype_value: value,
      selecttype_name: name,
      disabledservice: false,
    });
    this._getServiceByServiceType();
  }
  async _getServiceByServiceType() {
    console.log("this.state.select_value", this.state.select_type_value);
    const service_list = await service_model.getServiceByServiceTypeCode({ service_type_id: this.state.selecttype_value });
    console.log("servicetype_list", this.state.service_list);
    this.setState({
      service: service_list.data
    })

  }
  _onChangeService(value,name) {
    this.setState({
      selectservice_value: value,
      selectservice_name: name,
    });
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var department_name = document.getElementById("department_name").value;

    if (department_name === '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });
    } else {
      arr['department_name'] = department_name;

      const department = await department_model.insertDepartment(arr);
      if (department.result === true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/department');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
    }
  }

  _inserTable(e) {
    e.preventDefault()
    console.log("Hello Button");

    var arr = {};
    var servicegroup = this.state.selectgroup_name.props.name;
    var selecttype = this.state.selecttype_name.props.name;
    var service = this.state.selectservice_name.props.name;
    console.log("servicegroup", servicegroup);
    console.log("selecttype", selecttype);
    console.log("service", service);


    arr['servicegroup'] = servicegroup;
    arr['selecttype'] = selecttype;
    arr['service'] = service;


    var new_arr = this.state.new_arr
    // new_arr =[...new_arr,arr]

    new_arr.push(arr) 
    console.log("arr", arr);
    console.log("new_arr", new_arr);

    this.setState({
      new_arr: new_arr,
      disabled: true,
      disabledgroup: true,

    })

  }


  render() {
    // {this.state.list.map(item => (
    //   <li key={item}>{item}</li>
    // ))}
    const columns = [


      {
        title: 'กลุ่ม',
        dataIndex: 'servicegroup',
        key: 'servicegroup',
        width: '25%',
        render: (text, record, index) => (
          <span key={index}>
            {text}
          </span>
        )
      },
      {
        title: 'ประเภท',
        dataIndex: 'selecttype',
        key: 'selecttype',
        width: '25%',
        render: (text, record, index) => (
          <span key={index}>
            {text}
          </span>
        )
      },
      {
        title: 'บริการ',
        dataIndex: 'service',
        key: 'service',
        width: '25%',
        render: (text, record, index) => (
          <span key={index}>
            {text}
          </span>
        )
      },
      // {
      //   title: 'สถานะ',
      //   dataIndex: 'service_group_id',
      //   key: 'service_group_id2',
      //   align: 'center',
      //   width: '25%',
      //   render: (text, record, index) =>
      //     <span>

      //     </span>
      // },
    ];
    let servicegroup_select = this.state.servicegroup.map((item, index) => (
      <Option key={index} value={item.service_group_id} name={item.service_group_name}>{item.service_group_name}</Option>
    ))
    let servicetype_select = this.state.servicetype.map((item, index) => (
      <Option key={index} value={item.service_type_id} name={item.service_type_name}>{item.service_type_name}</Option>
    ))
    let service_select = this.state.service.map((item, index) => (
      <Option key={index} value={item.service_id} name={item.service_name}>{item.service_name}</Option>
    ))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <Form onSubmit={this.handleSubmit} id="myForm">
                <CardHeader>
                  เพิ่มงาน / Add Task
                  </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ชื่อ / Name <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="department_name" name="department_name" className="form-control" />
                        <p className="help-block">Example : พิชญาภรณ์</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>นามสกุล / Lastname <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="department_name" name="department_name" className="form-control" />
                        <p className="help-block">Example : กระสินธุ์หอม</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>คิว / Queue <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="department_name" name="department_name" className="form-control" />
                        <p className="help-block">Example : 10111</p>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="10">
                      <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>เอกสารครบแล้ว</Radio>
                        <Radio value={2}>เอกสารยังไม่ครบ</Radio>
                      </Radio.Group>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="3">
                      <FormGroup>
                        <Label>กลุ่ม / Service Group <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_group_id"
                          onChange={this._onChangeServiceGroup.bind(this)}
                          value={this.state.selectgroup_value}
                          disabled={this.state.disabledgroup}
                          >
                          {servicegroup_select}
                        </Select>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>ประเภทงาน / Service Type <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_type_id"
                          onChange={this._onChangeServiceType.bind(this)}
                          value={this.state.selecttype_value}
                          disabled={this.state.disabled}
                        >
                          {servicetype_select}
                        </Select>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>บริการ / Service <font color="#F00"><b>*</b></font> </Label>
                        <Select placeholder="กรุณาเลือกประเภท"
                          id="service_id"
                          onChange={this._onChangeService.bind(this)}
                          value={this.state.selectservice_value}
                          disabled={this.state.disabledservice}
                        >
                          {service_select}
                        </Select>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Button size="sm" color="primary" onClick={this._inserTable}>Add</Button>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <Table columns={columns}
                    dataSource={this.state.new_arr}
                    pagination={{ pageSize: 5 }}
                  />
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

export default TaskInsert;


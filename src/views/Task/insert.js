import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  CardFooter,
  Input, FormFeedback
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import ServiceGroupModel from '../../models/ServiceGroupModel';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceModel from '../../models/ServiceModel';
import ServiceProcessModel from '../../models/ServiceProcessModel';
import TaskModel from '../../models/TaskModel';
import TaskLogModel from '../../models/TaskLogModel';
import TaskServiceModel from '../../models/TaskServiceModel';
import { Radio, Select, Table } from 'antd';


var QRCode = require('qrcode.react');
var servicegroup_model = new ServiceGroupModel();
var servicetype_model = new ServiceTypeModel();
var service_model = new ServiceModel();
var task_model = new TaskModel();
var task_log_model = new TaskLogModel();
var task_service_model = new TaskServiceModel();
var service_process_model = new ServiceProcessModel();

const { Option } = Select;
const user_login = JSON.parse(localStorage.getItem('user_login'));

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
      service_arr: [],
      disabledgroup: false,
      service: [],
      new_arr: [],
      selectgroup_name:[],
      selectgroup_value:[],
      selecttype_name:[],
      selecttype_value:[],
      selectservice_name:[],
      selectservice_value : [],
      radio_value : 'เอกสารครบแล้ว',
      service_id_arr:[],
      my_queue:'',
      disableQR: true,
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
      radio_value: e.target.value,
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var queue = document.getElementById("queue").value;
    var customer_name = document.getElementById("customer_name").value;
    var customer_lastname = document.getElementById("customer_lastname").value;
    var service = this.state.selectservice_name.props.value;
    var select_type_id = this.state.selecttype_name.props.value;
    await this.setState({
      my_queue : queue
    })

  console.log("remark",this.state.my_queue);
    if (customer_name === '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });
    } else if (customer_lastname === ''){
      swal({
        title: "Warning!",
        text: "Please Enter Your Last Name ",
        icon: "warning",
        button: "Close",
      });
    }else if (queue === ''){
      swal({
        title: "Warning!",
        text: "Please Enter Your Queue ",
        icon: "warning",
        button: "Close",
      });
    } else
    {
      arr['task_code'] = queue;
      arr['task_customer_name'] = customer_name;
      arr['task_customer_lastname'] = customer_lastname;
      arr['task_remark'] = this.state.radio_value;
      arr['employee_id'] = user_login.employee_id;
      

      var insert_task = this.state.service_id_arr
      console.log("insert_task",insert_task);
      console.log(arr);
      

      const task = await task_model.insertTask(arr);
      if (task.query_result === true) {
        var arr_task = {};
        arr_task['task_id'] = task.task_id
        arr_task['service'] = this.state.service_id_arr
        console.log("arr_task ",arr_task)
        for(let i=0;i<arr_task.service.length;i++){
          await task_service_model.insertTaskService(arr_task.task_id,arr_task.service[i].service_id)
          for(let j=0;j<arr_task.service[i].process_id.length;j++){
            await task_log_model.insertTaskLog(arr_task.task_id,arr_task.service[i].service_id,arr_task.service[i].process_id[j].process_id)
          }
        }

        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/task');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
    }
  }

 async _inserTable(e) {
    e.preventDefault()
    console.log("Hello Button");

    var arr = {};
    var s_arr ={};
    var servicegroup = this.state.selectgroup_name.props.name;
    var selecttype = this.state.selecttype_name.props.name;
    var service = this.state.selectservice_name.props.name;
    var service_id = this.state.selectservice_name.props.value;
    var select_type_id = this.state.selecttype_name.props.value;
    console.log("servicegroup", servicegroup);
    console.log("selecttype", selecttype);
    console.log("service", service);
    var service_process = await service_process_model.getProcessByServiceTypeCode(select_type_id);
    console.log("service_process",service_process.data)
    console.log("service_process",service_process)

    arr['servicegroup'] = servicegroup;
    arr['selecttype'] = selecttype;
    arr['service'] = service;
    s_arr['service_id'] = service_id;
    s_arr['process_id'] = service_process.data;
    

    var service_arr = this.state.service_arr
    var service_id_arr = this.state.service_id_arr
    // new_arr =[...new_arr,arr]

    service_arr.push(arr) 
    service_id_arr.push(s_arr)

    console.log("service_id_arr",service_id_arr)
    var queue = document.getElementById("queue").value;
    this.setState({
      service_arr: service_arr,
      disabled: true,
      disabledgroup: true,
      my_queue : queue

    })

  }
  _onAdminUserChange(event) {
    const task_text = event.target.value;
    if (task_text === '') {
      this.setState({
        task_validate: "",
        taske_validate_text: "",
      })
    } else {
      task_model.checkTaskCode({ 'task_code': task_text }).then((responseJson) => {
        if (responseJson.data.length === 0) {
          this.setState({
            task_validate: "VALID",
            task_name: task_text
          })
        } else {
          this.setState({
            task_validate : "INVALID-DUPLICATE",
            task_validate_text: "มีคิวนี้แล้ว",
          })
        }
        this.render();
      });

    }
  }
  
  
  render() {
    const downloadQR = () => {
      const canvas = document.getElementById("qrcode");
      const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "my-qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
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
                        <Input type="text" id="customer_name" name="customer_name" className="form-control" />
                        <p className="help-block">Example : พิชญาภรณ์</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>นามสกุล / Lastname <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="customer_lastname" name="customer_lastname" className="form-control" />
                        <p className="help-block">Example : กระสินธุ์หอม</p>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label>คิว / Queue <font color="#F00"><b>*</b></font></Label>
                        <Input type="text" id="queue" name="queue" className="form-control"
                          valid={this.state.task_validate === "VALID"}
                          invalid={this.state.task_validate === "INVALID-FORMAT" || this.state.task_validate === "INVALID-DUPLICATE"}
                          onChange={(e) => { this._onAdminUserChange(e) }}
                        />
                      
                        <FormFeedback valid >You can use this username.</FormFeedback>
                        <FormFeedback invalid >{this.state.task_validate_text}</FormFeedback>
                        <p className="help-block">Example : 10111</p>
                      </FormGroup>
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="10">
                      <Radio.Group onChange={this.onChange} value={this.state.radio_value} id="remark" name="remark" >
                        <Radio value={'เอกสารครบแล้ว'} >เอกสารครบแล้ว</Radio>
                        <Radio value={'เอกสารยังไม่ครบ'}>เอกสารยังไม่ครบ</Radio>
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
                    dataSource={this.state.service_arr}
                    pagination={{ pageSize: 5 }}
                    />
                      <FormGroup>
                    {this.state.my_queue ?                 
                        <QRCode
                        id="qrcode"
                        value={this.state.my_queue}
                        size={100}
                        level={"H"}
                        includeMargin={true}
                      /> 
                      // <a onClick={downloadQR}> Download QR </a>
                      : 
                      ''}
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

export default TaskInsert;


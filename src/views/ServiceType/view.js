import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import { Table } from 'antd';

var servicetype_model = new ServiceTypeModel;


class ServiceTypeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servicetype_list: []
    };
  }

  async componentDidMount() {
    const servicetype_list = await servicetype_model.getServiceTypeBy();
    console.log("servicetype_list ===",servicetype_list);
    
    this.setState({
        servicetype_list : servicetype_list.data,
        service_type_id : servicetype_list.data.map((item,index) => item.service_type_id)
    })
    console.log("service_type_id",this.state.service_type_id)
  }


  async onDelete(service_type_id) {
    console.log("code",service_type_id);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          servicetype_model.deleteServiceTypeByCode(service_type_id).then((res) => {
            if (res.query_result == true) {
              swal("Delete success!", {
                icon: "success",
              });
              this.componentDidMount()
            } else {
              swal({
                title: "Error!",
                text: " Error Delete ",
                icon: "error",
                button: "Close",
              });
            }
          })
        }
      });
  }

  render() {
    const columns = [
  
      {
        title: 'รหัส',
        dataIndex:  'service_type_id',
        key: 'service_type_id',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
          title: 'ชื่อประเภทงาน',
          dataIndex:  'service_group_name',
          key: 'service_group_name',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },{
        title: 'ชื่อหัวเรื่อง',
        dataIndex:  'service_type_name',
        key: 'service_type_name',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },       
      {
          title: '',
          dataIndex: 'service_type_id',
          key: 'service_type_id',
          align: 'center',
          width: '20%',
          render: (text, record) =>
          <span>        
               
                 <NavLink exact to={`/servicetype/update/` + text} style={{ color: '#337ab7' }}>
                    <i className="fa fa-pencil-square-o" ></i>
                </NavLink>
                <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                    onClick={() => this.onDelete(text)}   >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <NavLink exact to={`/servicetype/detail/` + text} style={{ color: '#337ab7' }}>
                    <i className="fa fa-eye" ></i>
                </NavLink>
              </span>
      },
  ];


    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>จัดการหัวเรื่อง / Service Type Management</p>
                <br/>
                <NavLink exact to={`/servicetype/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.servicetype_list}
              pagination={{ pageSize: 5 }}  
              />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default ServiceTypeView;


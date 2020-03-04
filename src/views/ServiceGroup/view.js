import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import ServiceGroupModel from '../../models/ServiceGroupModel';
import { Table } from 'antd';

var servicegroup_model = new ServiceGroupModel();


class ServiceGroupView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servicegroup_list: []
    };
  }

  async componentDidMount() {
    const servicegroup_list = await servicegroup_model.getServiceGroupBy();
    // console.log("customer_list ===",servicegroup_list);
    
    this.setState({
        servicegroup_list : servicegroup_list.data,
        servicegroup_id : servicegroup_list.data.map((item,index) => item.service_group_id)
    })
    // console.log("employee_id",this.state.servicegroup_id)
  }


  async onDelete(service_group_id) {
    console.log("code",service_group_id);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          servicegroup_model.deleteServiceGroupByCode(service_group_id).then((res) => {
            if (res.query_result === true) {
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
        dataIndex:  'service_group_id',
        key: 'service_group_id',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
          title: 'ชื่อ',
          dataIndex:  'service_group_name',
          key: 'service_group_name',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },
      {
          title: '',
          dataIndex: 'service_group_id',
          key: 'service_group_id2',
          align: 'center',
          width: '20%',
          render: (text, record) =>
          <span>        
                 <NavLink exact to={`/servicegroup/update/` + text} style={{ color: '#337ab7' }}>
                    <i className="fa fa-pencil-square-o" ></i>
                </NavLink>
                <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                    onClick={() => this.onDelete(text)}   
                    >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
              </span>
      },
  ];


    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>จัดการประเภทงาน / Service Group Management</p>
                <br/>
                <NavLink exact to={`/servicegroup/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.servicegroup_list}
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


export default ServiceGroupView;


import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import ServiceModel from '../../models/ServiceModel';
import { Table } from 'antd';

var service_model = new ServiceModel();


class ServiceView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      service_list: []
    };
  }

  async componentDidMount() {
    const service_list = await service_model.getServiceBy();
    console.log("service_list ===",service_list);
    
    this.setState({
        service_list : service_list.data,
        service_id : service_list.data.map((item,index) => item.service_id)
    })
    console.log("service_id",this.state.service_id)
  }

 
  async onDelete(service_id) {
    console.log("code",service_id);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          service_model.deleteServiceByCode(service_id).then((res) => {
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
        dataIndex:  'service_id',
        key: 'service_id',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
          title: 'ชื่อ',
          dataIndex:  'service_name',
          key: 'service_name',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },    
      {
        title: 'หัวเรื่อง',
        dataIndex: 'service_type_name',
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
          dataIndex: 'service_id',
          key: 'service_id2',
          align: 'center',
          width: '20%',
          render: (text, record) =>
          <span>        
                 <NavLink exact to={`/service/update/` + text} style={{ color: '#337ab7' }}>
                    <i className="fa fa-pencil-square-o" ></i>
                </NavLink>
                <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                    onClick={() => this.onDelete(text)}   >
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
                <p>จัดการบริการ / Service Management</p>
                <br/>
                <NavLink exact to={`/service/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.service_list}
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


export default ServiceView;


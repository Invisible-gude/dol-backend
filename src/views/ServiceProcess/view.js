import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import { Table} from 'antd';

var servicetype_model = new ServiceTypeModel();


class ServiceProcessView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceprocess_list: [],
      servicetype_list: [],
      visible: false,
    };
  }

  async componentDidMount() {
    const servicetype_list = await servicetype_model.getServiceTypeBy();
    
    this.setState({
        servicetype_list : servicetype_list.data,
        service_type_id : servicetype_list.data.map((item,index) => item.service_type_id)
    })
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
          key: 'service_type_id2',
          align: 'center',
          width: '20%',
          render: (text, record) =>
          <span>      
                <Button type="button" size="sm" color="link" style={{ color: '#337ab7' }}
                    onClick={this.showModal(text)}   >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                </Button>
                <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                    onClick={() => this.onDelete(text)}   >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                 <NavLink exact to={`/servicetype/update/` + text} style={{ color: '#337ab7' }}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
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
                <p>จัดการกระบวนการทำงาน / Service Process Management</p>
                <br/>
                <NavLink exact to={`/servicetype/insert/`} style={{ width: '100%' }}>
                <Button icon="plus" type="primary">Add</Button>
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


export default ServiceProcessView;


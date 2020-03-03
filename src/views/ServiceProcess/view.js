import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import ServiceProcessModel from '../../models/ServiceProcessModel';
import { Table, Modal} from 'antd';

var serviceprocess_model = new ServiceProcessModel;


class ServiceProcessView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceprocess_list: [],
      visible: false,
    };
  }

  async componentDidMount() {
    const serviceprocess_list = await serviceprocess_model.getServiceProcessBy();
    console.log("serviceprocess_list ===",serviceprocess_list);
    
    this.setState({
      serviceprocess_list : serviceprocess_list.data,
        service_process_id : serviceprocess_list.data.map((item,index) => item.service_process_id)
    })
  }

      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

  render() {
    const columns = [
      // {
      //     title: '#',
      //     dataIndex: 'key',
      //     key: 'key',
      //     width: '10%',
      //     render: (text, record, index) => (
      //         <span key={index}>
      //             {index + 1}
      //         </span>
      //     )
      // },
      {
        title: 'รหัส',
        dataIndex:  'service_process_id',
        key: 'service_process_id',
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
                {/* <Button type="button" size="sm" color="link" style={{ color: '#337ab7' }}
                    onClick={this.showModal}   >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                </Button> */}
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
              dataSource={this.state.serviceprocess_list}
              pagination={{ pageSize: 5 }}  
              />
              <Button type="primary" onClick={this.showModal}>
                Open Modal
              </Button>
              <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default ServiceProcessView;


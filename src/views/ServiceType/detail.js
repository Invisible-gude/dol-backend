import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceProcessModel from '../../models/ServiceProcessModel';
import { Table, Tabs} from 'antd';

var servicetype_model = new ServiceTypeModel;
var serviceProcess_model = new ServiceProcessModel;

function callback(key) {
  console.log(key);
}

const { TabPane } = Tabs;
class ServiceTypeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servicetype_list: [],
      service: [],
    };
  }

  async componentDidMount() {
    const service_type_id = this.props.match.params.service_type_id;
    const service_type_bycode = await serviceProcess_model.getServiceProcessByCode({ service_type_id: service_type_id });
    const service_bycode = await servicetype_model.getServiceByServiceTypeCode({ service_type_id: service_type_id });
    console.log("service_type_id",service_type_bycode)
    this.setState({
      servicetype_list : service_type_bycode.data,
      service : service_bycode.data
    })
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
        dataIndex:  'process_id',
        key: 'process_id',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
          title: 'ชื่อกระบวนการ',
          dataIndex:  'process_name',
          key: 'process_name',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },
     
  ];
  const columns2 = [
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
        title: 'ชื่อกระบวนการ',
        dataIndex:  'service_name',
        key: 'service_name',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
   
];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                {/* <p>{this.state.servicetype_list.map(item => item.service_type_name)}</p> */}
                <br/>
              
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="กระบวนการ" key="1">
                <CardBody>
                  <Table columns={columns} 
                  dataSource={this.state.servicetype_list}
                  pagination={{ pageSize: 10 }}  
                  />
                  </CardBody>
                </TabPane>
                <TabPane tab="บริการ" key="2">
                <CardBody>
                  <Table columns={columns2} 
                  dataSource={this.state.service}
                  pagination={{ pageSize: 10 }}  
                  />
                  </CardBody>
                </TabPane>
              </Tabs>,
              </CardHeader>
              
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default ServiceTypeDetail;


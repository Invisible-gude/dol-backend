import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import UserModel from '../../models/UserModel';
import { Table, Button, Tag } from 'antd';

var user_model = new UserModel;


class CustomerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_list: []
    };
  }

  async componentDidMount() {
    const employee_list = await user_model.getEmployeeBy();
    console.log("customer_list ===",employee_list);
    
    this.setState({
        employee_list: employee_list.data
    })
  }

  async onDelete(code) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
            user_model.deleteCustomerBycode(code).then((res) => {
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
          title: '#',
          dataIndex: 'key',
          key: 'key',
          width: '10%',
          render: (text, record, index) => (
              <span key={index}>
                  {index + 1}
              </span>
          )
      },
      {
          title: 'ชื่อ - สกุล',
          dataIndex: 'employee_name',
          key: 'employee_name',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },  
      {
        title: 'แผนก',
        dataIndex: 'department_name',
        key: 'department_name',
        width: '25%',
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },      
      {
          title: 'แก้ไข',
          key: 'edit',
          align: 'center',
          width: '20%',
          render: (text, record) =>
              <span>
                <Button>
                asdasdasd
                </Button>
              </span>
      },
  ];

    const { customer_list } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>จัดการพนักงาน / Employee Management</p>
                <br/>
                <NavLink exact to={`/employee/insert/`} style={{ width: '100%' }}>
                <Button icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.employee_list}
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


export default CustomerView;


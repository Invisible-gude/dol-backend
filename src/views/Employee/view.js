import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import UserModel from '../../models/UserModel';
import { Table } from 'antd';

var user_model = new UserModel;


class CustomerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employee_list: []
    };
  }

  async componentDidMount() {
    const employee_list = await user_model.getEmployeeBy();
    console.log("customer_list ===",employee_list);
    
    this.setState({
        employee_list : employee_list.data,
        employee_id : employee_list.data.map((item,index) => item.employee_id)
    })
    console.log("employee_id",this.state.employee_id)
  }

  async onDelete(code) {
    console.log("code",code);
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
  async onDelete(employee_id) {
    console.log("code",employee_id);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          user_model.deleteEmployeeByEmployeeCode(employee_id).then((res) => {
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
          title: 'ชื่อ',
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
        title: 'นามสกุล',
        dataIndex: 'employee_lastname',
        key: 'employee_lastname',
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
          title: '',
          dataIndex: 'employee_id',
          key: 'employee_id',
          align: 'center',
          width: '20%',
          render: (text, record) =>
          <span>        
                 <NavLink exact to={`/employee/update/` + text} style={{ color: '#337ab7' }}>
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


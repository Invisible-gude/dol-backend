import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import DepartmentModel from '../../models/DepartmentModel';
import { Table, Button, Tag } from 'antd';
import { EditOutlined} from '@ant-design/icons';

var department_model = new DepartmentModel;


class DepartmentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      department_list: []
    };
  }

  async componentDidMount() {
    const department_list = await department_model.getDepartmentBy();
    console.log("department_list ===",department_list);
    
    this.setState({
        department_list: department_list.data
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
            department_model.deleteDepartmentByDepartmentCode(code).then((res) => {
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
          title: 'รหัสแผนก',
          dataIndex: 'department_id',
          key: 'department_id',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },  
      {
        title: 'ชื่อแผนก',
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
                {/* <Button type="primary" icon={<EditOutlined  />} size={size} /> */}
                <Button>แก้ไข</Button>
              </span>
      },
  ];

    const { department_list } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>จัดการแผนก / Department Management</p>
                <br/>
                <NavLink exact to={`/department/insert/`} style={{ width: '100%' }}>
                <Button icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.department_list} 
              />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default DepartmentView;


import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import GOBALS from '../../GOBALS';
import swal from 'sweetalert';
import ProcessModel from '../../models/ProcessModel';
import { Table } from 'antd';


var process_model = new ProcessModel;


class ProcessView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      process_list: []
    };
  }

  async componentDidMount() {
    const process_list = await process_model.getProcessBy();
    console.log("process_list ===",process_list);
    
    this.setState({
        process_list: process_list.data
    })
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
            process_model.deleteProcessByProcessCode(code).then((res) => {
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
      //     render: (text, record, index,current) => (
      //         <span key={index}>
      //             {index + 1 }
      //         </span>
      //     )
      // },
      {
          title: 'รหัสขั้นตอน',
          dataIndex: 'process_id',
          key: 'process_id',
          width: '25%',
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },  
      {
        title: 'ชื่อขั้นตอน',
        dataIndex: 'process_name',
        key: 'process_name',
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
      dataIndex: 'process_id',
      key: 'process_id2',
      align: 'center',
      width: '20%',
      render: (text, record) =>
      <span>        
        <NavLink exact to={`/process/update/` + text} style={{ color: '#337ab7' }}>
          <i className="fa fa-pencil-square-o" ></i>
        </NavLink>
        <Button type="button" size="sm" color="link" style={{ color: 'red' }}
          onClick={() => this.onDelete(text)}  >
          <i className="fa fa-times" aria-hidden="true"></i>
        </Button>
          </span>
      },
    ];

    const { process_list } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>จัดการขั้นตอน / Process Management</p>
                <br/>
                <NavLink exact to={`/process/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.process_list}
              />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default ProcessView;


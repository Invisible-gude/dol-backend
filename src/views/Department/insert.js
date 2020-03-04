import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
   CardFooter,
  Input
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import DepartmentModel from '../../models/DepartmentModel';

var department_model = new DepartmentModel();

class DepartmentInsert extends Component {

    constructor(props) {
      super(props)
      this.state = {
      };

      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    async componentDidMount() {
       
    }
    async handleSubmit(event) {
      event.preventDefault();
      var arr = {};
      var department_name = document.getElementById("department_name").value;      
      
      if (department_name === '') {
        swal({
          title: "Warning!",
          text: "Please Enter Your Name ",
          icon: "warning",
          button: "Close",
        });
      }else{
        arr['department_name'] = department_name;
        
        const department = await department_model.insertDepartment(arr);
        if (department.result === true) {
          swal("Save success!", {
            icon: "success",
          });
          this.props.history.push('/department');
        } else {
          window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
        }
      }
      }
     
    render() {

      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <Form onSubmit={this.handleSubmit} id="myForm">
                  <CardHeader>
                    เพิ่มแผนก / Add Department
                  </CardHeader>
                  <CardBody>
                  <FormGroup row>
                      <Col lg="6">
                        <FormGroup>
                          <Label>ชื่อแผนก / Department Name <font color="#F00"><b>*</b></font></Label>
                          <Input type="text" id="department_name" name="department_name" className="form-control" />
                          <p className="help-block">Example : นายช่างรังวัดปฏิบัติงาน</p>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Link to="/department"><Button type="buttom" size="sm" > Back </Button></Link>
                    <Button type="submit" size="sm" color="primary">Save</Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      )
    };
  }

  export default DepartmentInsert;


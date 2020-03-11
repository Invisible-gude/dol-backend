import React, { Component } from 'react';
import {
  FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
} from 'reactstrap';
import swal from 'sweetalert';
import ServiceTypeModel from '../../models/ServiceTypeModel';
import ServiceProcessModel from '../../models/ServiceProcessModel';
import ProcessModel from '../../models/ProcessModel';
import { Table, Tabs, Select,Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


var servicetype_model = new ServiceTypeModel();
var serviceProcess_model = new ServiceProcessModel();
var process_model = new ProcessModel();
const { Option } = Select;

function callback(key) {
  console.log(key);
}

const { TabPane } = Tabs;
class ServiceTypeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      process:[],
      process1:[],
      servicetype_list: [],
      service: [],
      service_type_id:[],
      servicetype_id:'',
      select_value: "",
      searchText: '',
      searchedColumn: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const service_type_id = this.props.match.params.service_type_id;
    console.log("service_type_id",service_type_id);
    
    const process = await process_model.getProcessByServiceTypeCode({ service_type_id: service_type_id });
    console.log("service_type_id",service_type_id);
    const service_type_bycode = await serviceProcess_model.getServiceProcessByCode({ service_type_id: service_type_id });
    const service_bycode = await servicetype_model.getServiceByServiceTypeCode({ service_type_id: service_type_id });

    this.setState({
      process1: process.data,
      servicetype_list : service_type_bycode.data,
      service : service_bycode.data,
      servicetype_id: service_type_id,
        })
        console.log("service_type_id",this.state.servicetype_id);
        
      }

      async handleSubmit(event) {
        event.preventDefault();
            var arr = {};
        var process_id = this.state.select_value;
        var service_type_id = this.state.servicetype_id;
        if (service_type_id === '') {
          swal({
            title: "Warning!",
            text: "Please Enter Name ",
            icon: "warning",
            button: "Close",
          });
    
        } else {
          arr['process_id'] = process_id;
          arr['service_type_id'] = service_type_id;

        const service = await serviceProcess_model.insertServiceProcess(arr.process_id,arr.service_type_id);
        console.log('employee ', arr);
        if (service.query_result === true) {
          swal("Save success!", {
            icon: "success",
          });
          this.componentDidMount()
          this.state.select_value = "";
        } else {
          window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
        }
      }
    }
  _onChange(value) {
        this.setState({ select_value: value });
    }
  
    
  
  async onDelete(service_process_id) {
    console.log("code",service_process_id);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          serviceProcess_model.deleteServiceProcessByCode(service_process_id).then((res) => {
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
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
      text
    ),
});
handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  this.setState({
    searchText: selectedKeys[0],
    searchedColumn: dataIndex,
  });
};

handleReset = clearFilters => {
  clearFilters();
  this.setState({ searchText: '' });
};

  render() {
    const columns = [
      {
        title: 'รหัส',
        dataIndex:  'process_id',
        key: 'process_id',
        width: '25%',
        ...this.getColumnSearchProps('process_id'),
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
          ...this.getColumnSearchProps('process_name'),
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },
      {
        title: 'ลำดับงาน',
        dataIndex:  'process_no',
        key: 'process_no',
        width: '25%',
        ...this.getColumnSearchProps('process_no'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
        title: '',
        dataIndex: 'service_process_id',
        key: 'service_process_id',
        align: 'center',
        width: '20%',
        render: (text, record) =>
        <span>        
             
              <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                  onClick={() => this.onDelete(text)}   >
                  <i className="fa fa-times" aria-hidden="true"></i>
              </Button>
            </span>
    },
  ];
  const columns2 = [
    {
      title: 'รหัส',
      dataIndex:  'service_id',
      key: 'service_id',
      width: '25%',
      ...this.getColumnSearchProps('service_id'),
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
        ...this.getColumnSearchProps('service_name'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
   
];
let process_select = this.state.process1.map((item, index) => (
  <Option key={index} value={item.process_id}>{item.process_name}</Option>
))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                {/* <p>{this.state.servicetype_list.map(item => item.service_type_name)}</p> */}
                <br/>
                <FormGroup row>
                    <Col lg="3.5">
                    </Col>
                    <Col lg="3.5">                   
                    </Col>
                    <Col lg="5">   
                      <FormGroup>
                        <Label>เพิ่มกระบวนการ / Process <font color="#F00"><b>*</b></font> </Label>
                            <Select placeholder="กรุณาเลือกประเภท"
                                style={{width:200,right:0}}
                                id="process_id"
                                onChange={this._onChange.bind(this)}
                                value={this.state.select_value}>
                                {process_select}
                            </Select>
                            <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}>Save</Button>
                      </FormGroup>                
                    </Col>
                  </FormGroup>            
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


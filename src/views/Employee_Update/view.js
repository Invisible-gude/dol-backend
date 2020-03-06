import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button,
  FormGroup, Label } from 'reactstrap';
import TaskModel from '../../models/TaskModel';
import TaskServiceModel from '../../models/TaskServiceModel';
import { Table,Input,Modal,Timeline} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EyeOutlined } from '@ant-design/icons';



var task_model = new TaskModel();
var task_service_model = new TaskServiceModel();
var QRCode = require('qrcode.react');

class EmployeeUpdateView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_login: JSON.parse(localStorage.getItem('user_login')),
      searchText: '',
      searchedColumn: '',
      task_list:[],
      visible: false ,
      delay: 300,
      result: "No result",
      process:[],
      task_select:[],

    };
  }
  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  async componentDidMount() {
    console.log("user_login",this.state.user_login);
    const task_list = await task_model.getTaskByDepartmentCode({department_id : this.state.user_login.department_id});
    console.log("task_list ===",task_list);
    
    this.setState({
      task_list: task_list.data
    })


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

async showModal(task_id,service_id){
  console.log("task_code",task_id);
  console.log("service_id",service_id);
  
  const task = await task_model.getTaskByTaskCode(task_id,service_id);
  console.log("task",task);
  this.setState({
    task_select:task.data,
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
    const downloadQR = () => {
      const canvas = document.getElementById("123456");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "123456.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    const columns_soon = [
     
      {
        title: 'คิว',
        dataIndex: 'task_id',
        key: 'task_id',
        width: '15%',
        ...this.getColumnSearchProps('task_id'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },  
      {
          title: 'งาน',
          dataIndex: 'service_name',
          key: 'service_name',
          width: '25%',
          ...this.getColumnSearchProps('service_name'),
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },  
      {
        title: '',
        dataIndex: 'task_id',
        key: 'task_id2',
        align: 'center',
        width: '10%',
        render: (text, record) =>
        <span>   
          <EyeOutlined 
          onClick={() => this.showModal(record.task_id,record.service_id)}/>     
        </span>
      },
  ];
  const columns_finished = [
     
    {
      title: 'คิว',
      dataIndex: 'task_code',
      key: 'task_code',
      width: '25%',
      ...this.getColumnSearchProps('task_id'),
      render: (text, record, index) =>(
        <span key={index}>
       {text}
    </span>
      )
  },  
    {
        title: 'งาน',
        dataIndex: 'task_name',
        key: 'task_name',
        width: '25%',
        ...this.getColumnSearchProps('task_id'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },   
];

let process_select = this.state.task_select.map((item, index) => ( 
 item.task_log_status === 1 ? <Timeline.Item  key={index} color="green">{item.process_name}</Timeline.Item> : <Timeline.Item  key={index} color="gray">{item.process_name}</Timeline.Item>
))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p>แผนก: {this.state.user_login.department_name}</p>
                <br/>
                <FormGroup row>
                    <Col lg="6">
                      <Card>
                      <FormGroup>
                        <Label>งานที่กำลังจะมาถึง<font color="#F00"></font></Label>
                        <CardBody>
                          <Table columns={columns_soon} 
                          dataSource={this.state.task_list} 
                          />
                        </CardBody>
                      </FormGroup>
                      </Card>
                    </Col>
                    <Col lg="6">
                    <Card>
                      <FormGroup>
                        <Label>งานที่เสร็จแล้ว<font color="#F00"></font> </Label>
                        <CardBody>
                          <Table 
                          columns={columns_finished} 
                          dataSource={this.state.task_list} 
                          />
                        </CardBody>
                      </FormGroup>
                      </Card>
                    </Col>
                  </FormGroup>  
                  <Modal
                    title="รายละเอียด"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >                    
                          <Timeline>
                          {process_select}
                          </Timeline>
                  {/* <QRCode
                      id="123456"
                      value="123456"
                      size={290}
                      level={"H"}
                      includeMargin={true}
                    />
                    <a onClick={downloadQR}> Download QR </a> */}
                  </Modal>  
              </CardHeader>
            
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default EmployeeUpdateView;


import React, { Component } from 'react';
import {
  FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
} from 'reactstrap';
import swal from 'sweetalert';

import TaskModel from '../../models/TaskModel';
import { Table, Select,Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

var task_model = new TaskModel();
const { Option } = Select;
function callback(key) {
  console.log(key);
}

class TaskDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task:[],
      searchText: '',
      searchedColumn: '',
    };
  }

  async componentDidMount() {
    const task_id = this.props.match.params.task_id;
    console.log("task_id",task_id);
    
    const task = await task_model.getTaskByTaskCode({ task_id: task_id });
    console.log("service_type_id",task_id);

    this.setState({
      task: task.data,
        })
        console.log("task",this.state.task);
        
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
        dataIndex:  'task_id',
        key: 'task_id',
        width: '25%',
        ...this.getColumnSearchProps('task_id'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },
      {
          title: 'ชื่อลูกค้า',
          dataIndex:  'task_customer_name',
          key: 'task_customer_name',
          width: '25%',
          ...this.getColumnSearchProps('process_name'),
          render: (text, record, index) =>(
            <span key={index}>
           {text}
        </span>
          )
      },
      {
        title: 'สถานะ',
        dataIndex:  'task_customer_name',
        key: 'task_customer_name',
        width: '25%',
        ...this.getColumnSearchProps('process_name'),
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
let task_select = this.state.task.map((item, index) => (
  <Option key={index} value={item.task_id}>{item.task_name}</Option>
))

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                {/* <p>{this.state.servicetype_list.map(item => item.service_type_name)}</p> */}
                <br/>   
                  <CardBody>
                    <Table columns={columns} 
                      dataSource={this.state.task}
                    />
                  </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default TaskDetail;


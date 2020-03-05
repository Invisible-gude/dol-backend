import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import TaskModel from '../../models/TaskModel';
import { Table,Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';



var task_model = new TaskModel();


class TaskView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task_list: [],
      searchText: '',
      searchedColumn: '',
    };
  }

  async componentDidMount() {
    const task_list = await task_model.getTaskBy();
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
  render() {
    const columns = [
     
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
          title: 'รหัสงาน',
          dataIndex: 'task_id',
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
        dataIndex: 'task_customer_name',
        key: 'task_customer_name',
        width: '25%',
        ...this.getColumnSearchProps('task_customer_name'),
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
        <NavLink exact to={`/task/update/` + text} style={{ color: '#337ab7' }}>
          <i className="fa fa-pencil-square-o" ></i>
        </NavLink>
        <NavLink exact to={`/task/detail/` + text} style={{ color: '#337ab7' }}>
          <i className="fa fa-eye" ></i>
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
                <p>งานทั้งหมด / Task</p>
                <br/>
                <NavLink exact to={`/task/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
                </NavLink>

              </CardHeader>
              <CardBody>
              <Table columns={columns} 
              dataSource={this.state.task_list} 
              />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default TaskView;


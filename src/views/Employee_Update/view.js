import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button,
  FormGroup, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import TaskModel from '../../models/TaskModel';
import { Table,Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';



var task_model = new TaskModel();


class EmployeeUpdateView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_login: JSON.parse(localStorage.getItem('user_login')),
      searchText: '',
      searchedColumn: '',
    };
  }

  async componentDidMount() {
    console.log("user_login",this.state.user_login);
    
    
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
    const columns_soon = [
     
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
                      <FormGroup>
                        <Label>งานที่กำลังจะมาถึง<font color="#F00"></font></Label>
                        <CardBody>
                          <Table columns={columns_soon} 
                          dataSource={this.state.task_list} 
                          />
                        </CardBody>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label>งานที่เสร็จแล้ว<font color="#F00"></font> </Label>
                        <CardBody>
                          <Table columns={columns_finished} 
                          dataSource={this.state.task_list} 
                          />
                        </CardBody>
                      </FormGroup>
                    </Col>
                  </FormGroup>    
              </CardHeader>
            
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default EmployeeUpdateView;


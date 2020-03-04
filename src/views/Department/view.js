import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import DepartmentModel from '../../models/DepartmentModel';
import { Table,Input} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';



var department_model = new DepartmentModel();


class DepartmentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      department_list: [],
      searchText: '',
      searchedColumn: '',
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
    console.log(code);
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
          title: 'รหัสแผนก',
          dataIndex: 'department_id',
          key: 'department_id',
          width: '25%',
          ...this.getColumnSearchProps('department_id'),
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
        ...this.getColumnSearchProps('department_name'),
        render: (text, record, index) =>(
          <span key={index}>
         {text}
      </span>
        )
    },      
    {
      title: '',
      dataIndex: 'department_id',
      key: 'department_id2',
      align: 'center',
      width: '20%',
      render: (text, record) =>
      <span>        
        <NavLink exact to={`/department/update/` + text} style={{ color: '#337ab7' }}>
          <i className="fa fa-pencil-square-o" ></i>
        </NavLink>
        <Button type="button" size="sm" color="link" style={{ color: 'red' }}
          onClick={() => this.onDelete(text)}  >
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
                <p>จัดการแผนก / Department Management</p>
                <br/>
                <NavLink exact to={`/department/insert/`} style={{ width: '100%' }}>
                <Button color="success" icon="plus" type="primary">Add</Button>
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


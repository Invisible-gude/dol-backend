import React, { Component, Suspense } from 'react';
import {Redirect, Route, Switch,Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'antd/dist/antd.css';
import logo from '../assets/img/revel-soft-logo.png'
import { Layout, Menu, Icon,Footer } from 'antd';
import routes from '../routes';




const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class DefaultLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      user_login: JSON.parse(localStorage.getItem('user_login'))
    }
  }
  async componentDidMount() {
  }

  onLogout(e) {
    e.preventDefault()
    localStorage.removeItem('user_login');
    window.location.reload()
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render() {
    const { user_login } = this.state
    return (
      <div className="app">
        <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0" style={{height:100}}>
                <img src={logo} alt="Ravel Soft Logo" style={{width:100}}/>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to='/department'>
                  <Icon type="pie-chart" />
                  <span>Department</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/employee'>
                <Icon type="user" />
                <span>Employee</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/process'>
                <Icon type="pie-chart" />
                <span>Process</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub3"
              
              title={
                <span>
                 <Icon type="pie-chart" /> Service                  
                </span>
              }
            >
              <Menu.Item key="9">
                <Link to='/servicegroup'>
                  <Icon type="pie-chart" />
                  <span>Service Group</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to='/servicetype'>
                  <Icon type="pie-chart" />
                  <span>Service Type</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to='/service'>
                  <Icon type="pie-chart" />
                  <span>Service</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item key="12">
              <Link to='/process'>
              <Icon type="pie-chart" />
                <span>Process</span>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="13">
              <Icon type="file" />
              <span onClick={e => this.onLogout(e)}>Logout</span>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ float: 'right', color:'#fff' }} > ผู้ใช้งาน : {user_login != null ? user_login.employee_name + '  ' + user_login.employee_lastname : null}</Header>
          <Container fluid>
                  <Suspense fallback={null}>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component {...props} />
                            )} />
                        ) : (null);
                      })}
                      <Redirect from="/" to="/" />
                    </Switch>
                  </Suspense>
                </Container>           
        </Layout>
      </Layout>
      </div>
    );
  }
}



export default DefaultLayout;


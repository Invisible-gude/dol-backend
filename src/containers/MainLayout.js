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
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0">
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
                <Icon type="pie-chart" />
                <span>Employee</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub3"
              title={
                <span>
                Service                  
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
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="12">
              <Icon type="file" />
              <span onClick={e => this.onLogout(e)}>Logout</span>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >{user_login != null ? user_login.employee_name + '  ' + user_login.employee_lastname : null}</Header>
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


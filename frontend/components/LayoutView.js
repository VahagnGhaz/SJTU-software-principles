import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, CalendarOutlined, PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';
import '../css/style.css'

const { Header, Sider, Content } = Layout;

function LayoutView({ children }) {
  const Navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={logout} key="2" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath);

    switch (currentPath) {
      case "/":
        setSelectedKey("1");
        break;
      case "/events":
        setSelectedKey("1");
        break;
      case "/create-event":
        setSelectedKey("2");
        break;
      case "/profile":
        setSelectedKey("3");
        break;
      default:
        setSelectedKey("");
    }
  }, [location]);

  function logout() {
    if(localStorage.getItem('userId') !== null)
      localStorage.removeItem('userId');
    if(localStorage.getItem('userName') !== null)
      localStorage.removeItem('userName');
    if(localStorage.getItem('userEmail') !== null)
      localStorage.removeItem('userEmail');
    console.log(localStorage.getItem('userId'));
    Navigate('/login');
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="layout-view">
      <Sider className="sider">
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" className="menu">
          <Menu.Item key="1" icon={<CalendarOutlined />}>
            <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusSquareOutlined />}>
            <Link to="/create-event">Create Event</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          </Menu>
      </Sider>
      <Layout className="inner-layout">
        <Header style={{ padding: 0 }} className="header">
          <div className="header-left">
            <img src={logo} alt="logo" className="logo-img" />
            XingQiao
          </div>
          <div className="header-right">
            <Dropdown overlay={menu}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }} className="content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutView;

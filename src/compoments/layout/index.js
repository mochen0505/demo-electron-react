import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import './index.less'
const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {

    const menu = (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
        >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <NavLink to='/home'>
                    <span>Home</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <NavLink to='/settings'>
                    <span>Settings</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout className="app-layout">
            <Header>Header</Header>
            <Layout className="app-layout-inner">
                <Sider>
                    { menu }
                </Sider>
                <Content>
                    { children }
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout
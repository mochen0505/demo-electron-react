import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Switch } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import './index.less'
const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {

    const [theme, setTheme] = useState(null)

    useEffect(() => {
        const removeEventListener = window.api.receive('fromMain', (data) => {
            setTheme(data.theme)
        })

        return () => {
            removeEventListener();
        };
    }, [])

    const handleChangeTheme = (value) => {
        const selectedTheme = value ? 'dark' : 'light'
        setTheme(selectedTheme);
        window.api.send('toMain', selectedTheme)
    }

    const menu = (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme={theme}
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
            <Header>
                <Switch
                    checked={theme === 'dark'}
                    onChange={handleChangeTheme}
                />
            </Header>
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
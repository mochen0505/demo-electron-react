import React, { useState } from 'react'
import { Button, Menu, Dropdown } from 'antd'
import AddRecordModal from './components/add-record-modal'
import { PlusOutlined } from '@ant-design/icons'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../db'
import './index.less'

const Home = () => {
    const [showAddRecordModal, setShowAddRecordModal] = useState(false)
    const records = useLiveQuery(() => db.Records.toArray())

    console.log(records)

    const handleShowAddRecordModal = () => {
        setShowAddRecordModal(true)
    };

    const handleCloseAddRecordModal = () => {
        setShowAddRecordModal(false)
    }

    const handleAddRecord = (values) => {
        setShowAddRecordModal(false)
        console.log(values)
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleShowAddRecordModal}>新增记录</Menu.Item>
        </Menu>
    );

    return (
        <div className="home">
            <div className="home-top-bar">
                <Dropdown overlay={menu} shape="circle" trigger={['click']}>
                    <Button type="primary" shape="circle">
                        <PlusOutlined />
                    </Button>
                </Dropdown>
            </div>
            Home
            <AddRecordModal
                showModal={showAddRecordModal}
                handleCloseModal={handleCloseAddRecordModal}
                handleAddRecord={handleAddRecord}
            />
        </div>
    )
}

export default Home
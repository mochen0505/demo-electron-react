import React from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: '站点',
        dataIndex: 'site',
    },
    {
        title: '账号',
        dataIndex: 'account',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },
];

const RecordTable = ({ data }) => {

    return (
        <Table
            rowKey={(column) => column.id}
            columns={columns}
            dataSource={data}
        />
    )
}

export default RecordTable
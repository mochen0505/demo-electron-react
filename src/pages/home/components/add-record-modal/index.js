import React from 'react'
import {
    Modal, Form, Input
} from 'antd'

const AddRecordModal = ({ showModal, handleCloseModal, handleAddRecord }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                handleAddRecord(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    const handleCancel = () => {
        handleCloseModal()
    }

    return (
        <Modal
            title='新增记录'
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form}>
                <Form.Item
                    label="站点"
                    name="site"
                    rules={[{ required: true, message: '必填' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="账号"
                    name="account"
                    rules={[{ required: true, message: '必填' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '必填' }]}
                >
                    <Input.Password />
                </Form.Item>

            </Form>

        </Modal>
    )

}

export default AddRecordModal
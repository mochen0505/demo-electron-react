import React, {useState} from 'react'
import {
    Modal, Form, InputNumber, Button, Space, Select
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const parts = [
    { label: '胸', value: 'chest' },
    { label: '背', value: 'back' },
    { label: '腿', value: 'leg' },
];

const moves = {
    chest: [
        { label: '平板', value: 1 },
        { label: '上斜', value: 2 },
    ],
    back: [
        { label: '下拉', value: 1 },
        { label: '划船', value: 2 },
    ],
    leg: [
        { label: '深蹲', value: 1 },
    ],
};

const AddRecordModal = ({ showModal, handleCloseModal, handleAddRecord }) => {

    const [form] = Form.useForm();

    const [moveOption, setMoveOption] = useState([])

    const handleChange = (value) => {
        form.setFieldsValue({ move: null });
        setMoveOption(moves[value])
    };

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
            width={600}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form}>
                <Form.Item name="part" label="部位" rules={[{ required: true, message: '必填' }]}>
                    <Select options={parts} onChange={handleChange} />
                </Form.Item>
                <Form.Item name="move" label="动作" rules={[{ required: true, message: '必填' }]}>
                    <Select options={moveOption} />
                </Form.Item>
                <Form.List name="capacity">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} align="start">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'weight']}
                                        label='容量'
                                        rules={[{ required: true, message: '必填' }]}
                                    >
                                        <InputNumber addonAfter='kg' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'nums']}
                                        rules={[{ required: true, message: '必填' }]}
                                    >
                                        <InputNumber addonAfter='个' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'sets']}
                                        rules={[{ required: true, message: '必填' }]}
                                    >
                                        <InputNumber addonAfter='组' />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    新增
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>

        </Modal>
    )

}

export default AddRecordModal
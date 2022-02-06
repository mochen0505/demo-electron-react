import React from 'react'
import {
    Modal, Form, Input, Button, Space, Select
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const parts = [
    { label: '胸', value: 'chest' },
    { label: '背', value: 'back' },
    { label: '肩', value: 'delt' },
    { label: '手臂', value: 'arm' },
    { label: '腿', value: 'leg' },
];

const category = {
    chest: ['平板', '上斜'],
    back: ['下拉', '划船'],
    delt: ['飞鸟'],
    arm: ['弯举', '屈伸'],
    leg: ['深蹲', '器械'],
};

const AddRecordModal = ({ showModal, handleCloseModal, handleAddRecord }) => {

    const [form] = Form.useForm();

    const handleChange = () => {
        form.setFieldsValue({ sets: [] });
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
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form}>
                <Form.Item name="part" label="训练部位" rules={[{ required: true, message: '必填' }]}>
                    <Select options={parts} onChange={handleChange} />
                </Form.Item>
                <Form.List name="sets">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, curValues) =>
                                            prevValues.part !== curValues.part || prevValues.sets !== curValues.sets
                                        }
                                    >
                                        {() => (
                                            <Form.Item
                                                {...field}
                                                label="动作"
                                                name={[field.name, 'move']}
                                                rules={[{ required: true, message: '必填' }]}
                                            >
                                                <Select disabled={!form.getFieldValue('part')} style={{ width: 130 }}>
                                                    {(category[form.getFieldValue('part')] || []).map(item => (
                                                        <Option key={item} value={item}>
                                                            {item}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="重量"
                                        name={[field.name, 'weight']}
                                        rules={[{ required: true, message: '必填' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
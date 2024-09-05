import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';

const RestaurantForm = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  const fetchRestaurantData = () => {
    setLoading(true);
    axios.get(`/restaurants/${id}`)
      .then(response => {
        form.setFieldsValue(response.data);
      })
      .catch(error => {
        notification.error({ message: 'Error fetching restaurant data', description: error.message });
      })
      .finally(() => setLoading(false));
  };

  const onFinish = (values) => {
    setLoading(true);
    const apiCall = id ? axios.put(`/restaurants/${id}`, values) : axios.post('/restaurants', values);
    apiCall
      .then(() => {
        notification.success({ message: 'Restaurant saved successfully' });
        navigate('/admin/restaurants');
      })
      .catch(error => {
        notification.error({ message: 'Error saving restaurant', description: error.message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ name: '', description: '', location: '', menu: [] }}
    >
      <Form.Item name="name" label="Restaurant Name" rules={[{ required: true, message: 'Please enter the restaurant name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the location' }]}>
        <Input />
      </Form.Item>

      {/* Menu Items Management */}
      <Form.List name="menu">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  fieldKey={[fieldKey, 'name']}
                  rules={[{ required: true, message: 'Missing menu item name' }]}
                >
                  <Input placeholder="Menu Item Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  fieldKey={[fieldKey, 'price']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <InputNumber placeholder="Price" min={0} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Menu Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {id ? 'Update Restaurant' : 'Add Restaurant'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RestaurantForm;

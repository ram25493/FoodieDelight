import React, { useState, useEffect } from 'react';
import { Table, Input, notification, Spin } from 'antd';
import axios from '../axiosInstance';

const { Search } = Input;

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, [searchTerm]);

  const fetchRestaurants = () => {
    setLoading(true);
    axios.get('/restaurants')
      .then(response => {
        const filteredData = response.data.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRestaurants(filteredData);
      })
      .catch(error => {
        notification.error({ message: 'Error fetching restaurants', description: error.message });
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Menu',
      key: 'menu',
      render: (_, record) => (
        <div>
          {record.menu && record.menu.map((item, index) => (
            <div key={index}>{item.name}: ${item.price}</div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search Restaurants"
        enterButton
        onSearch={(value) => setSearchTerm(value)}
        style={{ marginBottom: 16 }}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={restaurants}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: 'No restaurants found' }}
        />
      )}
    </div>
  );
};

export default HomePage;

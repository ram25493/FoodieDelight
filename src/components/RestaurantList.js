import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Input, notification, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);   
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchRestaurants = useCallback(() => {
    setLoading(true);
    axios.get('/restaurants')
      .then(response => {
        const filteredData = response.data.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRestaurants(filteredData);
        setTotal(filteredData.length); 
      })
      .catch(error => {
        notification.error({ message: 'Error fetching restaurants', description: error.message });
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  // Trigger search on typing with debounce to avoid excessive API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRestaurants();
    }, 300); // Adjust the delay to control how responsive it is

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchRestaurants]);

  const deleteRestaurant = (id) => {
    axios.delete(`/restaurants/${id}`)
      .then(() => {
        notification.success({ message: 'Restaurant deleted successfully' });
        fetchRestaurants();
      })
      .catch(error => {
        notification.error({ message: 'Error deleting restaurant', description: error.message });
      });
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button 
            type="primary" 
            onClick={() => navigate(`/admin/restaurants/edit/${record.id}`)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button 
            danger 
            onClick={() => deleteRestaurant(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const paginatedData = restaurants.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Input
        placeholder="Search Restaurants"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total, 
            onChange: page => setCurrentPage(page),
          }}
          locale={{ emptyText: 'No restaurants found' }}
          onChange={handleTableChange}
        />
      )}
    </div>
  );
};

export default RestaurantList;

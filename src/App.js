// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout } from "antd";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";
import HomePage from "./components/HomePage";
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <span style={{ textAlign: "center", color: "white" }}>
          <Link to="/" className="link"> FoodieDelight</Link>
          </span>
          <span style={{ textAlign: "center", color: "white", float: 'right'}} >
            <Link to="/admin/restaurants" className="link"  >Restaurant List(Admin)</Link>
            <Link to="/admin/restaurants/new" className="link">Add Restaurant(Admin)</Link>
          </span>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: "20px" }}>
          <div className="site-layout-content">
          <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/restaurants" element={<RestaurantList />} />
        <Route path="/admin/restaurants/edit/:id" element={<RestaurantForm />} />
        <Route path="/admin/restaurants/new" element={<RestaurantForm />} />
      </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Restaurant Management ©2024
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;

import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";

import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div class="jumbotron bg-dark text-center text-light">
            <h1 class="display-4">Summer Sale</h1>
            <p class="lead">BigBoxKart big summer sale is back</p>

            <p>
              Buy 3 and get 20% free now . Sale End Tomorrow . Hurry up. Buy now
            </p>
          </div>
          <h1>Latest Products</h1>
          <ProductCarousel />
          <div className="my-2">
            <h1>Electronics</h1>
            <Row>
              {products
                .filter((product) => product.category === "Electronics")
                .slice(4, 10)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <p className="text-center">
              {" "}
              <Link to="/products/electronics"> View All</Link>
            </p>
          </div>
          <div className="my-2">
            <h1>Books</h1>
            <Row>
              {products
                .filter((product) => product.category === "Book")
                .slice(0, 6)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <p className="text-center">
              {" "}
              <Link to="/products/books"> View All</Link>
            </p>
          </div>
          <div className="my-2">
            <h1>Foods</h1>
            <Row>
              {products
                .filter((product) => product.category === "Food")
                .slice(2, 8)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <p className="text-center">
              {" "}
              <Link to="/products/foods"> View All</Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;

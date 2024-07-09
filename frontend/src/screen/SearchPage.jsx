import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchPageQuery } from "../slices/productApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

const SearchPage = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useSearchPageQuery(keyword);

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
          <h1>Result for Search : {keyword}</h1>
          {products.length === 0 ? (
            <>
              <Message> No result found </Message>{" "}
              <h6>
                Go back <Link to="/">Home</Link>
              </h6>
            </>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default SearchPage;

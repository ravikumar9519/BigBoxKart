import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate(`/product/search/${keyword}`);
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="text"
          name="search"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button
          variant="outline-success"
          className="p-2 mx-2"
          onClick={submitHandler}
        >
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;

import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import Loading from "../../components/Loading";
import { useCreateProductMutation } from "../../slices/productApiSlice";

import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const ProductListScreen = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [selectProduct, setSelectProduct] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const dataPerPage = 8;
  const pagesVisted = pageNumber * dataPerPage;

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  useEffect(() => {
    if (products) {
      const pageCount = Math.ceil(products.length / dataPerPage);
      setPageCount(pageCount);
      const sproduct = products.slice(pagesVisted, pagesVisted + dataPerPage);
      setSelectProduct(sproduct);
    }
  }, [products, pagesVisted]);

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteProduct(productId).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a product")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            {" "}
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loading />}
      {loadingDelete && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {selectProduct.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <div className="my-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName=" pagination justify-content-center "
          pageClassName="page-item "
          pageLinkClassName="page-item btn"
          previousLinkClassName="page-link "
          nextLinkClassName="page-link "
          disabledClassName="page-item diabled "
          activeClassName="page-item active "
          activeLinkClassName="page-item btn btn-primary"
        />
      </div>
    </>
  );
};

export default ProductListScreen;

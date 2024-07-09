import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };

    const result = await updateUser(updatedUser);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated");
      navigate("/admin/userlist");
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1> Edit Product</h1>
        {loadingUpdateUser && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="my-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="admin" className="my-2">
                <Form.Label>Admin</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="admin"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

import React from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../slices/usersApiSlice";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetAllUserQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  console.log(users);
  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteUser(userId).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
    }
  };
  return (
    <>
      <h1>Orders</h1>
      {loadingDelete && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;

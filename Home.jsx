import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/UserReducer";
import Create from "../components/Create";
import { useEffect, useState } from "react";
import Update from "../components/Update";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../untils/Data";
import ClearLocalStorage from "../pages/localStorage";
import withAuth from "../components/Auth";
import "./style.css";

const Home = () => {
  const [popOpenAdd, setOpenPopAdd] = useState(false);
  const [popOpenAddUpdate, setOpenPopUpdate] = useState(false);
  const { users, status } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userPassword = localStorage.getItem('userPassword');

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdate = (id) => {
    navigate(`/?id=${id}`);
    setOpenPopUpdate(true);
    setTimeout(() => {
      setOpenPopUpdate(true);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem("userPassword");
    navigate('/login');
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (status === "loading") return <p>Loading users...</p>;

  return (
    <div className="text p-3">
      {<ClearLocalStorage />}
      <nav className={`navbar navbar-expand-lg navbar-light bg-body-secondary  ${popOpenAdd || popOpenAddUpdate ? "blur-navbar" : ""}`}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            {userEmail && (
              <>
                <span className="me-2">Welcome, {userEmail}</span>
              </>
            )}
          </div>
          <div className="ms-auto">
            {userEmail && (
                <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
            )}
          </div>
        </div>
      </nav>
      <br/>
      <div className={`container ${popOpenAdd || popOpenAddUpdate ? "blur-background" : ""}`}>
        <h1>User Crud</h1>
        <button onClick={() => setOpenPopAdd(true)} className="btn btn-primary my-3">
          Add User
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => handleUpdate(user.id)} className="btn btn-sm btn-primary">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger ms-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popOpenAdd && <Create setOpenPop={setOpenPopAdd} />}
      {popOpenAddUpdate && <Update setOpenPop={setOpenPopUpdate} />}
    </div>
  );
};

export default withAuth(Home);
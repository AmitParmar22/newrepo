import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/UserReducer";
import PropTypes from "prop-types";

const Update = ({ setOpenPop }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const updateUserId = Number(queryParams.get("id"));

  const users = useSelector((state) => state.users.users);
  const existingUser = users.find((f) => f.id === updateUserId) || {};

  const [uname, setName] = useState(existingUser.name || "");
  const [uemail, setEmail] = useState(existingUser.email || "");
  const [udob, setDate] = useState(existingUser.dob || "");
  const [uaddress, setAddress] = useState(existingUser.address || "");

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name || "");
      setEmail(existingUser.email || "");
      setDate(existingUser.dob || "");
      setAddress(existingUser.address || "");
    }
  }, [existingUser]);

  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id: updateUserId,
        name: uname,
        email: uemail,
        dob: udob,
        address: uaddress,
      })
    );
    setOpenPop(false);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={() => setOpenPop(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={uname}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={uemail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  value={udob}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address:</label>
                <textarea
                  className="form-control"
                  value={uaddress}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenPop(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Update.propTypes = {
  setOpenPop: PropTypes.func.isRequired,
};

export default Update;

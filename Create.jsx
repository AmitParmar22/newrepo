import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/UserReducer';
import PropTypes from 'prop-types';

const Create = ({ setOpenPop }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
        const newId = maxId + 1;
    
        const newUser = {
            id: newId,
            name: name.trim(),
            email: email.trim(),
            dob: date.trim(),
            address: address.trim(),
        };
    
        dispatch(addUser(newUser));
        setOpenPop(false);
    };
    
    return (
        <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4">
                    <div className="modal-header">
                        <h5 className="modal-title">Add User</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setOpenPop(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    placeholder="Enter name" 
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required 
                                />
                            </div>
                             <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                                 <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date of Birth:</label>
                                <input 
                                    type="date" 
                                    name="date" 
                                    className="form-control" 
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    required 
                                />
                            </div>
                             <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address:</label>
                                <textarea 
                                    name="address" 
                                    className="form-control" 
                                    placeholder="Enter address" 
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                                <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setOpenPop(false)}
                                >Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Create.propTypes = {
    setOpenPop: PropTypes.func.isRequired,
};

export default Create;

import {useState, useEffect} from 'react';
import useFormData from '../hooks/useFormData';
import {toast} from 'react-toastify';
import Modal from 'react-modal';
import {FaTimes, FaEdit} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {updateAuth} from '../features/auth/authSlice';
import {getUser, updateUser} from '../features/users/userSlice';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function User() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModalFormSubmitted, setIsModalFormSubmitted] = useState(false);
  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.users);
  const {user:authUser} = useSelector((state) => state.auth);
  const {formData, setFormData, onMutate} = useFormData(user);

  const params = useParams();
  const dispatch = useDispatch();
  const {userId} = params;
  const {_id:authUserId, isAdmin:authUserAdmin} = authUser;
  const {name, email, isAdmin} = formData;

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  const onUpdateFormSubmit = e => {
    e.preventDefault();
    setIsModalFormSubmitted(true);
    dispatch(updateUser(formData));
    dispatch(updateAuth(formData));
  };

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if(isModalFormSubmitted && isSuccess){
      closeModal();
      setIsModalFormSubmitted(false);
      //dispatch(getUser(userId));     
    }
  }, [isModalFormSubmitted, isSuccess]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, []);

  useEffect(() => {
    if(user){
      setFormData(user);
    }
  }, [user, setFormData]);
  

  if(isLoading) return <Spinner />;

  if(isError && !user) return <h3>Something went wrong.</h3>
 
  return (
    <div className="user-page">
      <BackButton url="/users" />
      <header className="user-header">
        <h2>
          Name: {user.name}
        </h2>
      </header>
      <main className="user-desc">
        <h3>Email</h3>
        <p>{user.email}</p>
        <h3>Access Level</h3>
        <p>{user.isAdmin === true ? 'Administrator' : 'Customer '}</p>
        <h3>Account Creation Date</h3>
        <p>{new Date(user.createdAt).toLocaleString('en-us')}</p>
      </main>

      <button onClick={openModal} className="btn"><FaEdit /> Edit User Details</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Edit User'>
        <h2>Edit User</h2>
        <button className="btn-close" onClick={closeModal}><FaTimes /></button>
        <form onSubmit={onUpdateFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id='name' name='name' value={name} onChange={onMutate} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input type="email" className="form-control" id='email' name='email' value={email} onChange={onMutate} />
          </div>
          {authUserAdmin && authUserId !== formData._id && (
            <div className="form-group">
              <label htmlFor="isAdmin">Access Level</label>
              <select name="isAdmin" id="isAdmin" className="form-control" onChange={onMutate} value={isAdmin ? 'true' : 'false'}>
                <option value="true">Administrator</option>
                <option value="false">Customer</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default User;
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers, reset} from '../features/users/userSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import UserItem from '../components/UserItem';

function Users() {
  const {users, isLoading, isSuccess} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset());
      }
    }
  },[isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if(isLoading) return <Spinner />;  
  
  return (
    <>
      <BackButton url="/" />
      <h1>Users</h1>
      <div className="users">
        <div className="user-headings">
          <div>Name</div>
          <div>Email</div>
          <div>Admin</div>
          <div></div>
        </div>
        {users.map(individualUser => (
          <UserItem key={individualUser._id} individualUser={individualUser} />
        ))}
      </div>
    </>
  )
}

export default Users;
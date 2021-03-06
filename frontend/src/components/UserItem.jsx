import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function UserItem({individualUser}) {
  const {name, email, isAdmin, _id} = individualUser;

  return (
    <div className="user">
      <div>{name}</div>
      <div>{email}</div>
      <div>{isAdmin ? 'Yes' : 'No'}</div>
      <Link to={`/user/${_id}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
  )
};

UserItem.propTypes = {
  individualUser: PropTypes.object.isRequired
};

export default UserItem;
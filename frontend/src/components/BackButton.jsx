import {FaArrowCircleLeft} from 'react-icons/fa';
import {Link} from 'react-router-dom';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

const BackButton = ({url}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'><FaArrowCircleLeft /> Back</Link>
  );
};

BackButton.propTypes = {
  url: urlPropType.isRequired,
};

export default BackButton;
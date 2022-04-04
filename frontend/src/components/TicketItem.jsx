import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function TicketItem({ticket, linkState}) {
  const {_id:ticketId, createdAt, product, status, user:ticketOwner} = ticket;

  return (
    <div className="ticket">
      {ticketOwner && ticketOwner.name && (<div>{ticketOwner.name}</div>)}
      {createdAt && (<div>{new Date(createdAt).toLocaleString('en-us')}</div>)}
      {product && (<div>{product}</div>)}
      {status && (<div className={`status status-${status}`}>{status}</div>)}
      <Link to={`/ticket/${ticketId}`} className="btn btn-reverse btn-sm" state={linkState}>View</Link>
    </div>
  )
}

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  linkState: PropTypes.object
};

TicketItem.defaultProps = {
  linkState: {
    allTickets: false
  }
};

export default TicketItem;
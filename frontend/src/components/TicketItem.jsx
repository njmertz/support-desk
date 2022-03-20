import {Link} from 'react-router-dom';

function TicketItem({ticket}) {
  const {_id:ticketId, createdAt, product, status, user:ticketOwner} = ticket;

  for(let [key, value] of Object.entries(ticket)){
    console.log(key, value);
  }

  return (
    <div className="ticket">
      {ticketOwner && ticketOwner.name && (<div>{ticketOwner.name}</div>)}
      {createdAt && (<div>{new Date(createdAt).toLocaleString('en-us')}</div>)}
      {product && (<div>{product}</div>)}
      {status && (<div className={`status status-${status}`}>{status}</div>)}
      <Link to={`/ticket/${ticketId}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
  )
}

export default TicketItem;
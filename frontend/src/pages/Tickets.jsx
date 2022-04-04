import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTickets, reset} from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  const linkState = {
    allTickets: false
  };  

  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset());
      }
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if(isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>My Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => (
          <TicketItem key={ticket._id} ticket={ticket} linkState={linkState} />
        ))}
      </div>
    </>
  )
}

export default Tickets;
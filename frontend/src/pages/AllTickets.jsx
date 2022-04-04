import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllTickets, reset} from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function AllTickets() {
  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  const linkState = {
    allTickets: true
  };

  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset());
      }
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  if(isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>All Tickets</h1>
      <div className="tickets five-columns">
        <div className="ticket-headings">
          <div>Name</div>
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

export default AllTickets;
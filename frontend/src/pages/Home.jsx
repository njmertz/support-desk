import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa';

function Home() {
  const {user} = useSelector((state) => state.auth);

  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <div className="flex-container flex-row flex-jc-space-between flex-ai-center flex-column-mobile button-row">
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> Create Ticket
        </Link>
        <Link to='/tickets' className='btn btn-block'>
          <FaTicketAlt /> View My Tickets
        </Link>
        {user !== null && user.isAdmin === true && (
          <Link to='/tickets/all' className='btn btn-block'>
            <FaTicketAlt /> View All Tickets
          </Link>
        )}
      </div>

    </>
  )
}

export default Home;
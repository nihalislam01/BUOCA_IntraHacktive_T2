import styles from './Event.module.scss';
import axios from 'axios';
import {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import Chat from '../../Chat/Chat';
import DetailsPopup from '../../DetailsPopup/DetailsPopup';

const eventUrl = `/api/event/events`;

function EventRequest()  {
    const [events, setEvents] = useState([]);

    const [isThread, setThread] = useState(false);
    const [referenceId, setReferenceId] = useState(0);

    const [ispopup, setpopup] = useState(false);
    const [description, setdescription] = useState('');

    useEffect(()=>{

        axios.get(eventUrl).then((response)=>{
            const events = response.data.events
          setEvents(events.filter(event => event.status === 'Requested'));
        }).catch((error)=>{
            try {
            toast.error(error.response.data.message)
            } catch {
              toast.error("something went wrong")
            }
        })
      }, [])

      const updateStatus = (eventId, status) => {
        axios.put(eventUrl, {eventId, status})
        .then(response=>toast.success(response.data.message))
        .catch(error=>{
          try {
            toast.error(error.response.data.message);
          } catch {
            toast.error("Something went wrong");
          }
        })
      }

      const openThread=(id)=>{
        setReferenceId(id);
        setpopup(false);
        setThread(true);
      };

      const handleOpenPopup = (description) => {
        setdescription(description);
        setThread(false);
        setpopup(true);
      };

    return (
    <>
        {!isThread && <><h2>Event Requests</h2>
        <hr />
      <div>
        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Club</th>
              <th>Requested By</th>
              <th>Student ID</th>
              <th>Approved By</th>
              <th>Status</th>
              <th>Chat</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event=>(
              <tr key={event._id} style={{cursor: "pointer"}} onClick={()=>handleOpenPopup(event.description)}>
                <td>{event.name}</td>
                <td>{event.eventDate.substring(0, 10)}</td>
                <td>{event.club}</td>
                <td>{event.requestedBy.email}</td>
                {event.requestedBy.studentId && <td>{event.requestedBy.studentId}</td>}
                {!event.requestedBy.studentId && <td>No ID</td>}
                {event.aprrovedBy && <td>{event.aprrovedBy.email}</td>}
                {!event.aprrovedBy && <td>Not Assigned Yet</td>}
                <td>{event.status}</td>
                <td><button onClick={(e) => { e.stopPropagation(); openThread(event._id);}}>Thread</button></td>
                <td><button onClick={(e) => { e.stopPropagation(); updateStatus(event._id, 'Approved');}} className={`${styles.approve}`}>Approve</button></td>
                <td><button onClick={(e) => { e.stopPropagation(); updateStatus(event._id, 'Rejected');}} className={`${styles.reject}`}>Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>}
      {ispopup && !isThread && <DetailsPopup title={'Event Description'} content={description} setpopup={setpopup}/>}
      {isThread && !ispopup && <Chat referenceId={referenceId} />}
      </>
    )
}

export default EventRequest;
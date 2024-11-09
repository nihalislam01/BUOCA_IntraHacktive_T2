import styles from './Event.module.scss';
import axios from 'axios';
import {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';

const eventUrl = `/api/event/events`;

function EventRequest()  {
    const [events, setEvents] = useState([]);

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

    return (
    <>
        <h2>Event Requests</h2>
        <hr />
      <div>
        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Club</th>
              <th>Requested By</th>
              <th>Approved By</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event=>(
              <tr>
                <td>{event.name}</td>
                <td>{event.eventDate.substring(0, 10)}</td>
                <td>{event.club}</td>
                <td>{event.requestedBy.email}</td>
                {event.approvedBy && <td>{event.approvedBy.email}</td>}
                {!event.approvedBy && <td>null</td>}
                <td>{event.status}</td>
                <td><button onClick={() => updateStatus(event._id, 'Approved')} className={`${styles.approve}`}>Approve</button></td>
                <td><button onClick={() => updateStatus(event._id, 'Rejected')} className={`${styles.reject}`}>Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )
}

export default EventRequest;
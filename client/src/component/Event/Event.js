import styles from './Event.module.scss';
import axios from 'axios';
import {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import { serverLocation } from '../../const/Constants';

const getEventsUrl = `${serverLocation}/api/event/events`;

const Event = () => {

  const [events, setEvents] = useState([]);

  useEffect(()=>{

    axios.get(getEventsUrl, {
      withCredentials: true
    }).then((response)=>{
      setEvents(response.data.events);
    }).catch((error)=>{
        try {
        toast.error(error.response.data.message)
        } catch {
          toast.error("something went wrong")
        }
    })
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Events</h2>
        <span className="text-muted">Create a new event</span>
      </div>
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
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event=>(
              <tr>
                <td>{event.name}</td>
                <td>{event.eventDate}</td>
                <td>Club</td>
                <td>{event.requestedBy}</td>
                <td>null</td>
                <td>{event.status}</td>
                <td><a href="#" className={`${styles.editLink}`}>Edit</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
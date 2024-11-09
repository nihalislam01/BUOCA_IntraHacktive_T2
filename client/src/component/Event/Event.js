import styles from './Event.module.scss';
import axios from 'axios';
import {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import FormInput from "../../common/components/FormInput/FormInput";

const eventUrl = `/api/event/events`;

const eventInputs = [
  {
      id: "nameInput",
      name: "name",
      type: "text",
      label: "Event Name",
  },
  {
    id: "clubInput",
    name: "club",
    type: "text",
    label: "Club"
  },
  {
      id: "descritionInput",
      name: "description",
      type: "text",
      label: "Event Description"
  },
  {
    id: "eventDateInput",
    name: "eventDate",
    type: "date",
    label: "Event Date"
},
];

const Event = () => {

  const [events, setEvents] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    club: "",
    description: "",
    eventDate: "",
  });

  useEffect(()=>{

    axios.get(eventUrl).then((response)=>{
      setEvents(response.data.events);
    }).catch((error)=>{
        try {
        toast.error(error.response.data.message)
        } catch {
          toast.error("something went wrong")
        }
    })
  }, [])

  const onChangeHandler = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value});
  };

  const createEvent = () => {
    setIsCreate(true);
  }

  const onFormSubmit = e => {
    e.preventDefault();
    let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

    if (hasError) {
        return;
    }

    axios.post(eventUrl, {
      ...formValues
  }).then((response) => {
    setIsCreate(false);
      console.log("we good");
  }).catch((error) => {
      try {
          toast.error(error.response.data.message);
      } catch {
          toast.error("Something went wrong");
      }
      setIsCreate(false);
  });
  }

  return (
    <>
      {!isCreate && <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Events</h2>
        <span className="text-muted"><button style={{border: "none", background: "none"}} onClick={createEvent}>Create a new event</button></span>
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
                <td>{event.eventDate.substring(0, 10)}</td>
                <td>{event.club}</td>
                <td>{event.requestedBy.email}</td>
                {event.aprrovedBy && <td>{event.aprrovedBy.email}</td>}
                {!event.aprrovedBy && <td>null</td>}
                <td>{event.status}</td>
                <td><a href="#" className={`${styles.editLink}`}>Edit</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>}
      {isCreate && <>
      <h2>Create Event</h2>
      <hr />
      <div>
        {eventInputs.map(e => (
            <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
        ))}

        <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Create</button>
      </div>
      </>}
    </>
  );
};

export default Event;
import styles from './Event.module.scss';

function EventTable({events, setIsCreate, setpopup, setdescription, openThread}) {

    const handleOpenPopup = (description) => {
        setdescription(description);
        setpopup(true);
      };

    const createEvent = () => {
        setIsCreate(true);
    }

    return (
        <>
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
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event=>(
              <tr key={event._id} style={{cursor: "pointer"}} onClick={()=>handleOpenPopup(event.description)}>
                <td>{event.name}</td>
                <td>{event.eventDate.substring(0, 10)}</td>
                <td>{event.club}</td>
                <td>{event.requestedBy.email}</td>
                {event.aprrovedBy && <td>{event.aprrovedBy.email}</td>}
                {!event.aprrovedBy && <td>null</td>}
                <td>{event.status}</td>
                <td><button onClick={()=>openThread(event._id)}>Thread</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )

}

export default EventTable;
import styles from './BookingDetails.module.scss';

function BookingDetails({request}) {

    const times = [
        "08:00 AM - 09:20 AM",
        "09:30 AM - 10:50 AM",
        "11:00 AM - 12:20 PM",
        "12:30 PM - 01:50 PM",
        "02:00 PM - 03:20 PM",
        "03:30 PM - 04:50 PM",
        "05:00 PM - 06:20 PM",
        "06:30 PM - 07:20 PM",
    ]

    return (
        <>
            <h2>Booking Details</h2>
            <hr />
            <h4>Purpose</h4>
            <p>{request.purpose}</p>
            <h4>Requested By</h4>
            <p>{request.bookedBy.email}</p>
            <h4>Rooms that has been selected</h4>
            <hr />
            <table className={`${styles.table}`}>
                <thead className={`${styles.tableHead}`}>
                    <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Room No</th>
                    </tr>
                </thead>
                <tbody>
                    {request.rooms.map(room=>(
                        room.schedule.split('').map(schedule=>(
                            <tr>
                                <td>{room.date}</td>
                                <td>{times[parseInt(schedule)]}</td>
                                <td>{room.room.name}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>  
        </>
    )
}

export default BookingDetails;
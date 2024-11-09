import styles from './Room.module.scss';

function RoomTable({date, time, rooms, addRoom}) {
    return (
        <>
            <table className={`${styles.table}`}>
            <thead className={`${styles.tableHead}`}>
                <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Floor</th>
                <th>Room</th>
                <th>Capacity</th>
                <th>Add</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map(room=>(
                <tr key={room._id}>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{room.floor}</td>
                    <td>{room.name}</td>
                    <td>{room.capacity}</td>
                    <td><button onClick={()=>addRoom(room._id, date, time, room.name)}>Add</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}

export default RoomTable;
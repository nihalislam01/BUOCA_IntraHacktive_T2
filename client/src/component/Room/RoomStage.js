import styles from './Room.module.scss';

function RoomStage({rooms}) {
    return (
        <>
            <table className={`${styles.table}`}>
            <thead className={`${styles.tableHead}`}>
                <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Room No</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map(room=>(
                <tr key={room.id}>
                    <td>{room.date}</td>
                    <td>{room.time}</td>
                    <td>{room.name}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}

export default RoomStage;
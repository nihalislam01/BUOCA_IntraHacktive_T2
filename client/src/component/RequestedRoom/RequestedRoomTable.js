import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './RequestedRoom.module.scss';

function RequestedRoomTable({requests, goToDetails, openThread}) {

    return (
        <>
          <table className={`${styles.table} mb-4`}>
            <thead className={`${styles.tableHead}`}>
                <tr>
                <th>Booked By</th>
                <th>Student ID</th>
                <th>Approved By</th>
                <th>status</th>
                <th>Chat</th>
                </tr>
            </thead>
            <tbody>
                {requests.map(request=>(
                <tr key={request._id} style={{cursor: "pointer"}} onClick={()=>goToDetails(request)}>
                    <td>{request.bookedBy.email}</td>
                    {request.bookedBy.studentId && <td>{request.bookedBy.studentId}</td>}
                    {!request.bookedBy.studentId && <td>No ID</td>}
                    {request.approvedBy && <td>{request.approvedBy.email}</td>}
                    {!request.approvedBy && <td>Not Assigned Yet</td>}
                    <td>{request.status}</td>
                    <td><button onClick={(e) => { e.stopPropagation(); openThread(request._id);}}>Thread</button></td>
                </tr>
                ))}
            </tbody>
            </table>  
        </>
    )
}

export default RequestedRoomTable;
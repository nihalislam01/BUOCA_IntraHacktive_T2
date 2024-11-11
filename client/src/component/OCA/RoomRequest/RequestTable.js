import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './RoomRequest.module.scss';

const updateStatusUrl = '/api/book/update-status';

function RequestTable({requests, goToDetails, openThread}) {
    const updateStatus = (id, status) => {
        axios.put(updateStatusUrl,{bookingId: id, status})
        .then(response=>toast.success(response.data.message)).catch(error=>{
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
        })
    }
    return (
        <>
          <table className={`${styles.table}`}>
            <thead className={`${styles.tableHead}`}>
                <tr>
                <th>Booked By</th>
                <th>Student ID</th>
                <th>status</th>
                <th>Chat</th>
                <th>Approve</th>
                <th>Deny</th>
                </tr>
            </thead>
            <tbody>
                {requests.map(request=>(
                <tr key={request._id} style={{cursor: "pointer"}} onClick={()=>goToDetails(request)}>
                    <td>{request.bookedBy.email}</td>
                    <td>{request.bookedBy.studentId}</td>
                    <td>{request.status}</td>
                    <td><button onClick={(e) => { e.stopPropagation(); openThread(request._id);}}>Thread</button></td>
                    <td><button onClick={(e) => { e.stopPropagation(); updateStatus(request._id, 'Approved')}} className={`${styles.approve}`}>Approve</button></td>
                    <td><button style={{color: "#B10C14"}} onClick={(e) => { e.stopPropagation(); updateStatus(request._id, 'Denied')}} className={`${styles.reject}`}>Deny</button></td>
                </tr>
                ))}
            </tbody>
            </table>  
        </>
    )
}

export default RequestTable;
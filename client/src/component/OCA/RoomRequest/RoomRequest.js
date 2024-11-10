import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BookingDetails from "../BookingDetails/BookingDetails";
import RequestTable from "./RequestTable";

const bookRequestUrl = '/api/book/get';

function RoomRequest() {

    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState({});
    const [isDetails, setDetails] = useState(false);

    useEffect(()=>{
        axios.get(bookRequestUrl).then(response=>setRequests(response.data.requests)).catch(error=>{
            try{
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
        })
    },[])

    const goToDetails = (request) => {
        setRequest(request);
        setDetails(true);
    }

    return (
        <>
            {!isDetails && <>
                <h2>Pending Requests</h2>
                <hr />
                <RequestTable requests={requests} goToDetails={goToDetails}/>
            </>}
            {isDetails && <BookingDetails request={request}/>}
        </>
    )
}

export default RoomRequest;
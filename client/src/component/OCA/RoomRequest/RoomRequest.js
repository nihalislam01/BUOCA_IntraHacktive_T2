import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Chat from "../../Chat/Chat";
import BookingDetails from "../BookingDetails/BookingDetails";
import RequestTable from "./RequestTable";

const bookRequestUrl = '/api/book/get';

function RoomRequest() {

    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState({});
    const [isDetails, setDetails] = useState(false);

    const [isThread, setThread] = useState(false);
    const [referenceId, setReferenceId] = useState(0);

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
        setThread(false);
        setDetails(true);
    }

    const openThread=(id)=>{
        console.log("HEllo");
        setReferenceId(id);
        setDetails(false);
        setThread(true);
    }

    return (
        <>
            {!isDetails && !isThread && <>
                <h2>Pending Requests</h2>
                <hr />
                <RequestTable requests={requests} goToDetails={goToDetails} openThread={openThread} />
            </>}
            {isDetails && !isThread && <BookingDetails request={request}/>}
            {isThread && !isDetails && <Chat referenceId={referenceId} />}
        </>
    )
}

export default RoomRequest;
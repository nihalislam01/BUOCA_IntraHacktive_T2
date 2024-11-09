import RoomTable from "./RoomTabel";
import {useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const roomUrl = '/api/schedule/schedules'

function Room() { 

    const [rooms, setRooms] = useState([]);
    const [incomingDate, setincomingDate] = useState('');
    const [incomingTime, setincomingTime] = useState('');

    const [date, setDate] = useState('');
    const [time, setTime] = useState(-1);

    const times = {
        "select time": -1,
        "08:00 AM - 09:20 AM": 0, 
        "09:30 AM - 10:50 AM": 1, 
        "11:00 AM - 12:20 PM": 2, 
        "12:30 PM - 01:50 PM": 3, 
        "02:00 PM - 03:20 PM": 4, 
        "03:30 PM - 04:50 PM": 5, 
        "05:00 PM - 06:20 PM": 6, 
        "06:30 PM - 07:20 PM": 7
    }

    const ondateChange = (e) => {
        setDate(e.target.value);
    };
    
    const handleTimeChange = (e) => {
        setTime(Number(e.target.value));
    };
    

    const onSubmit = e => {
        e.preventDefault();
        let hasError = time === -1 || date === "";
    
        if (hasError) {
            toast.error("Fill all the fields");
            return;
        }

        axios.post(roomUrl, {
            date, time
        }).then((response) => {
            setRooms(response.data.rooms);
            setincomingDate(response.data.date);
            setincomingTime(Object.entries(times).find(([key, val]) => val === response.data.time)?.[0]);
            console.log("we good");
        }).catch((error) => {
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
        });
    }

    return (
        <>
            <h2>Available Rooms</h2>
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex w-50">
                    <input type="date" className="form-control mx-2" value={date} name="date" onChange={ondateChange} />
                    <select value={time} className="form-control mx-2" onChange={handleTimeChange}>
                    {Object.entries(times).map(([label, value]) => (
                        <option key={value} value={value}>
                        {label}
                        </option>
                    ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={onSubmit}>Search</button>
            </div>
            <hr />
            <RoomTable date={incomingDate} time={incomingTime} rooms={rooms} />
        </>
    )
}

export default Room;
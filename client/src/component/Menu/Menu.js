import styles from "./Menu.module.scss";
import {Link} from "react-router-dom";
import axios from "axios";

const signOutUrl = `/api/user/logout`

function Menu(props) {


    const doSignOut = (e) => {
        axios.post(signOutUrl, {}, {
                withCredentials: true
            })
            .then((response) => {
                window.location.href = '/';
            }).catch((error) => {
                console.log(error);
                window.location.href = '/';
            });
    };

    return (
        <ul className={`d-flex align-content-start justify-content-start ${styles.menu}`}>
            <li className={`mx-2 ${props.currentPage === Page.dashboard && (`selected`)}`}>
                <Link to="/dashboard">Dashboard</Link>
            </li>

            {!props.isOCA && <li className={`mx-2 ${props.currentPage === Page.event && (`selected`)}`}>
                <Link to="/event">Events</Link>
            </li>}

            {props.isOCA && <li className={`mx-2 ${props.currentPage === Page.eventRequest && (`selected`)}`}>
                <Link to="/event-request">Event Request</Link>
            </li>}

            {!props.isOCA && <li className={`mx-2 ${props.currentPage === Page.budget && (`selected`)}`}>
                <Link to="/budget">Budget</Link>
            </li>}

            {props.isOCA && <li className={`mx-2 ${props.currentPage === Page.budgetRequest && (`selected`)}`}>
                <Link to="/budget-request">Budget Request</Link>
            </li>}

            {!props.isOCA && <li className={`mx-2 ${props.currentPage === Page.room && (`selected`)}`}>
                <Link to="/room">Requested Room</Link>
            </li>}

            {!props.isOCA && <li className={`mx-2 ${props.currentPage === Page.availableRoom && (`selected`)}`}>
                <Link to="/available-room">Available Room</Link>
            </li>}

            {props.isOCA && <li className={`mx-2 ${props.currentPage === Page.roomRequest && (`selected`)}`}>
                <Link to="/room-request">Room Request</Link>
            </li>}

            {props.isOCA && <li className={`mx-2 ${props.currentPage === Page.register && (`selected`)}`}>
                <Link to="/register">Register Member</Link>
            </li>}

            <li className={`mx-2 position-relative`}>
                <Link to="#" onClick={doSignOut}>Sign Out</Link>
            </li>
        </ul>
    );
}

export const Page = {
    event: 1,
    eventRequest: 2,
    budget: 3,
    budgetRequest: 4,
    room: 5,
    availableRoom: 6,
    roomRequest: 7,
    dashboard: 8,
    register: 9
};

export default Menu;
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
            <li className={`mx-2 ${props.currentPage === Page.event && (`selected`)}`}>
                <Link to="/event">Events</Link>
            </li>

            {props.isOCA && <li className={`mx-2 ${props.currentPage === Page.eventRequest && (`selected`)}`}>
                <Link to="/event-request">Event Request</Link>
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
};

export default Menu;
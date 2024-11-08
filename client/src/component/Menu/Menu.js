import styles from "./Menu.module.scss";
import {Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverLocation} from "../../const/Constants";

const signOutUrl = `${serverLocation}/api/user/logout`

function Menu(props) {

    const [isSignedOut, setSignedOut] = useState(false);

    const doSignOut = (e) => {
        axios.post(signOutUrl, {}, {
                withCredentials: true
            })
            .then((response) => {
                if (response.data.status) {
                    setSignedOut(true);
                }
            }).catch((error) => {
                setSignedOut(true);
                console.log(error);
            });
    };

    if (isSignedOut) {
        return <Navigate to={"/"}/>;
    }

    return (
        <ul className={`d-flex align-content-start justify-content-start ${styles.menu}`}>
            <li className={`mx-2 ${props.currentPage === Page.event && (`selected`)}`}>
                <Link to="/event">Event</Link>
            </li>

            <li className={`mx-2 ${props.currentPage === Page.profile && (`selected`)}`}>
                <Link to="/profile">Profile</Link>
            </li>

            <li className={`mx-2 position-relative`}>
                <Link to="#" onClick={doSignOut}>Sign Out</Link>
            </li>
        </ul>
    );
}

export const Page = {
    event: 1,
    profile: 2,
};

export default Menu;
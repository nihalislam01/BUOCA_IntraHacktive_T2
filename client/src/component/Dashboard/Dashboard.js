import styles from "./Dashboard.module.scss";
import Menu, { Page } from "../Menu/Menu";
import Event from "../Event/Event";
import Profile from "../Profile/Profile";
import DataAnalytic from "../DataAnalytic/DataAnalytic";
import { serverLocation } from "../../const/Constants";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const checkUrl = `${serverLocation}/api/user/check`;

function Dashboard(props) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(checkUrl, {
                withCredentials: true
            }).then((response)=>{
            if (response.data.success) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        }).catch((error)=>{
            setAuthenticated(false);
            console.log(error);
        })
    }, []);


    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }
    return (
    <>
        <section className={`${styles.container}`}>
            <div>
                <nav className={`${styles.navbar}`}>
                    <div className={`${styles.branding}`}>
                        <h4>BUOCA</h4>
                    </div>
                    <div className={`${styles.menu}`}>
                        <Menu currentPage={props.currentPage}/>
                    </div>
                </nav>
                <div className={`${styles.pagecontainer}`}>
                    {props.currentPage === Page.event && <Event />}
                    {props.currentPage === Page.profile && <Profile />}
                </div>
            </div>
        </section>
    </>
)
}

export default Dashboard;
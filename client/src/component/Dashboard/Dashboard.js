import styles from "./Dashboard.module.scss";
import Menu, { Page } from "../Menu/Menu";
import Event from "../Event/Event";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventRequest from "../OCA/EventRequest/EventRequest";
import Budget from "../Budget/Budget";
import BudgetRequest from "../OCA/BudgetRerquest/BudgetRequest";
import Room from "../Room/Room";
import RoomRequest from "../OCA/RoomRequest/RoomRequest";
import RequestedRoom from "../RequestedRoom/RequestedRoom";
import AnalyticDashboard from "../AnalyticDashboard/AnalyticDashboard";
import Register from "../OCA/Register/Register";

const checkUrl = `/api/user/check`;

function Dashboard(props) {

    const navigate = useNavigate();
    const [isOCA, setOCA] = useState(false);

    useEffect(() => {
        axios.get(checkUrl).then((response)=>{
            setOCA(response.data.user.role === 'OCA');
        }).catch((error)=>{
            console.log(error);
            navigate('/');
        })
    }, [navigate]);

    return (
    <>
        <section className={`${styles.container}`}>
            <div>
                <nav className={`${styles.navbar}`}>
                    <div className={`${styles.branding}`}>
                        <h4>BUOCA</h4>
                    </div>
                    <div className={`${styles.menu}`}>
                        <Menu currentPage={props.currentPage} isOCA={isOCA}/>
                    </div>
                </nav>
                <div className={`${styles.pagecontainer}`}>
                    {props.currentPage === Page.dashboard && <AnalyticDashboard />}
                    {props.currentPage === Page.event && <Event />}
                    {props.currentPage === Page.eventRequest && <EventRequest />}
                    {props.currentPage === Page.budget && <Budget />}
                    {props.currentPage === Page.budgetRequest && <BudgetRequest />}
                    {props.currentPage === Page.room && <RequestedRoom />}
                    {props.currentPage === Page.availableRoom && <Room />}
                    {props.currentPage === Page.roomRequest && <RoomRequest />}
                    {props.currentPage === Page.register && <Register />}
                </div>
            </div>
        </section>
    </>
)
}

export default Dashboard;
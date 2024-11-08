import styles from "./Dashboard.module.scss";
import Menu, { Page } from "../Menu/Menu";
import Event from "../Event/Event";
import Profile from "../Profile/Profile";
import DataAnalytic from "../DataAnalytic/DataAnalytic";

function Dashboard(props) {
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
import {Outlet} from "react-router-dom";
import Login from '../Login/Login';
import styles from "./Landing.module.scss";

function Landing() {
    return (
        <>
            <section className={`${styles.container}`}>
                <div className={`${styles.box}`}>
                    <h1 className="text-center">BUOCA</h1>
                    <p className="text-center">Brac University's Office of Co-curricular Activities</p>
                </div>
                <div className={`${styles.box}`}>
                    <Outlet/>
                </div>
            </section>
        </>
    );
}

export const landingRoutes = [
    {
        path: "/",
        element: <Login />
    }
];

export default Landing;
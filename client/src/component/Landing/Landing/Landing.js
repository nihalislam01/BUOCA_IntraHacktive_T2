import {Outlet} from "react-router-dom";
import Email from "../Email/Email";
import Login from '../Login/Login';
import Password from "../Password/Password";
import Token from "../Token/Token";
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
    },
    {
        path: "/verify/email",
        element: <Email />
    },
    {
        path: "/verify/otp",
        element: <Token />
    },
    {
        path: "/update/password",
        element: <Password />
    }
];

export default Landing;
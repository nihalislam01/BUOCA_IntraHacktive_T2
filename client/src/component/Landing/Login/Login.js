import styles from "./Login.module.scss";
import {Navigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import {toast} from "react-hot-toast";

const authUrl = `/api/user/login`;

const userInputs = [
    {
        id: "emailInput",
        name: "email",
        type: "text",
        placeholder: "Email",
    },
    {
        id: "passwordInput",
        name: "password",
        type: "password",
        placeholder: "Password"
    },
];

const pageTitle = "BUOCA - Login Page";

function Login() {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isOCA, setOCA] = useState(false);

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

        if (hasError) {
            return;
        }

        axios.post(authUrl, {
            ...formValues
        }).then((response) => {
            localStorage.setItem("userId", response.data.user._id);
            setAuthenticated(true);
            setOCA(response.data.user.role==="OCA")
            console.log("we good");
        }).catch((error) => {
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
        });
    }

    if (isAuthenticated) {
        if (isOCA) {
            return <Navigate to={"/event-request"}/>;
        } else {
            return <Navigate to={"/event"}/>;
        }
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
                <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Log In</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {userInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Sign In</button>
                        </div>
                    </div>
                    <button className="btn btn-link mt-2">Forgot Password? Click Here</button>
                </div>
            </div>
        </>
    );
}

export default Login;
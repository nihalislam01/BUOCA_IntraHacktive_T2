import styles from "./Password.module.scss";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import {toast} from "react-hot-toast";

const passwordUrl = `/api/user/update/password`;

const passwordInputs = [
    {
        id: "emailInput",
        name: "email",
        type: "email",
        placeholder: "Please enter the verified email",
    },
    {
        id: "passwordInput",
        name: "newPassword",
        type: "password",
        placeholder: "Please enter the new password",
    },
];

const pageTitle = "BUOCA - Update Password Page";

function Password() {

    const [formValues, setFormValues] = useState({
        email: "",
        newPassword: ""
    });

    const navigate = useNavigate();

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

        if (hasError) {
            return;
        }

        axios.patch(passwordUrl, {
            ...formValues
        }).then((response) => {
            if (response.data.success) {
                toast.success("Password Update Successful")
                navigate('/');
            } else {
                toast.error("Something went wrong");
                navigate('/');
            }
        }).catch((error) => {
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
            console.log(error);
        });
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
                <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Enter New Password</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {passwordInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Update Password</button>
                        </div>
                    </div>
                    <Link to="/"><button className="btn btn-link mt-2">Login?</button></Link>
                </div>
            </div>
        </>
    );
}

export default Password;
import styles from "./Email.module.scss";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import {toast} from "react-hot-toast";

const emailUrl = `/api/user/verify/email`;

const emailInput = [
    {
        id: "emailInput",
        name: "email",
        type: "email",
        placeholder: "Please enter your email",
    },
];

const pageTitle = "BUOCA - Email Page";

function Email() {

    const [formValues, setFormValues] = useState({
        email: "",
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

        axios.post(emailUrl, {
            ...formValues
        }).then((response) => {
            if (response.data.success) {
                toast.success("OTP sent to email");
                navigate('/verify/otp');
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
        });
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
                <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Email</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {emailInput.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Send</button>
                        </div>
                    </div>
                    <Link to="/"><button className="btn btn-link mt-2">Login?</button></Link>
                </div>
            </div>
        </>
    );
}

export default Email;
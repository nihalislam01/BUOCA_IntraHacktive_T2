import styles from "./Register.module.scss";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import {toast} from "react-hot-toast";

const registerUrl = `/api/user/register`;

const userInputs = [
    {
        id: "nameInput",
        name: "name",
        type: "text",
        placeholder: "Name"
    },
    {
        id: "emailInput",
        name: "email",
        type: "email",
        placeholder: "Email",
    },
    {
        id: "studentIdInput",
        name: "studentId",
        type: "text",
        placeholder: "BRACU Student ID",
    },
    {
        id: "passwordInput",
        name: "password",
        type: "password",
        placeholder: "Password"
    },
];

const pageTitle = "BUOCA - Register Page";

function Register() {

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        studentId: "",
        password: "",
    });

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

        if (hasError) {
            return;
        }

        axios.post(registerUrl, {
            ...formValues
        }).then((response) => {
            toast.success("Club Panel Member Registered");
            console.log("we good");
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

            <div className={`d-flex justify-content-center align-items-center`}>
                <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Register Member</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {userInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
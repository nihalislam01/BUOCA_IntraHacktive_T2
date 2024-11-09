import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FormInput from "../../common/components/FormInput/FormInput";

const budgetUrl = `/api/budget/budgets`;

const budgetInputs = [
    {
      id: "clubInput",
      name: "club",
      type: "text",
      label: "Club"
    },
    {
        id: "amountInput",
        name: "amountRequested",
        type: "text",
        label: "Requested Amount"
    }
  ];

function BudgetForm ({setForm}) {

    const [formValues, setFormValues] = useState({
        club: "",
        amountRequested: "",
        purpose: "",
      });

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handlePurposeChange = e => {
        setFormValues((prevValues) => ({...prevValues, purpose: e.target.value,}));
      };

    const cancel = () => {
        setForm(false);
    }

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);
    
        if (hasError) {
            toast.error('Please fill the form');
            return;
        }
    
        axios.post(budgetUrl, {
          ...formValues
        }).then((response) => {
            setForm(false);
            toast.success("New Budget Requested")
            console.log("we good");
        }).catch((error) => {
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
            setForm(false);
        });
      }
    return (
        <>
        <h2>Request Budget</h2>
        <hr />
        <div>
            {budgetInputs.map(e => (
                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
            ))}
            <label htmlFor="purposeInput" className="form-label">Budget Purpose</label>
            <textarea id="purposeInput" type="text" name="purpose" className="form-control"  onChange={handlePurposeChange} />

            <button type="submit" className={`btn btn-primary mt-2 mx-2`} onClick={onFormSubmit}>Create</button>
            <button className={`btn btn-secondary mt-2 mx-2`} onClick={cancel}>Cancel</button>
        </div>
        </>
    )
}

export default BudgetForm;
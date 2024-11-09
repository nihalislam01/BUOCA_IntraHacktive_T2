import axios from 'axios'
import { useState, useEffect } from "react";
import BudgetTable  from "./BudgetTable";
import {toast} from 'react-hot-toast';
import BudgetForm from './BudgetForm';
import DetailsPopup from '../DetailsPopup/DetailsPopup';

const budgetUrl = `/api/budget/budgets`;

function Budget() {

    const [isForm, setForm] = useState(false);
    const [budgets, setBudgets] = useState([]);

    const [ispopup, setpopup] = useState(false);
    const [purpose, setpurpose] = useState('');

    useEffect(()=>{

        axios.get(budgetUrl)
        .then(response=>{
          setBudgets(response.data.budgets)
        })
        .catch(error=>{
            try{
                toast.error(error.response.data.message)
            }catch{
                toast.error("Something went wrong")
            }
        });
    },[])
    return (
        <>
            {!isForm && <BudgetTable setForm={setForm} budgets={budgets} setpopup={setpopup} setpurpose={setpurpose} />}
            {isForm && <BudgetForm setForm={setForm} />}
            {ispopup && <DetailsPopup title={'Budget Request'} content={purpose} setpopup={setpopup}/>}
        </>
    )
}

export default Budget;
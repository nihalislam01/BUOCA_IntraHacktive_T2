import axios from 'axios'
import { useState, useEffect } from "react";
import BudgetTable  from "./BudgetTable";
import {toast} from 'react-hot-toast';
import BudgetForm from './BudgetForm';
import DetailsPopup from '../DetailsPopup/DetailsPopup';
import Chat from '../Chat/Chat';

const budgetUrl = `/api/budget/budgets`;

function Budget() {

    const [isForm, setForm] = useState(false);
    const [budgets, setBudgets] = useState([]);

    const [isThread, setThread] = useState(false);
    const [referenceId, setReferenceId] = useState(0);

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

    const openThread=(id)=>{
        setReferenceId(id);
        setThread(true);
      }

    return (
        <>
            {!isForm && !isThread && <BudgetTable setForm={setForm} budgets={budgets} setpopup={setpopup} setpurpose={setpurpose} openThread={openThread}/>}
            {isForm && <BudgetForm setForm={setForm} />}
            {ispopup && <DetailsPopup title={'Budget Request'} content={purpose} setpopup={setpopup}/>}
            {isThread && <Chat referenceId={referenceId} />}
        </>
    )
}

export default Budget;
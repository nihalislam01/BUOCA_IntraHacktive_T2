import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BudgetChart from "../../common/components/Chart/BudgetChart";
import EventChart from "../../common/components/Chart/EventChart";
import EventStatusChart from "../../common/components/Chart/EventStatusChart";

const eventUrl = `/api/event/events`;
const budgetUrl = `/api/budget/budgets`;

const AnalyticDashboard = () => {

    const [events, setEvents] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(()=>{

        axios.get(eventUrl).then((response)=>{
          setEvents(response.data.events);
        }).catch((error)=>{
            try {
            toast.error(error.response.data.message)
            } catch {
              toast.error("something went wrong")
            }
        })        
        
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


      }, [])
  
    return (
      <>
        <h2>Dashboard</h2>
        <hr />
        <div className="d-flex justify-content-center w-100" style={{maxWidth: "100%"}}>
            <div className="w-100">
                <BudgetChart budgets={budgets} />
                <EventChart eventData={events} />
            </div>
            <div className="w-100">
                <EventStatusChart eventData={events} />
            </div>
        </div>
      </>
    );
  };
  
  export default AnalyticDashboard;
  
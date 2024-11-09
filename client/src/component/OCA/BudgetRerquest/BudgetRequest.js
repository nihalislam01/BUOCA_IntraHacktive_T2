import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './BudgetRequest.module.scss';

const budgetUrl = `/api/budget/budgets`;

function BudgetRequest() {
    const [budgets, setBudgets] = useState([]);

    useEffect(()=>{

        axios.get(budgetUrl).then((response)=>{
            const budgets = response.data.budgets
            setBudgets(budgets.filter(budget => budget.status === 'Pending'));
        }).catch((error)=>{
            try {
            toast.error(error.response.data.message)
            } catch {
              toast.error("something went wrong")
            }
        })
      }, [])

      const updateStatus = (budgetId, status) => {
        axios.put(budgetUrl, {budgetId, status})
        .then(response=>toast.success(response.data.message))
        .catch(error=>{
          try {
            toast.error(error.response.data.message);
          } catch {
            toast.error("Something went wrong");
          }
        })
      }
    return (
        <>
        <h2>Budget Requests</h2>
        <hr />
      <div>
      <table className={`${styles.table}`}>
            <thead className={`${styles.tableHead}`}>
              <tr>
                <th>Club</th>
                <th>Amount Requested</th>
                <th>Requested By</th>
                <th>Approved By</th>
                <th>Status</th>
                <th>Approve</th>
                <th>Deny</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map(budget=>(
                <tr key={budget._id} style={{cursor: "pointer"}}>
                  <td>{budget.club}</td>
                  <td>{budget.amountRequested}</td>
                  <td>{budget.requestedBy.email}</td>
                  {budget.approvedBy && <td>{budget.approvedBy.email}</td>}
                  {!budget.approvedBy && <td>null</td>}
                  <td>{budget.status}</td>
                  <td><button onClick={() => updateStatus(budget._id, 'Approved')} className={`${styles.approve}`}>Approve</button></td>
                <td><button onClick={() => updateStatus(budget._id, 'Denied')} className={`${styles.reject}`}>Deny</button></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
        </>
    )
}

export default BudgetRequest;
import styles from './Budget.module.scss';

function BudgetTable({setForm, budgets, setpopup, setpurpose, openThread}) {
    
    const handleOpenPopup = (purpose) => {
      setpurpose(purpose);
      setpopup(true);
    };

    const requestBudget = () => {
        setForm(true);
    }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>All Budget Requests</h2>
          <span className="text-muted"><button style={{border: "none", background: "none"}} onClick={requestBudget}>Request a new budget</button></span>
        </div>
          <hr />
        <div>
          <table className={`${styles.table}`}>
            <thead className={`${styles.tableHead}`}>
              <tr>
                <th>Club</th>
                <th>Amount Requested</th>
                <th>Requested By</th>
                <th>Student ID</th>
                <th>Approved By</th>
                <th>Status</th>
                <th>Chat</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map(budget=>(
                <tr key={budget._id} style={{cursor: "pointer"}} onClick={()=>handleOpenPopup(budget.purpose)}>
                  <td>{budget.club}</td>
                  <td>{budget.amountRequested}</td>
                  <td>{budget.requestedBy.email}</td>
                  {budget.requestedBy.studentId && <td>{budget.requestedBy.studentId}</td>}
                {!budget.requestedBy.studentId && <td>No ID</td>}
                {budget.aprrovedBy && <td>{budget.aprrovedBy.email}</td>}
                {!budget.aprrovedBy && <td>Not Assigned Yet</td>}
                  <td>{budget.status}</td>
                  <td><button onClick={(e) => { e.stopPropagation(); openThread(budget._id);}}>Thread</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
}

export default BudgetTable;
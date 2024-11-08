import styles from './Event.module.scss';

const Event = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Events</h2>
        <span className="text-muted">Create a new event</span>
      </div>
        <hr />
      <div>
        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Club</th>
              <th>Requested By</th>
              <th>Approved By</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IntraHacktive</td>
              <td>11/11/2024</td>
              <td>BUCC</td>
              <td>joesoap@test.com</td>
              <td>bobsoap@test.com</td>
              <td>Approved</td>
              <td><a href="#" className={`${styles.editLink}`}>Edit</a></td>
            </tr>
            <tr>
              <td>Bizz Bee</td>
              <td>20/11/2024</td>
              <td>BUBC</td>
              <td>bobsoap@test.com</td>
              <td>nul</td>
              <td>Unassigned</td>
              <td><a href="#" className={`${styles.editLink}`}>Edit</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
function ScheduleTable({ studyPlan }) {
  return (
    <div className="table-container">
      <h2>Personalized Study Schedule</h2>

      <table className="study-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {studyPlan.map((item) => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>{item.date}</td>
              <td>{item.subject}</td>
              <td>{item.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
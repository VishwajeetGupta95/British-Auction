const ActivityLog = ({ events }) => {
  return (
    <div>
      <h3>Activity Log</h3>

      {events.map((e, i) => (
        <div key={i}>
          <strong>{e.eventType}</strong> - {e.description}
          <br />
          <small>{e.timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
import { useState } from "react";
import "./App.css";

let nextId = 1;

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rows, setRows] = useState([
    { id: nextId - 1, class: "Sample Class", time: "08:00" },
  ]);

  function handleNewRow() {
    setRows([...rows, { id: nextId++, class: "", time: "" }]);
  }

  function handleDeleteRow(id) {
    setRows(rows.filter((row) => row.id !== id));
  }

  function handleEditRow(id, e) {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, class: e.target.value };
        } else {
          return row;
        }
      }),
    );
  }

  function handleEditTime(id, e) {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, time: e.target.value };
        } else {
          return row;
        }
      }),
    );
  }

  function handleViewSchedule(e) {
    e.preventDefault();
    setDialogOpen(true);
  }

  return (
    <>
      <form onSubmit={handleViewSchedule}>
        <button type="submit" className="control">
          View Schedule
        </button>
        <div id="list">
          {rows.map((row) => (
            <div key={`row-${row.id}`} className="row">
              <input
                type="text"
                value={row.class}
                onChange={(e) => handleEditRow(row.id, e)}
                className="class-input"
              />
              <div><input
                type="time"
                value={row.time}
                onChange={(e) => handleEditTime(row.id, e)}
              />
              <button type="button" onClick={() => handleDeleteRow(row.id)}>
                Delete
              </button></div>
            </div>
          ))}
        </div>
        <button type="button" className="control" onClick={handleNewRow}>
          + Add row
        </button>
      </form>
      <dialog
        id="schedule-dialog"
        open={dialogOpen}
        onClick={() => setDialogOpen(false)}
      >
        <div id="schedule">
          <div>
            {rows.map(
              (row) =>
                !(row.time === "" && row.class === "") && (
                  <div className="schedule-row">
                    <div>{row.class}</div>
                    <div>{row.time}</div>
                  </div>
                ),
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;

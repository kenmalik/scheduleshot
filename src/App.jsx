import { useState } from "react";
import "./App.css";

let nextId = 1;

function App() {
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
    console.log(e);
  }

  return (
    <>
      <form onSubmit={handleViewSchedule}>
        <button type="submit" className="block">
          View Schedule
        </button>
        {rows.map((row, i) => (
          <div key={`row-${i}`}>
            <input
              type="text"
              value={row.class}
              onChange={(e) => handleEditRow(row.id, e)}
            />
            <input
              type="time"
              value={row.time}
              onChange={(e) => handleEditTime(row.id, e)}
            />
            <button type="button" onClick={() => handleDeleteRow(row.id)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" className="block" onClick={handleNewRow}>
          + Add row
        </button>
      </form>
    </>
  );
}

export default App;

import React from "react";

function Cell({ value, setValue, disabled = false }) {
  return (
    <td>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control"
        disabled={disabled}
      />
    </td>
  );
}

export default Cell;

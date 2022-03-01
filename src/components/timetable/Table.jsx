import React from "react";
import Cell from "./Cell";

function Table({ table = [[]], setTable }) {
  const handleDeleteCol = () => {
    let _table = [...table];

    // console.log(_table);
    setTable(_table);
  };

  const handleDeleteRow = () => {
    let _table = [...table];

    // console.log(_table);
    setTable(_table);
  };

  const setCellValue = (row, col, text) => {
    let _table = [...table];
    _table[row][col] = text;
    setTable(_table);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        {/* Head */}
        <thead>
          <tr>
            {table[0].map((col, index) => (
              <Cell
                key={`Cell-No.-${index}`}
                value={col}
                setValue={(text) => setCellValue(0, index, text)}
                disabled={index === 0}
              />
            ))}
            <td className="bg-light border-0">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDeleteRow}
              >
                Delete Row
              </button>
            </td>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {table.map(
            (row, index) =>
              index !== 0 && (
                <tr key={`Row-No.-${index}`}>
                  {row.map((col, i) => (
                    <Cell
                      key={`Cell-No.-${index}-${i}`}
                      value={col}
                      setValue={(text) => setCellValue(index, i, text)}
                    />
                  ))}
                </tr>
              )
          )}
          <tr className="table-borderless">
            <td>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDeleteCol}
              >
                Delete Col
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

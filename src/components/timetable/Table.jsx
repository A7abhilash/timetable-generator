import React from "react";
import Cell from "./Cell";

function Table({ table = [], setTable, showActionButtons }) {
  const handleDeleteCol = (index) => {
    let _table = table.map((row) => row.filter((_, i) => i !== index));

    // console.log(_table);
    setTable(_table);
  };

  const handleDeleteRow = (index) => {
    let _table = table.filter((_, i) => i !== index);

    // console.log(_table);
    setTable(_table);
  };

  const setCellValue = (row, col, text) => {
    // let _table = [...table];
    let _table = [];
    table.forEach((_row) => {
      let __row = [..._row];
      _table.push(__row);
    });
    // console.log(_table);
    _table[row][col] = text;
    setTable(_table);
  };

  return (
    <div className="table-responsive" id="table-gen">
      <table className="table table-bordered">
        {/* Head */}
        <thead>
          <tr>
            {table[0].map((col, index) => (
              <Cell
                key={`Cell-No.-${index}`}
                id={`Cell-No.-${index}`}
                value={col}
                setValue={(text) => setCellValue(0, index, text)}
                disabled={index === 0}
              />
            ))}
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
                      id={`Cell-No.-${index}-${i}`}
                      value={col}
                      setValue={(text) => setCellValue(index, i, text)}
                    />
                  ))}
                  {showActionButtons && (
                    <td className="bg-light border-0">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteRow(index)}
                      >
                        Delete Row
                      </button>
                    </td>
                  )}
                </tr>
              )
          )}

          {showActionButtons && (
            <tr className="table-borderless">
              {table[0].map((_, index) => (
                <td key={`Delete-col-${index}`}>
                  {index !== 0 ? (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteCol(index)}
                    >
                      Delete Column
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useState } from "react";
import { useEffect } from "react";
import Cell from "./Cell";

function Table({ table = [[]], setTable }) {
  //   useEffect(() => {
  //     setTable([
  //       ["Day\\Time", "8am-9am", "9am to 10am"],
  //       ["Monday", "Biology", "Maths"],
  //       ["Tuesday", "Physics", "Chemistry"],
  //     ]);
  //   }, []);

  const handleAddNewCol = () => {
    let _table = [...table];
    _table.forEach((row) => row.push(""));
    console.log(_table);
    setTable(_table);
  };

  const handleAddNewRow = () => {
    let _table = [...table];
    let _row = [];
    for (let i = 0; i < table[0].length; i++) {
      _row.push("");
    }
    _table.push(_row);
    console.log(_table);
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
              <button className="btn btn-sm btn-info" onClick={handleAddNewCol}>
                New Column
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
              <button className="btn btn-sm btn-info" onClick={handleAddNewRow}>
                New Row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

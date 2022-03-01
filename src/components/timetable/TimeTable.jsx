import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Table from "./Table";

function TimeTable() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { tid } = useParams();
  const history = useHistory();

  // original data
  const [data, setData] = useState(null);

  // changes
  const [name, setName] = useState("");
  const [table, setTable] = useState([[]]);

  const setInitialData = () => {
    console.log(data);
    setName(data.name);
    setTable(data.TT);
  };

  useEffect(() => {
    if (data) {
      setInitialData();
    }
  }, [data]);

  useEffect(() => {
    if (tid) {
      setLoading(true);
      const getCurrentTT = async () => {
        try {
          // get data
          let doc = await database.folders().doc(tid).get();
          if (doc.data()) {
            let _data = database.formatDocument(doc);
            if (_data.userId === currentUser.uid) {
              _data.TT = JSON.parse(_data.TT).data;
              setData(_data);
            } else {
              throw new Error("Invalid Access!!");
            }
          } else {
            throw new Error("404 Error!!");
          }
        } catch (error) {
          console.log(error.message);
          alert(error.message);
          history.goBack();
        } finally {
          setLoading(false);
        }
      };

      getCurrentTT();
    }
  }, [tid, currentUser]);

  const handleSaveTT = async () => {
    // console.log(table);
    setLoading(true);
    try {
      let _data = { ...data };
      _data.name = name;
      _data.TT = JSON.stringify({ data: table });
      delete _data.created;
      delete _data.id;
      // console.log(_data);
      await database.folders().doc(tid).set(_data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTT = async () => {
    setLoading(true);
    try {
      if (window.confirm("Are you sure to delete this TT?")) {
        await database.folders().doc(tid).delete();
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewCol = () => {
    let _table = [];
    table.forEach((row) => {
      let _row = [...row, ""];
      _table.push(_row);
    });
    // console.log(_table);
    setTable(_table);
  };

  const handleAddNewRow = () => {
    let _table = [...table];
    let _row = [];
    for (let i = 0; i < table[0].length; i++) {
      _row.push("");
    }
    _table.push(_row);
    // console.log(_table);
    setTable(_table);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="row m-2 m-md-5">
      <div className="col-md-3">
        {/* TT-Header */}
        <div className="pb-2 border-bottom">
          <label>TimeTable Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="TimeTable Name"
          />
          <em>
            <small>
              <strong>Created On:</strong>{" "}
              {new Date(data?.created).toDateString()}
            </small>
          </em>
        </div>

        {/* Changes Buttons */}
        <div className="py-2">
          <button className="btn btn-sm btn-info" onClick={handleAddNewCol}>
            New Column
          </button>
          <button
            className="btn ml-3 btn-sm btn-info"
            onClick={handleAddNewRow}
          >
            New Row
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-top">
          <button className="btn btn-sm btn-danger" onClick={handleDeleteTT}>
            Delete
          </button>
          <button
            className="mx-3 btn btn-sm btn-secondary"
            onClick={setInitialData}
          >
            Cancel
          </button>
          <button className="btn btn-sm btn-success" onClick={handleSaveTT}>
            Save Changes
          </button>
        </div>
      </div>
      <div className="col-md-9 rounded bg-light p-3">
        {/* TT */}
        <Table table={table} setTable={setTable} />
      </div>
    </div>
  );
}

export default TimeTable;

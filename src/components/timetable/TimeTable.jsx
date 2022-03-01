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

  const setInitialData = (_data) => {
    console.log(_data);
    setName(_data.name);
    setTable(_data.TT);
  };

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
              setInitialData(_data);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="row">
      <div className="col-md-12 mx-2 mx-md-auto my-2 my-md-5 rounded bg-light p-3">
        {/* TT-Header */}
        <div className="mb-2 d-block d-md-flex align-items-center justify-content-between border-bottom">
          <div>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="TimeTable Name"
            />
            <label>
              <em>
                <small>
                  <strong>Created On:</strong>{" "}
                  {new Date(data?.createdAt).toDateString()}
                </small>
              </em>
            </label>
          </div>
          <div style={{ marginTop: "-10px" }}>
            <button className="mx-2 btn btn-sm btn-outline-danger">
              Delete
            </button>
            <button
              className="mx-2 btn btn-sm btn-secondary"
              onClick={() => setInitialData(data)}
            >
              Cancel
            </button>
            <button className="mx-2 btn btn-sm btn-success">
              Save Changes
            </button>
          </div>
        </div>

        {/* TT */}
        <Table table={table} setTable={setTable} />
      </div>
    </div>
  );
}

export default TimeTable;

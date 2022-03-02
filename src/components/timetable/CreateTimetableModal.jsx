import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function CreateTimetableModal() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Empty fields not allowed!");
      return;
    }

    const newTT = {
      userId: currentUser.uid,
      name,
      createdAt: database.getCurrentTimestamp(),
      TT: JSON.stringify({ data: [["<h3>Day\\Time</h3>"]] }),
    };
    // console.log(newTT);

    let doc = await database.folders().add(newTT);
    // console.log(doc);
    setName("");
    history.push(`/tt/${doc.id}`);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info btn-sm"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        Create New TT
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Create New Timetable
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control my-2"
                placeholder="Year-Class-Section"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setName("")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTimetableModal;

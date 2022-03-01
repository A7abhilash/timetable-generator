import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import CreateTimetableModal from "./CreateTimetableModal";

function Dashboard() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const getFolders = async () => {
      try {
        setLoading(true);
        let res = await database
          .folders()
          .where("userId", "==", currentUser.uid)
          //   .orderBy("createdAt")
          .get();
        const data = res.docs.map((doc) => database.formatDocument(doc));
        console.log(data);
        setFolders(data);
        // return data;
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getFolders();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 bg-light p-2 rounded">
      <div className="pb-2 border-bottom d-flex align-items-center justify-content-between">
        <div>
          <h3 className="text-info">My Folders</h3>
        </div>
        <div>
          <CreateTimetableModal />
        </div>
      </div>
      <div className="my-2 d-flex flex-wrap">
        {folders.length ? (
          folders.map((item) => (
            <div key={item.id}>
              <Link
                to={`/tt/${item.id}`}
                className="text-decoration-none btn btn-outline-dark m-1"
              >
                <h6>{item.name}</h6>
                <small>{new Date(item.createdAt).toDateString()}</small>
              </Link>
            </div>
          ))
        ) : (
          <p className="small">No timetable created!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

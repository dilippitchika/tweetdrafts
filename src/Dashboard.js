import React, { useState } from "react";
import { getThreads } from "./methods";
import OpenThread from "./OpenThread";
import { encodeData, deleteThread } from "./APIhandler";
import { useToasts } from "react-toast-notifications";
import "./Dashboard.css";

function ThreadCard(props) {
  const meta = props.element;
  const tweets = Object.keys(meta.fields).length - 2;
  const title = meta.fields["Thread title"];
  const id = meta.id;
  const { addToast } = useToasts();
  const intoThread = () => {
    props.callback(id, meta);
    console.log(id);
  };
  const removeCallback = props.removeCallback;
  const removeToast = (messageType) => {
    addToast(messageType, {
      appearance: "info",
      autoDismiss: true,
    });
  };
  const removeThread = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    deleteThread(id, props.airtable_keys, removeCallback, removeToast);
  };

  return (
    <div className="col-md-6 thread-cell">
      <div className="thread-card" onClick={intoThread}>
        <div className="row">
          <div className="col-md-10 col-sm-10 col-xs-10">
            <h3>{title}</h3>
            <p>{tweets} tweets</p>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2">
            <button onClick={removeThread} className="thread-button">
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllThreads(props) {
  const thread_lists = props.thread_lists;
  const listItems = thread_lists.map((element) => (
    <ThreadCard
      element={element}
      callback={props.callback}
      airtable_keys={props.airtable_keys}
      removeCallback={props.removeThread}
    />
  ));
  return <div className="row justify-content-between">{listItems}</div>;
}

function Dashboard(props) {
  const data = props.data;
  const [thread_lists, update_thread_lists] = useState(data.records);
  const base_table = encodeData(
    props.airtable_keys.base,
    props.airtable_keys.table
  );

  const createThread = () => {
    seeThread("create");
  };
  const [dashState, seeThread] = useState("dashboard");
  const updateThreadList = (status, data, message) => {
    if (status === 200) {
      update_thread_lists(data.records);
    }
  };

  const [thread_meta, setThreadData] = useState({});
  const openThread = (id, meta) => {
    seeThread(id);
    if (meta) {
      setThreadData(meta);
    } else if (id === "dashboard") {
      getThreads(base_table, props.airtable_keys.api_key, updateThreadList);
    }
  };
  if (dashState === "dashboard") {
    return (
      <div className="dashboard">
        <nav class="navbar navbar-dashboard">
          <span class="navbar-brand mb-0 h1 logo-text">Tweetdrafts</span>
          <button className="btn btn-primary" onClick={createThread}>
            Create thread
          </button>
        </nav>
        <div className="container thread-container">
          <AllThreads
            thread_lists={thread_lists}
            callback={openThread}
            airtable_keys={props.airtable_keys}
            removeThread={updateThreadList}
          />
        </div>
      </div>
    );
  } else if (dashState === "create") {
    return (
      <div className="dashboard">
        <OpenThread
          thread_id={""}
          goBack={openThread}
          thread_meta={{}}
          airtable_keys={props.airtable_keys}
        />
      </div>
    );
  } else {
    return (
      <div className="dashboard">
        <OpenThread
          thread_id={dashState}
          goBack={openThread}
          thread_meta={thread_meta}
          airtable_keys={props.airtable_keys}
        ></OpenThread>
      </div>
    );
  }
}

export default Dashboard;

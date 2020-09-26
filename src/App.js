import React, { useState } from "react";
import "./App.css";
import AirtableForm from "./LoginForm";
import { getThreads } from "./methods";
import { encodeData } from "./APIhandler";
import Dashboard from "./Dashboard";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [airtable_auth, set_airtable_auth] = useState(false);
  const airtable_details = {
    base: "",
    api_key: "",
    table: "",
  };

  const [error_message, set_error] = useState("");
  const [airtable_data, set_airtable_data] = useState({});
  const [base, set_base] = useState("");
  const [api_key, set_api_key] = useState("");
  const [table, set_table] = useState("");

  const handleThreads = (status, data, message) => {
    if (status === 200) {
      set_airtable_data(data);
      set_airtable_auth(true);
    } else {
      set_error(message);
    }
  };

  const setDetails = (base, api_key, table) => {
    set_base(base);
    set_api_key(api_key);
    set_table(table);
    let base_table = encodeData(base, table);
    getThreads(base_table, api_key, handleThreads);
  };

  airtable_details.base = base;
  airtable_details.api_key = api_key;
  airtable_details.table = table;

  return (
    <div>
      <ToastProvider>
        <div className="App">
          {airtable_auth ? (
            <Dashboard
              data={airtable_data}
              airtable_keys={airtable_details}
            ></Dashboard>
          ) : (
            <AirtableForm
              setDetails={setDetails}
              error_message={error_message}
            ></AirtableForm>
          )}
        </div>
      </ToastProvider>
    </div>
  );
}

export default App;

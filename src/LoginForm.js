import React, { useState } from "react";
import "./LoginForm.css";
function AirtableForm(props) {
  const [base, setBase] = useState("");
  const [api_key, setApi_key] = useState("");
  const [table, setTable] = useState("Table 1");
  const changeBase = (e) => {
    setBase(e.target.value);
  };
  const changeApi_key = (e) => {
    setApi_key(e.target.value);
  };
  const changeTable = (e) => {
    setTable(e.target.value);
  };

  const update_details = (e) => {
    e.preventDefault();
    if (!base || !api_key || !table) return;
    props.setDetails(base, api_key, table);
    // setBase("");
    // setTable("Table 1");
    // setApi_key("");
  };
  return (
    <div className="jumbotron">
      <div className="container">
        <h3>Tweetdrafts</h3>
        <form onSubmit={update_details}>
          <div className="form-group">
            <label htmlFor="base">Airtable base</label>
            <input
              id="username"
              autoComplete="username"
              className="form-control"
              type="text"
              id="base"
              value={base}
              onChange={changeBase}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="table">Table name</label>
            <input
              className="form-control"
              type="text"
              id="table"
              value={table}
              onChange={changeTable}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="api_key">Airtable API key</label>
            <input
              id="api_key"
              className="form-control"
              type="password"
              value={api_key}
              onChange={changeApi_key}
            ></input>
          </div>
          {props.error_message ? (
            <p className="error-message">{props.error_message}</p>
          ) : null}
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AirtableForm;

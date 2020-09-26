import React from "react";
import axios from "axios";

const getThreads = (base_table, api_key, callback) => {
  var config = {
    method: "get",
    url:
      "https://api.airtable.com/v0/" +
      base_table +
      "?sort%5B0%5D%5Bfield%5D=Updated+time&sort%5B0%5D%5Bdirection%5D=desc",
    headers: {
      Authorization: "Bearer " + api_key,
    },
  };
  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      callback(response.status, response.data, "");
    })
    .catch(function (error) {
      callback(error.status, error, error.message);
    });
};

const createThreadAirtable = (base_table, api_key, data, callback) => {
  var config = {
    method: "post",
    url: "https://api.airtable.com/v0/" + base_table,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_key,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      callback("Thread created");
    })
    .catch(function (error) {
      callback("Error occured");
    });
};

const updateThreadAirtable = (base_table, api_key, data, callback) => {
  var config = {
    method: "patch",
    url: "https://api.airtable.com/v0/" + base_table,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_key,
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      callback("Thread updated");
    })
    .catch(function (error) {
      callback("Error occured");
    });
};

const deleteThreadAirtable = (
  base_table,
  api_key,
  record_id,
  callback,
  toast
) => {
  var config = {
    method: "delete",
    url: "https://api.airtable.com/v0/" + base_table + "/" + record_id,
    headers: {
      Authorization: "Bearer " + api_key,
    },
  };

  axios(config)
    .then(function (response) {
      getThreads(base_table, api_key, callback);
      toast("Thread deleted");
    })
    .catch(function (error) {
      toast("Error occured");
    });
};

export {
  getThreads,
  createThreadAirtable,
  updateThreadAirtable,
  deleteThreadAirtable,
};

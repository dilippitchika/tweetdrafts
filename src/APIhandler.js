import {
  createThreadAirtable,
  updateThreadAirtable,
  deleteThreadAirtable,
} from "./methods";

const encodeData = (base, table) => {
  let toEncode = base + "/" + table;
  let encodedValue = encodeURI(toEncode);
  return encodedValue;
};

const updateThread = (id, data, airtable_keys, callback) => {
  const update_data = {};
  const record_data = {};
  const keys = Object.keys(data);
  record_data["Thread title"] = data["Thread title"];
  for (var i = 0; i < 30; i++) {
    let tweet_str = "Tweet" + (i + 1).toString();
    record_data[tweet_str] = "";
  }
  for (var j = 0; j < keys.length - 1; j++) {
    let tweet_str = "Tweet" + (j + 1).toString();
    record_data[tweet_str] = data[tweet_str];
  }
  update_data["records"] = [
    {
      id: id,
      fields: record_data,
    },
  ];
  const base = airtable_keys.base;
  const table = airtable_keys.table;
  const api_key = airtable_keys.api_key;
  const base_table = encodeData(base, table);
  updateThreadAirtable(base_table, api_key, update_data, callback);
};

const createThread = (data, airtable_keys, callback) => {
  const create_data = {};
  create_data["records"] = [{ fields: data }];
  const base = airtable_keys.base;
  const table = airtable_keys.table;
  const api_key = airtable_keys.api_key;
  const base_table = encodeData(base, table);
  createThreadAirtable(base_table, api_key, create_data, callback);
};

const deleteThread = (id, airtable_keys, callback, toast) => {
  const base = airtable_keys.base;
  const table = airtable_keys.table;
  const api_key = airtable_keys.api_key;
  const base_table = encodeData(base, table);
  deleteThreadAirtable(base_table, api_key, id, callback, toast);
};

export { encodeData, updateThread, createThread, deleteThread };

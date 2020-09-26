import React from "react";
import Tweetlist from "./RenderTweets";
import "./OpenThread.css";

function OpenThread(props) {
  const meta = props.thread_meta;
  let title = "Create thread";
  let all_keys = [];
  let tweet_nos = [];
  if (Object.keys(meta).length > 0) {
    title = meta.fields["Thread title"];
    all_keys = Object.keys(meta.fields);
    tweet_nos = all_keys.filter((key) => key.includes("Tweet"));
  }
  const backEvent = () => {
    props.goBack("dashboard", "");
  };

  return (
    <div>
      <nav class="navbar navbar-dashboard">
        <button onClick={backEvent} className="back-button">
          <i class="fa fa-chevron-left"></i>
        </button>
        <span class="logo-text">{title}</span>
      </nav>
      <Tweetlist
        meta={meta}
        tweet_nos={tweet_nos}
        airtable_keys={props.airtable_keys}
      />
    </div>
  );
}

export default OpenThread;

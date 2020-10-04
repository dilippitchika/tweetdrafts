import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateThread, createThread } from "./APIhandler";
import "./RenderTweets.css";
import TextareaAutosize from "react-textarea-autosize";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
const LimitedTextarea = ({
  rows,
  cols,
  value,
  limit,
  register,
  name,
  id,
  removeTweet,
  handleInputChange,
  errors,
}) => {
  const tweet_no = "Tweet " + (id + 1).toString();
  const handleRemove = (id) => {
    removeTweet(id);
  };
  const changeText = (e) => {
    handleInputChange(e.target.value, id);
  };

  const copyText = () => {
    const copyValue = value;
    console.log(value);
    document.execCommand("copy");
  };

  return (
    <div className="tweet-config">
      <div className="d-flex justify-content-between tweet-nav">
        <div className="d-flex">
          <p className="tweet-title">{tweet_no}</p>
          <CopyToClipboard text={value} onCopy={() => console.log("copied")}>
            <button type="button" className="tweet-remove">
              <i className="fa fa-copy" />
            </button>
          </CopyToClipboard>
        </div>
        <button
          type="button"
          className="tweet-remove"
          onClick={() => handleRemove(id)}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
      <TextareaAutosize
        minRows={4}
        cols={cols}
        onChange={changeText}
        value={value}
        name={name}
        ref={register}
        id={id}
        maxLength="280"
        className="form-control tweet-area"
      />
      <p className="limit-info">{value.length}/280</p>
    </div>
  );
};

function Tweetlist(props) {
  const { addToast } = useToasts();
  const meta = props.meta;
  const airtable_keys = props.airtable_keys;
  let tweet_nos = [];
  let title_found = "";
  let uid = "";
  if (Object.keys(meta).length > 0) {
    tweet_nos = props.tweet_nos;
    title_found = meta.fields["Thread title"];
    uid = meta.id;
  }
  const { register, handleSubmit } = useForm();
  const tweet_lists = [];
  for (var j = 0; j < tweet_nos.length; j++) {
    let key2 = "Tweet" + (j + 1).toString();
    tweet_lists.push(meta.fields[key2]);
  }

  const [tweets_datas, update_tweets_datas] = useState(tweet_lists);
  const handleInputChange = (value, id) => {
    const updated_tweets = [...tweets_datas];
    updated_tweets[id] = value;
    update_tweets_datas(updated_tweets);
  };
  const removeTweet = (id) => {
    const updated_tweets = [...tweets_datas];
    updated_tweets.splice(id, 1);
    update_tweets_datas(updated_tweets);
  };

  const showToast = (messageType) => {
    addToast(messageType, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };

  const onSubmit = (data) => {
    if (uid !== "") {
      updateThread(uid, data, airtable_keys, showToast);
    } else {
      createThread(data, airtable_keys, showToast);
    }
  };

  const addTweet = () => {
    const new_tweet = "";
    const newTweets = [...tweets_datas, new_tweet];
    update_tweets_datas(newTweets);
  };

  return (
    <div>
      <div className="container all-tweets">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between thread-intro">
            <h3>Thread details</h3>
            <button type="submit" className="btn btn-primary">
              Save thread
            </button>
          </div>
          <label className="title-label">Thread title</label>
          <input
            name="Thread title"
            defaultValue={title_found}
            className="form-control title-input"
            ref={register}
          />
          <p>
            <b>All tweets</b>
          </p>
          {tweets_datas.map((value, index) => (
            <LimitedTextarea
              limit={280}
              value={value}
              className="form-control"
              name={"Tweet" + (index + 1).toString()}
              id={index}
              register={register}
              removeTweet={removeTweet}
              handleInputChange={handleInputChange}
            />
          ))}
          <button type="button" onClick={addTweet} className="btn btn-primary">
            Add tweet
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tweetlist;

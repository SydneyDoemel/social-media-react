import React, { Component, useState } from "react";
import { NavigationArrow } from "phosphor-react";
export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input
            type="hidden"
            defaultValue={this.props.user.username}
            ref={(defaultValue) => (this._author = defaultValue)}
          ></input>
          <textarea
            placeholder="SoundOff in the comments..."
            rows="1"
            required
            ref={(textarea) => (this._body = textarea)}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit" className="btn send-btn">
            <NavigationArrow size={28} mirrored={true} />
          </button>
        </div>
      </form>
    );
  }
}

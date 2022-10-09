import React, { Component } from 'react'
import Comment from './Comment';
import CommentForm from './CommentForm';
import { CaretUp, CaretDown } from 'phosphor-react';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

export default class CommentBox extends Component {

    constructor() {
      super();
      
      this.state = {
        showComments: false,
        comments: []
      };
    }

    _addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        author,
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }
    _delComment(comment_id) {
      for (let x of this.state.comments){
        console.log(x)
        if (x.id === comment_id){
          console.log('match')
          let newArray = this.state.comments.filter(function(f) { return f !== x })
          this.setState({comments: newArray})
        }
      }
      console.log(this.state.comments)
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      return this.state.comments.map((comment) => { 
        return (
          <Comment
            author={comment.author} 
            body={comment.body} 
            key={comment.id} 
            delete_comment={this._delComment.bind(this)}/>
        ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = <CaretUp size={30} color='white'/>;
      
      if (this.state.showComments) {
        buttonText = <CaretDown size={30} color='white'/>;
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <CommentForm user={this.props.user} addComment={this._addComment.bind(this)}/>
          <div className='d-flex flex-row align-items-baseline mt-2'>
          <h6 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h6>
          <button className='btn show-comments-btn' id="comment-reveal" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          </div>
          {commentNodes}
        </div>  
      );
    } // end render
    
   
  } 
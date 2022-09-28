import React, { Component } from 'react'

export default class Comment extends Component {
        _deleteComment() {
          alert("-- DELETE Comment Functionality COMMING SOON...");
        }
        render () {
          return(
            <div className="comment">
              <div className='d-flex flex-row align-items-start'>
              <p className="comment-header"><b>{this.props.author}</b></p>
              <p className="comment-body"> - {this.props.body}</p>
              
              <div className="comment-footer ms-auto">
                <button className="btn btn-sm btn-danger comment-footer-delete" onClick={this.props.delete_comment(this.props.key)}>Delete</button>
              </div>
              </div>
            </div>
          );
        }
        
      }
      
      
      

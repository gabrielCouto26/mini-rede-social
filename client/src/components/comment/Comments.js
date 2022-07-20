import { Component } from "react";
import Comment from "./Comment";

export default class Comments extends Component {
  render(){
    return(
      <>
        <small style={{fontSize: '.75em'}}>
          Comentários { this.props.comments.length }
        </small>
        <div className="border border-secondary rounded">
          { this.props.comments.map((comment, index) => {
            return <Comment 
              comment={comment}
              key={index} 
            />
          }) }
        </div>
      </>
    )
  }
}
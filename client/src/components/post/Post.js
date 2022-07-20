import axios from 'axios';
import { Component } from "react";
import { Card, Stack } from "react-bootstrap";
import CommentContainer from '../comment/CommentContainer';

import Comments from "../comment/Comments";

export default class Post extends Component {
  state = {
    isLiked: false
  }
  componentDidMount(){
    const userId = this.props.user.id
    if(this.isLiked(userId))
      this.setState({ isLiked: true })
    else
      this.setState({ isLiked: false })
  }
  isLiked = (userId) => {
    if(this.props.post.likes === null) return false
    return this.props.post.likes.includes(userId)
  }
  handleLike = async (e) => {
    const userId = this.props.user.id
    const { id } = this.props.post
    if(this.state.isLiked){
      await this.unlike(id, userId)
      this.setState({ isLiked: false })
    } else{
      await this.like(id, userId)
      this.setState({ isLiked: true })
    }
  }
  like = async (postId, userId) => {
    await axios.post(
      `http://localhost:4000/posts/${postId}/like/${userId}`
    )
  }
  unlike = async (postId, userId) => {
    await axios.post(
      `http://localhost:4000/posts/${postId}/unlike/${userId}`
    )
  }
  render(){
    const { user, title, content, comments } = this.props.post
    return(
      <Card>
        <Card.Header>
          <Stack direction="horizontal">
            <div>
              <i className="bi bi-person-circle me-1" title="Foto Perfil" />
              <span>{ user.name }</span>
              <small 
                className="mx-2 text-muted"
                style={{fontSize: '.75em'}}
              >
                18/07/2022
              </small>
            </div>
            <div className="ms-auto">
              <i 
                title="Curtir Post"
                className={this.state.isLiked ? "bi bi-suit-heart-fill" : "bi bi-suit-heart" }
                style={this.state.isLiked ? { color: "red" } : {}}
                onClick={this.handleLike.bind(this)}
              />
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>{ title }</Card.Title>
          <Card.Body>{ content }</Card.Body>
          <Comments comments={ comments } />
          <CommentContainer 
            user={this.props.user}
            post={this.props.post}
          />
        </Card.Body>
      </Card>
    )
  }
}
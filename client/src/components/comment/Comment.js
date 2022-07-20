import axios from 'axios';
import { Component } from "react";
import { Card, Stack } from "react-bootstrap";

export default class Comment extends Component {
  state = {
    isLiked: false
  }
  componentDidMount(){
    const userId = this.props.comment.user.id
    if(this.isLiked(userId))
      this.setState({isLiked: true})
    else 
      this.setState({isLiked: false})
  }
  isLiked = (userId) => {
    if(this.props.comment.likes === null) return false
    return this.props.comment.likes.includes(userId)
  }
  handleLike = async (e) => {
    const { id, user } = this.props.comment
    if(this.isLiked(user.id)){
      await this.unlike(id, user.id)
      this.setState({ isLiked: false })
    } else {
      await this.like(id, user.id)
      this.setState({ isLiked: true })
    }
  }
  like = async (commentId, userId) => {
    await axios.post(
      `http://localhost:4000/comments/${commentId}/like/${userId}`
    )
  }
  unlike = async (commentId, userId) => {
    await axios.post(
      `http://localhost:4000/comments/${commentId}/unlike/${userId}`
    )
  }
  render(){
    const { name } = this.props.comment.user
    return(
      <Card>
        <Stack direction="horizontal" className="mx-2">
          <Card.Title style={{fontSize: '1em'}}>
            { name }
          </Card.Title>
          <div className="ms-auto">
            <i 
              title="Curtir Comentário"
              className={this.state.isLiked ? "bi bi-suit-heart-fill" : "bi bi-suit-heart"}
              style={this.state.isLiked ? { color: "red" } : {}}
              onClick={this.handleLike.bind(this)}
            />
          </div>
        </Stack>
        <Card.Text className="mx-3 my-1" style={{fontSize: '.75em'}}>
          { this.props.comment.content }
        </Card.Text>
      </Card>
    )
  }
}
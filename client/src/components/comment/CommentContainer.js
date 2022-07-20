import axios from 'axios';
import { Component } from "react";
import { Button, Form, Stack } from "react-bootstrap";


export default class CommentContainer extends Component {
  state = {
    content: ""
  }
  clearInputs = () => {
    document.querySelectorAll(".commentContainer input").forEach(elem => elem.value = "")
  }
  handleChange = (e) => {
    this.setState({ content: e.target.value })
  }
  handleComment = async (e) => {
    e.preventDefault()
    const { content } = this.state
    const userId = this.props.user.id
    const postId = this.props.post.id
    if(content){
      await axios.post(
        `http://localhost:4000/users/${userId}/posts/${postId}/comments`,
        { content }
      )
      this.clearInputs(e)
    }
  }
  render(){
    return(
      <Form className="mt-1 commentContainer">
        <Form.Group>
          <Stack direction="horizontal">
            <Form.Control
              onChange={this.handleChange.bind(this)}
              size="sm"
              type="text"
              placeholder="Adicione um comentário"
            />
            <Button
              onClick={this.handleComment.bind(this)}
              variant="primary"
              type="submit"
              size="sm"
            >
              Publicar
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    )
  }
}
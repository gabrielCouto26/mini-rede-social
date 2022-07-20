import axios from "axios";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class PostContainer extends Component {
  state = {
    title: "",
    content: "",
    invalidInputs: false,
    success: false
  }
  clearInputs = () => {
    document.querySelector(".postContainer input").value = ""
    document.querySelector(".postContainer textarea").value = ""
  }
  handleTitleChange = (e) => this.setState({title: e.target.value})
  handleContentChange = (e) => this.setState({content: e.target.value})
  handlePublish = async (e) => {
    const { title, content } = this.state
    if(!title || !content){
      this.setState({ invalidInputs: true })
    } else {
      this.clearInputs()
      await axios.post(`http://localhost:4000/users/${this.props.user.id}/posts`, {
        title: this.state.title,
        content: this.state.content
      })
      this.setState({ invalidInputs: false, success: true })
    }
  }
  render(){
    return(
      <div className="mb-4 d-grid">
        <Form className="mb-1 postContainer">
          <Form.Group className="mb-1">
            <Form.Control 
              type="text"
              placeholder="Adicione um título"
              onChange={this.handleTitleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control 
              as="textarea"
              rows={3}
              placeholder="Crie uma publicação"
              onChange={this.handleContentChange.bind(this)}
            />
          </Form.Group>
          { this.state.invalidInputs && <small style={{color: "red"}}>Preencha todos os campos</small> }
          { this.state.success && <small style={{color: "green"}}>Sucesso! </small> }
        </Form>
        <Button variant="primary" size="sm" onClick={this.handlePublish.bind(this)}>
          Publicar
        </Button>
      </div>
    )
  }
}
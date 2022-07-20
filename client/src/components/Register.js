import axios from "axios";
import { Component } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    registered: false,
    shouldRedirect: false,
    invalidInputs: false
  }
  handleNameChange = (e) => this.setState({ name: e.target.value })
  handleEmailChange = (e) => this.setState({ email: e.target.value })
  handlePasswordChange = (e) => this.setState({ password: e.target.value })
  handleRegister = async (e) => {
    e.preventDefault()
    const { name, email, password } = this.state
    if(!name || !email || !password){
      this.setState({ invalidInputs: true, shouldRedirect: false })
    } else {
      await axios.post("http://localhost:4000/register",
        { name, email, password } 
      ).then(res => {
        if(res.status === 204)
          this.setState({ shouldRedirect: true })
        else if(res.status === 200)
          this.setState({ registered: true })
      }).catch(e => {
        this.setState({ invalidInputs: true })
      })
    }
    
  }
  render(){
    return(
      <Stack>
        <h1>Cadastro</h1>
        <Form className="mt-4">
          { this.state.registered && <p style={{color: "red"}}>Usuário já cadastrado</p> }
          { this.state.invalidInputs && <small style={{color: "red"}}>Preencha todos os campos</small> }
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Seu nome"
              onChange={this.handleNameChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu email de preferência"
              onChange={this.handleEmailChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Uma senha forte"
              onChange={this.handlePasswordChange.bind(this)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleRegister}>
            Cadastrar
          </Button>
        </Form>

        <p className="mt-4">Já é cadastrado? Faça login <Link to="/">aqui</Link>.</p>

        { this.state.shouldRedirect && <Navigate replace to="/" />}
      </Stack>
    )
  }
}
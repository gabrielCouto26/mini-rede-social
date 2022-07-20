import axios from "axios";
import { Component } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";


export default class Login extends Component {
  state = {
    userId: "",
    email: "",
    password: "",
    registered: true,
    shouldRedirect: false,
    invalidInputs: false
  }
  handleEmailChange = (e) => this.setState({ email: e.target.value })
  handlePasswordChange = (e) => this.setState({ password: e.target.value })
  handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = this.state
    if(!email || !password){
      this.setState({ invalidInputs: true, shouldRedirect: false })
    } else {
      await axios.post("http://localhost:4000/login",
        { email, password }
      ).then(({ data }) => {
        this.setState({ userId: data.user_id, shouldRedirect: true })
      }).catch(e => {
        this.setState({ registered: false })
      })
    }
  }
  render(){
    return(
      <Stack>
        <h1>Login</h1>
        <Form className="mt-4">
          { !this.state.registered && <p style={{color: "red"}}>Usuário não cadastrado</p> }
          { this.state.invalidInputs && <small style={{color: "red"}}>Preencha todos os campos</small> }
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Insira o email cadastrado"
              onChange={this.handleEmailChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insira a senha cadastrada"
              onChange={this.handlePasswordChange.bind(this)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleLogin.bind(this)}>
            Entrar
          </Button>
        </Form>

        <p className="mt-4">Ainda não é cadastrado? Cadastre-se <Link to="/register">aqui</Link>.</p>

        { this.state.shouldRedirect && <Navigate replace to={`/home/${this.state.userId}`} />}
      </Stack>
    )
  }
}
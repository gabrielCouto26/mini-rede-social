import axios from "axios";
import { Component } from "react";
import { Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import ListFollow from "./ListFollow";
export default class PageProfile extends Component {
  state = {
    user: {}
  }
  async componentDidMount(){
    const user = await this.getUser();
    this.setState({ user })
  }
  getUser = async () => {
    const userId = window.location.pathname.split('/')[2];
    const { data } = await axios.get(`http://localhost:4000/users/${userId}`);
    return data;
  }
  render(){
    const { id, name, email, following, followers } = this.state.user
    return(
      <div>
        <h3 className="mb-3">Perfil</h3>
        <Stack gap={5} direction="horizontal" className="mb-4">
          <i
            className="bi bi-person-circle"
            style={{fontSize: '5em', color: "black"}}
          />
          <div className="text-bottom">
            <h5>{ name }</h5>
            <small>{ email }</small>
          </div>
        </Stack>
        <Row className="mb-4">
          <Col>
            <p>Seguindo { following?.length || 0 }</p>
            <ListFollow users={following} />
          </Col>
          <Col>
            <p>Seguidores { followers?.length || 0 }</p>
            <ListFollow users={followers} />
          </Col>
        </Row>
        <Link to={`/home/${id}`}>
          { '< Página inicial' }
        </Link>
      </div>
    )
  }
}
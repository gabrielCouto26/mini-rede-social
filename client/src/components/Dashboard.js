import { Component } from "react";
import { Row, Col, Stack } from "react-bootstrap";

import Feed from "./Feed";
import PostContainer from "./post/PostContainer";
import SideProfile from "./profile/SideProfile";
import ListProfiles from "./profile/ListProfiles";

import axios from "axios";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    currentUser: {},
    users: [],
    posts: []
  }
  async componentDidMount(){
    const currentUserId = window.location.pathname.split('/')[2]
    const currentUser = await this.getUser(currentUserId)
    const users = await this.getUsers(currentUserId)
    const posts = await this.getPosts(currentUserId)
    this.setState({ currentUser, users, posts })
  }
  getUser = async (currentUserId) => {
    const { data } = await axios.get(`http://localhost:4000/users/${currentUserId}`);
    return data;
  }
  getUsers = async (currentUserId) => {
    const { data } = await axios.get('http://localhost:4000/users');
    return data.filter(user => user.id !== Number(currentUserId));
  }
  getPosts = async (currentUserId) => {
    const { data } = await axios.get(`http://localhost:4000/home/${currentUserId}`);
    return data;
  }
  render(){
    return (
      <div>
        <Stack direction="horizontal">
          <h3 className="mb-3">Página Inicial</h3>
          <Link to="/" className="ms-auto">Sair</Link>
        </Stack>
        <Row>
          <Col>
            <Stack gap={5} className="text-center">
              <SideProfile user={this.state.currentUser} />
              <ListProfiles
                user={this.state.currentUser}
                users={this.state.users}
              />
            </Stack>
          </Col>
          <Col xs={9}>
            <PostContainer user={this.state.currentUser} />
            <Feed 
              user={this.state.currentUser}
              posts={this.state.posts}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
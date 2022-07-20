import axios from 'axios'
import { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class ListProfile extends Component {
  state = {
    isFollowing: false
  }
  componentDidMount(){
    const userId = this.props.user.id
    if(this.isFollowing(userId))
      this.setState({ isFollowing: true })
    else
      this.setState({ isFollowing: false })
  }
  isFollowing = (targetId) => {
    const { currentUser } = this.props;

    if(currentUser.following === null)
      return false;
    
    for(let u of currentUser.following){
      if(u.id === Number(targetId))
        return true
    }
    return false
  }
  handleFollow = async (e) => {
    const { currentUser } = this.props
    const targetId = e.target.id

    if(this.isFollowing(targetId)){
      this.setState({ isFollowing: false })
      await this.unfollow(currentUser.id, targetId)
    } else {
      this.setState({ isFollowing: true })
      await this.follow(currentUser.id, targetId)
    }
  }
  follow = async (userId, targetId) => {
    await axios.post(
      `http://localhost:4000/users/${userId}/follow/${targetId}`
    )
  }
  unfollow = async (userId, targetId) => {
    await axios.post(
      `http://localhost:4000/users/${userId}/unfollow/${targetId}`
    )
  }
  render(){
    const { id, name } = this.props.user
    return(
      <ListGroup.Item>
        <div style={{position: "relative"}}>
          <i 
            id={id}
            className={this.state.isFollowing ? "bi bi-person-x-fill" : "bi bi-person-plus-fill"}
            title="Adicionar"
            style={{
              color: this.state.isFollowing ? "red" : "blue",
              fontSize: "1.25em",
              position: "absolute",
              right: "-10px",
              top: "-10px"
            }}
            onClick={this.handleFollow.bind(this)}
          />
          <div className="mt-1">
            <i 
              className="bi bi-person-circle d-block"
              style={{fontSize: '2.5em'}}
            />
            <small style={{fontSize: '.75em'}}>{ name }</small>
          </div>
        </div>
      </ListGroup.Item>
    )
  }
}
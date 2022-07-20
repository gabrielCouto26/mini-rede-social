import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import ListProfile from "./ListProfile";

export default class ListProfiles extends Component {
  render(){
    return(
      <ListGroup>
        <p style={{fontSize: '.75em'}} className="mb-1">
          Outros usuários
        </p>
        { this.props.users.map((user, index) => {
          return(
            <ListProfile
              currentUser={this.props.user}
              user={user}
              key={index}
            />
          )
        }) }
      </ListGroup>
    )
  }
}
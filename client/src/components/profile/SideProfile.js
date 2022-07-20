import { Component } from "react";
import { Link } from "react-router-dom";

export default class SideProfile extends Component {
  render(){
    const { user } = this.props
    return(
      <div>
        <Link to={`/users/${user.id}`}>
          <i
            className="bi bi-person-circle"
            style={{fontSize: '4em', color: "black"}}
          />
        </Link>
        <h5>{ user.name }</h5>
      </div>
    )
  }
}
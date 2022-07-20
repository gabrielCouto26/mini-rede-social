import { Component } from "react";
import { ListGroup, Stack } from "react-bootstrap";

export default class ListFollow extends Component {
  render(){
    return(
      <ListGroup>
        { this.props.users?.map((user, index) => {
          return (
            <a
              href={`/users/${user.id}`}
              style={{textDecoration: 'none'}}
              key={index}
            >
              <ListGroup.Item>
                <Stack>
                  <i
                    id={user.id}
                    className="bi bi-person-circle"
                    style={{fontSize: '1em', color: "black"}}
                  />
                  <span>{ user.name }</span>
                  <small>{ user.email }</small>
                </Stack>
              </ListGroup.Item>
            </a>
          )
        }) }
      </ListGroup>
    )
  }
}
import { Component } from "react";
import { Stack } from "react-bootstrap";

import Post from "./post/Post";
export default class Feed extends Component {
  render(){
    return (
      <Stack gap={2}>
        { this.props.posts.map((post, index) => {
          return <Post
            user={this.props.user}
            post={post}
            key={index}
          />
        }) }
      </Stack>
    )
  }
}
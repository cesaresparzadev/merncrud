import React, { Component } from "react";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    fetch("/api/private/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Response not ok");
      })
      .then((response) => this.setState({ courses: response.courses }))
      .catch((error) => this.setState({ message: error.message }));
  }
  render() {
    return (
      <ul>
        {this.state.courses.map((course) => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    );
  }
}

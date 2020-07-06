import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";

class ProgressionBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <ProgressBar
          variant="danger"
          now={80}
          style={{ visibility: "hidden" }}
        />
      </div>
    );
  }
}

export default ProgressionBar;

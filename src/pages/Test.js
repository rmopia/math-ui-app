import React, { Component } from "react";

const mathsteps = require("mathsteps");

const steps = mathsteps.simplifyExpression("3x - 9(x + 1) - (-5)");

class Test extends Component {
  constructor(props) {
    super(props);
  }

  doThing() {
    steps.forEach((step) => {
      console.log("before change: " + step.oldNode.toString()); // before change: 2 x + 2 x + x + x
      console.log("change: " + step.changeType); // change: ADD_POLYNOMIAL_TERMS
      console.log("after change: " + step.newNode.toString()); // after change: 6 x
      console.log("# of substeps: " + step.substeps.length); // # of substeps: 3
    });
  }

  componentDidMount() {
    this.doThing();
  }

  state = {};
  render() {
    return (
      <div>
        <h1 className="text-center">Test</h1>
        <p className="text-center">3x - 9(x + 1) - (-5)</p>
      </div>
    );
  }
}

export default Test;

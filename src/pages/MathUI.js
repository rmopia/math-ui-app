import React, { Component } from "react";
import InputRow from "../components/InputRow";
import "./MathUI.css";

/* npm install... bootstrap, react-router, react-router-dom 
& react-bootstrap if you have any problems running the app */

class MathUI extends Component {
  constructor(props) {
    super(props);
    this.handleInitInputChange = this.handleInitInputChange.bind(this);
    this.rowCreation = this.rowCreation.bind(this);
    this.tabElementListCreator = this.tabElementListCreator.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      rowList: [],
      problem: "",
      initBool: false,
      tabElementList: [],
      limitLength: 0,
    };
  }

  handleInitInputChange(e) {
    this.setState({ problem: e.target.value });
  }

  /* for the sake of variety and checking different types of problems 
  randomIndex() {
    let min = 0;
    let max = Math.floor(this.state.problemList.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }*/

  /* creates new input row component */
  rowCreation() {
    let child = [];

    child.push(
      <InputRow
        rowCreation={this.rowCreation}
        limitLength={this.state.limitLength}
        tabElementList={this.state.tabElementList}
        probType={1}
        problem={this.state.problem}
      />
    );

    this.setState({
      rowList: [...this.state.rowList, child],
    });
  }

  async handleSubmit() {
    const result = await this.tabElementListCreator();
    console.log(result);
    // wait for all data before row creation
    this.rowCreation();
  }

  /* Element indices to find deltas between element & cursor */
  tabElementListCreator() {
    const prob = this.state.problem.trim();
    let limitLen = 0;
    let arr = [];
    for (let i = 0; i < prob.length; i++) {
      if (prob[i] === " ") {
        arr.push(i + 1);
        limitLen = i;
      }
    }
    limitLen += 1;
    this.setState({
      tabElementList: [...this.state.tabElementList, ...arr],
      limitLength: limitLen,
    });
    return true;
  }

  /* not required at this time */
  /*
  componentDidMount() {
    fetch("/api/MathProblems/random")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          problem: res,
          name: res.name,
        });
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }*/

  render() {
    const { problem, initBool } = this.state;
    return (
      <div className="v3div">
        <div className="first-spacer" />
        <div className="row">
          <div className="mx-auto">
            <div className="row simp-row">
              <div className="col simp-col-l">
                <h5 className="simp-text">
                  {initBool ? "Solve/Simplify:" : "Enter Problem:"}
                </h5>
              </div>
              <div className="col simp-col-r">
                <input
                  className="form-control initial-input"
                  type="text"
                  autoFocus={true}
                  required
                  autoComplete="off"
                  onChange={this.handleInitInputChange}
                  onKeyPress={(event) => {
                    if (
                      event.key === "Enter" &&
                      problem !== "" &&
                      problem.replace(/\s/g, "").length &&
                      this.state.initBool === false
                    ) {
                      this.setState({ initBool: true });
                      this.handleSubmit();
                    }
                  }}
                />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {this.state.rowList.map((obj, i) => (
                <div key={i}>{obj}</div>
              ))}
            </form>
          </div>
        </div>
        <div className="row">
          <div className="mx-auto">
            <button
              className="btn btn-primary next-btn"
              style={{ visibility: "hidden" }}
              onClick={() => console.log(this.state.limitLength)}
            >
              next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MathUI;

import React, { Component } from "react";
import InputRow from "../components/InputRow";
import "./MathUI.css";

/* npm install... bootstrap, react-router, react-router-dom 
& react-bootstrap if you have any problems running the app */

class MathUI extends Component {
  constructor(props) {
    super(props);
    this.rowCreation = this.rowCreation.bind(this);
    this.tabElementListCreator = this.tabElementListCreator.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      rowList: [],
      index: 0,
      problemList: [
        //{ str: "Simplify:", prob: "3x - 9 (x + 1) - (-5)", ptype: 0 },
        { str: "Solve for x:", prob: "12x + 4 = 40", ptype: 1 },
        /*{ str: "Simplify:", prob: "4y + 5 (3 + y) - 2", ptype: 0 },
        { str: "Simplify:", prob: "12 (10x + 2) + 3x", ptype: 0 },
        { str: "Simplify:", prob: "5z (2 + 3 (-2z)) - 2z", ptype: 0 },
        { str: "Solve for x:", prob: "15x - 144 = 3x - 12", ptype: 1 },
        { str: "Solve for y:", prob: "3y - 3 (3y + 1) = 27", ptype: 1 },
        { str: "Solve for z:", prob: "6z - 1 (z + 1) = 35 - z", ptype: 1 },*/
      ],
      rowIndex: 0,
      inputsList: [],
      tabElementList: [],
      limitLength: 0,
      latestInput: "",
    };
  }

  /* for the sake of variety and checking different types of problems */
  randomIndex() {
    let min = 0;
    let max = Math.floor(this.state.problemList.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /* creates new input row component */
  rowCreation() {
    let child = [];

    child.push(
      <InputRow
        rowCreation={this.rowCreation}
        rowIndex={this.state.rowIndex}
        limitLength={this.state.limitLength}
        tabElementList={this.state.tabElementList}
        probType={this.state.problemList[this.state.index].ptype}
        problem={this.state.problemList[this.state.index].prob}
        latestInput={this.state.latestInput}
      />
    );

    this.setState({
      rowList: [...this.state.rowList, child],
    });
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

  componentDidMount() {
    this.setState({ index: this.randomIndex() });
    this.tabElementListCreator();
  }

  /* Used to find deltas between element & cursor */
  tabElementListCreator() {
    const str = this.state.problemList[this.state.index].prob;
    let limitLen = 0;
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        arr.push(i + 1);
        limitLen = i;
      }
    }
    limitLen += 1;
    this.setState({
      tabElementList: [...this.state.tabElementList, ...arr],
      limitLength: limitLen,
    });
  }

  render() {
    const { problemList, index } = this.state;
    return (
      <div className="v3div">
        <div className="first-spacer" />
        <div className="row">
          <div className="mx-auto">
            <div className="row simp-row">
              <div className="col simp-col-l">
                <h5 className="simp-text">{problemList[index].str}</h5>
              </div>
              <div className="col simp-col-r">
                <h5 className="simp-text">{problemList[index].prob}</h5>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputRow
                rowCreation={this.rowCreation}
                rowIndex={this.state.rowIndex}
                limitLength={this.state.limitLength}
                tabElementList={this.state.tabElementList}
                problem={this.state.problemList[this.state.index].prob}
                probType={this.state.problemList[this.state.index].ptype}
                latestInput={this.state.latestInput}
              />

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

import React, { Component } from "react";
import InputRow from "../components/InputRow";
import "./MathUI.css";

class MathUI extends Component {
  constructor(props) {
    super(props);
    this.rowCreation = this.rowCreation.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      rowList: [],
      problemList: [
        { id: 0, str: "Simplify:", prob: "3x - 9 (x + 1) - (-5)" },
        { id: 0, str: "Simplify:", prob: "4y + 5 (3 + y) - 2" },
        { id: 0, str: "Simplify:", prob: "12 (10x + 2) + 3x" },
        { id: 0, str: "Simplify:", prob: "5z (2 + 3 (-2z)) - 2z" },
        { id: 1, str: "Solve for x:", prob: "12x + 4 = 40" },
        { id: 1, str: "Solve for x:", prob: "15x - 144 = 3x - 12" },
        { id: 1, str: "Solve for y:", prob: "3y - 3 (3y + 1) = 27" },
        { id: 1, str: "Solve for z:", prob: "6z - 1 (z - 1) = 35 - z" },
      ],
      index: 0,
    };
  }

  randomIndex() {
    let min = 0;
    let max = Math.floor(this.state.problemList.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  rowCreation() {
    let child = [];

    child.push(<InputRow rowCreation={this.rowCreation} />);

    this.setState({
      rowList: [...this.state.rowList, child],
    });
  }

  /* disable for testers */
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
  }

  render() {
    const { problemList, index } = this.state;
    return (
      <div className="v3div">
        <div className="first-spacer" />
        <div className="row">
          <div className="mx-auto">
            <div className="row">
              <div className="col simp-col-l">
                <h5 className="simp">{problemList[index].str}</h5>
              </div>
              <div className="col simp-col-r">
                <h5 className="simp">{problemList[index].prob}</h5>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputRow rowCreation={this.rowCreation} />

              {this.state.rowList.map((obj, i) => (
                <div key={i}>{obj}</div>
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MathUI;

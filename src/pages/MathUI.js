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
        "3x - 9 (x + 1) - (-5)",
        "4y + 5 (3 + y) - 2",
        "12 (10x + 2) + 3x",
        "5z (2 + 3 (-2z)) - 2z",
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
              <div className="simp-line">
                <h5 className="simp">Simplify: {problemList[index]}</h5>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputRow rowCreation={this.rowCreation} />

              {this.state.rowList.map((obj) => (
                <div>{obj}</div>
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MathUI;

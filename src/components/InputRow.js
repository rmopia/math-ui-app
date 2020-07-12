import React, { Component } from "react";
import "./InputRow.css";

class InputRow extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleHint = this.handleHint.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.findOffset = this.findOffset.bind(this);
    this.state = {
      nextRowBool: true,
      inputVal: "",
      tabIdx: 0,
    };
  }

  /* input is added to state var whenever input is changed */
  handleChange(e) {
    //console.log(this.props.problem.length - e.target.selectionStart);
    console.log(e.target.selectionStart);
    this.setState({
      inputVal: e.target.value,
    });
  }

  /* when hint btn is clicked */
  handleHint() {
    console.log(this.props.tabElementList);
  }

  /* when specific keys are pushed in the input i.e. Tab */
  handleKeyDown(event) {
    const { selectionStart, selectionEnd } = event.target;
    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      selectionStart < this.props.tabsList.length
    ) {
      event.preventDefault();

      //console.log(this.props.tabsList[event.target.selectionStart]);
      //console.log(selectionStart);

      this.setState((prevState) => ({
        inputVal:
          prevState.inputVal.substring(0, selectionStart) +
          "\t".repeat(this.props.tabsList[selectionStart]) +
          //"\t" +
          prevState.inputVal.substring(selectionEnd),
      }));
    }
  }

  findOffset(e) {
    console.log("fefhuehj");
    let tList = this.props.tabElementList;

    let diff = e.target.selectionStart;
    console.log(diff);
  }

  render() {
    const { nextRowBool, inputVal } = this.state;
    return (
      <div>
        <hr
          className="in-hr"
          style={{ display: this.props.probType ? "" : "none" }}
        />
        <div className="row row-init">
          <button
            className="btn btn-info hint-b"
            onMouseUp={this.handleHint}
            formNoValidate
            style={{ visibility: nextRowBool ? "visible" : "hidden" }}
          >
            <span role="img">&#129300;</span>hint
          </button>
          <div
            className="input-span"
            style={{
              backgroundColor: nextRowBool ? "ghostwhite" : "white",
              boxShadow: nextRowBool
                ? "1px 3px 1px #9E9E9E"
                : "1px 3px 1px white",
            }}
          >
            <div className="row">
              <div className="col col-md-3">
                <h5 className="leftside">=</h5>
              </div>
              <div className="col col-md-9">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  className="form-control input-init"
                  autoFocus={true}
                  onChange={this.handleChange}
                  onInput={this.findOffset}
                  onKeyPress={(event) => {
                    if (
                      event.key === "Enter" &&
                      nextRowBool === true &&
                      inputVal !== ""
                    ) {
                      this.props.rowCreation();
                      this.setState({ nextRowBool: false });
                    }
                  }}
                  onKeyDown={this.handleKeyDown}
                  value={inputVal}
                  style={{
                    backgroundColor: nextRowBool ? "ghostwhite" : "white",
                    tabSize: 1,
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary check-btn"
            formNoValidate
            style={{ visibility: nextRowBool ? "visible" : "hidden" }}
            onClick={() => {
              if (nextRowBool === true && inputVal !== "") {
                this.props.rowCreation();
                this.setState({ nextRowBool: false });
              }
            }}
          >
            check
          </button>
        </div>
      </div>
    );
  }
}

export default InputRow;

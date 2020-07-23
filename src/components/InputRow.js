import React, { Component } from "react";
import hint from "../images/Hint.png";
import "./InputRow.css";

class InputRow extends Component {
  constructor(props) {
    super(props);
    this.lineCreator = this.lineCreator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleHint = this.handleHint.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.findDelta = this.findDelta.bind(this);
    this.findDeltaReverse = this.findDeltaReverse.bind(this);
    this.spaceOutInputVal = this.spaceOutInputVal.bind(this);
    this.state = {
      nextRowBool: true,
      lineBool: false,
      inputVal: "",
      tabbedOut: false,
    };
  }

  /* generates line when specific input is inputted */
  lineCreator() {
    const input = this.state.inputVal.replace(/[\t\n\r\s]/gm, ""); // removes all whitespace
    const regex = RegExp(/^(.*)\1$/gm);
    const showLineBool = regex.test(input);
    //console.log(showLineBool);
    if (showLineBool === true) {
      this.setState({ lineBool: true });
    }
  }

  /* input is added to state var whenever input is changed */
  handleChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  /* reset tabbing boolean if input is cleared/empty */
  handleInput(e) {
    //console.log(e.target.tabIndex);
    if (e.target.value === "") {
      this.setState({ tabbedOut: false });
    }
  }

  /* when hint btn is clicked */
  /* being used for debugging right now */
  handleHint(e) {
    //console.log(this.props.rowIndex);
  }

  handleKeyUp(event) {
    const { selectionStart } = event.target;
    // Backspace is pressed -> leads to previous input row
    if (
      event.key === "Backspace" &&
      selectionStart === 0 &&
      this.props.rowIndex !== 0
    ) {
      document.getElementById(event.target.id - 1).focus();
    }
  }

  /* when specific keys are pushed in the input */
  handleKeyDown(event) {
    const { selectionStart, selectionEnd } = event.target;
    // Tab is pressed (first loop)
    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      selectionStart < this.props.limitLength &&
      this.state.tabbedOut === false
    ) {
      event.preventDefault();
      const diff = this.findDelta(event);
      this.setState((prevState) => ({
        inputVal:
          prevState.inputVal.substring(0, selectionStart) +
          "\t".repeat(diff) +
          prevState.inputVal.substring(selectionEnd),
      }));
    }
    // Tab is pressed after looping
    else if (
      event.key === "Tab" &&
      !event.shiftKey &&
      selectionStart < this.props.limitLength &&
      this.state.tabbedOut === true
    ) {
      event.preventDefault();
      const diff = this.findDelta(event);
      event.target.selectionStart = event.target.selectionEnd =
        selectionStart + diff;
    }
    // Tab is pressed at very end of input
    else if (
      event.key === "Tab" &&
      !event.shiftKey &&
      selectionStart >= this.props.limitLength
    ) {
      event.preventDefault();
      event.target.selectionStart = event.target.selectionEnd = 0;
      this.setState({ tabbedOut: true });
    }
    /* still working on this, not sure if required */
    // Shift + Tab is pressed
    else if (
      event.key === "Tab" &&
      event.shiftKey &&
      selectionStart <= this.props.problem.length &&
      selectionStart > 0
    ) {
      event.preventDefault();
      let diff = this.findDeltaReverse(event);
      if (diff === 0) {
        event.target.selectionStart = event.target.selectionEnd = 0;
      } else {
        event.target.selectionStart = event.target.selectionEnd =
          selectionStart - diff;
      }
    }
    // Shift + Tab at 0 and with no content
    else if (
      event.key === "Tab" &&
      event.shiftKey &&
      selectionStart === 0 &&
      this.state.tabbedOut === false
    ) {
      event.preventDefault();
    }
    // Shift + Tab at 0 with previous content
    else if (
      event.key === "Tab" &&
      event.shiftKey &&
      selectionStart === 0 &&
      this.state.tabbedOut === true
    ) {
      event.preventDefault();
      event.target.selectionStart = event.target.selectionEnd = this.props.limitLength;
    }
  }

  /* Find difference between next element & current cursor placement */
  findDelta(e) {
    let tList = this.props.tabElementList;
    const selectionStart = e.target.selectionStart;
    let diff = 0;
    for (let i = 0; i < tList.length; i++) {
      if (selectionStart < tList[i]) {
        diff = tList[i] - selectionStart;
        break;
      }
    }
    return diff;
  }

  /* Find difference for shift + tab cases */
  findDeltaReverse(e) {
    let tList = this.props.tabElementList;
    let revList = [].concat(tList).reverse();
    const selectionStart = e.target.selectionStart;
    let diff = 0;
    for (let i = 0; i < revList.length; i++) {
      if (selectionStart > revList[i]) {
        diff = selectionStart - revList[i];
        break;
      }
    }
    return diff;
  }

  /* auto spacing input value function */
  spaceOutInputVal() {
    const og_prob = this.state.inputVal;
    let newString = "";
    const input = og_prob.replace(/[\t\n\r\s]/gm, "");
    const pregex = RegExp(/^(.*)\1$/gm);
    const rgx = RegExp(/\+|-|=|\//gm);
    if (pregex.test(input) !== true) {
      for (let i = 0; i < og_prob.length; i++) {
        if (rgx.test(og_prob.charAt(i))) {
          let lhs = og_prob.charAt(i - 1);
          let rhs = og_prob.charAt(i + 1);
          // 0th index cases
          if (i === 0 && (rhs === " " || rhs === "\t")) {
            newString += og_prob.charAt(i);
            // 0th index 2nd case; add a space
          } else if (i === 0 && (rhs !== " " || rhs !== "\t")) {
            newString += og_prob.charAt(i) + " ";
            // spaces on both sides; do nothing i.e. x = 4
          } else if (
            (lhs === " " || lhs === "\t") &&
            (rhs === " " || rhs === "\t")
          ) {
            newString += og_prob.charAt(i);
            // i.e. x= 4
          } else if (
            (lhs !== " " || lhs !== "\t") &&
            (rhs === " " || rhs === "\t")
          ) {
            newString += " " + og_prob.charAt(i);
            // i.e. x =4
          } else if (
            (lhs === " " || lhs === "\t") &&
            (rhs !== " " || rhs !== "\t")
          ) {
            newString += og_prob.charAt(i) + " ";
            // i.e. x=4
          } else if (
            (lhs !== " " || lhs !== "\t") &&
            (rhs !== " " || rhs !== "\t")
          ) {
            newString += " " + og_prob.charAt(i) + " ";
          } else {
            newString += og_prob.charAt(i);
          }
        } else {
          newString += og_prob.charAt(i);
        }
      }
      this.setState({ inputVal: newString });
    }
  }

  render() {
    const { nextRowBool, inputVal } = this.state;
    return (
      <div>
        <div className="row row-init">
          <div
            className="hint-col"
            style={{ visibility: nextRowBool ? "visible" : "hidden" }}
          >
            <button
              className="btn btn-info hint-b"
              onMouseUp={this.handleHint}
              formNoValidate
            >
              <img src={hint} className="hint-pic" />
            </button>
            <span className="caption">Hint</span>
          </div>
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
                  id={this.props.rowIndex}
                  required
                  autoComplete="off"
                  className="form-control input-init"
                  autoFocus={true}
                  onChange={this.handleChange}
                  onInput={this.handleInput}
                  onKeyPress={(event) => {
                    if (
                      event.key === "Enter" &&
                      nextRowBool === true &&
                      inputVal !== "" &&
                      inputVal.replace(/\s/g, "").length
                    ) {
                      this.spaceOutInputVal();
                      this.lineCreator();
                      this.props.rowCreation();
                      this.setState({ nextRowBool: false });
                    }
                  }}
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
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
              if (
                nextRowBool === true &&
                inputVal !== "" &&
                inputVal.replace(/\s/g, "").length
              ) {
                this.spaceOutInputVal();
                this.lineCreator();
                this.props.rowCreation();
                this.setState({ nextRowBool: false });
              }
            }}
          >
            check
          </button>
        </div>
        <hr
          className="in-hr"
          style={{
            display: this.state.lineBool ? "" : "none",
          }}
        />
      </div>
    );
  }
}

export default InputRow;

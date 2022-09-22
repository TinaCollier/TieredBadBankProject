import React from 'react';
import './calculator.css';

class CalculatorBtn extends React.Component {
    render() {
      return (
        <button
          className={"button " + this.props.class}
          id={this.props.id}
          onClick={this.props.onClick}
        >
          <p>{this.props.value}</p>
        </button>
      );
    }
  }
  
  class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.initialState = {
        displayValue: "0",
        lastValue: 0,
        calculatorState: 1, // 1 - initial state, 2 - entering first number, 3 - entering second number
        currentOperator: null,
        expectingSecondNumber: false
      };
      this.state = this.initialState;
    }
  
    addFloatingPoint(digit) {
      let displayValue = this.state.displayValue;
      if (displayValue.indexOf(".") === -1) {
        displayValue += ".";
      }
      this.setState({ displayValue: displayValue });
    }
  
    applyPercentage(digit) {
      let displayValue = this.state.displayValue;
      let noOfDecimalPlaces = 2
      if(displayValue.includes('.')) {
            noOfDecimalPlaces += displayValue.substring(
        displayValue.indexOf('.') + 1
      ).length;
      }
  
      this.setState({
        displayValue: (displayValue / 100).toFixed(noOfDecimalPlaces)
      });
    }
  
    changeSign() {
      this.setState({ displayValue: this.state.displayValue * -1 });
    }
  
    enterDigit(digit) {
      if(this.state.calculatorState === 2 && this.state.displayValue.length > 10) {
        return
      }
      let calculatorState = this.state.calculatorState;
  
      if (this.state.expectingSecondNumber || this.state.displayValue === "0") {
        this.setState({ displayValue: digit, expectingSecondNumber: false });
      } else {
        this.setState({ displayValue: this.state.displayValue + digit });
      }
  
      if (calculatorState === 1) {
        this.setState({ calculatorState: 2 });
      }
    }
  
    handleOperatorPress(operator) {
      let calculatorState = this.state.calculatorState;
      let displayValue = this.state.displayValue;
      let result = this.state.lastValue;
      let currentOperator = this.state.currentOperator;
      let lastValue = 0;
  
      if (calculatorState === 1) {
        return;
      } else {
        if (calculatorState === 2) {
          calculatorState = 3;
        }
        if (operator === "equals") {
          let resultAsString = result.toString();
          let resultNoOfDecimalPlaces = Math.max(
            resultAsString.substring(resultAsString.indexOf(".") + 1).length,
            displayValue.substring(displayValue.indexOf(".") + 1).length
          );
  
          switch (currentOperator) {
            case "plus":
              result += parseFloat(displayValue);
              break;
            case "minus":
              result -= parseFloat(displayValue);
              break;
            case "multiply":
              result *= parseFloat(displayValue);
              break;
            case "divide":
              result /= parseFloat(displayValue);
              break;
            default:
              return;
          }
          displayValue = result.toFixed(resultNoOfDecimalPlaces);
          currentOperator = null;
        } else {
          currentOperator = operator;
          lastValue = parseFloat(displayValue);
        }
      }
  
      this.setState({
        displayValue: displayValue,
        lastValue: lastValue,
        currentOperator: currentOperator,
        calculatorState: calculatorState,
        expectingSecondNumber: true
      });
    }
    
    getFontSize() {
      // TODO - use a continous function, not a discrete one!
      if (this.state.displayValue.length > 10) {
        return 37;
      } else if (this.state.displayValue.length > 8) {
        return 42;
      } else if (this.state.displayValue.length > 6) {
        return 47;
      } else if (this.state.displayValue.length > 4) {
        return 52;
      } else if (this.state.displayValue.length > 2) {
        return 56;
      } else {
        return 60;
      }
    }
  
    render() {
      return (
        <div id="calculator" className="calculator">
          <div id="output">
            <div id="output-text" style={{fontSize: this.getFontSize()}}>{this.state.displayValue}</div>
          </div>
          <div id="buttons">
            <div id="layer1">
              <CalculatorBtn
                value={"AC"}
                onClick={() => this.setState(this.initialState)}
              />
              <CalculatorBtn value={"\u00B1"} onClick={() => this.changeSign()} />
              <CalculatorBtn value={"%"} onClick={() => this.applyPercentage()}/>
              <CalculatorBtn
                value={"\u00F7"}
                class={"operator-btn"}
                onClick={() => this.handleOperatorPress("divide")}
              />
            </div>
            <div id="layer2">
              <CalculatorBtn value={"7"} onClick={() => this.enterDigit("7")} />
              <CalculatorBtn value={"8"} onClick={() => this.enterDigit("8")} />
              <CalculatorBtn value={"9"} onClick={() => this.enterDigit("9")} />
              <CalculatorBtn
                value={"x"}
                class={"operator-btn"}
                onClick={() => this.handleOperatorPress("multiply")}
              />
            </div>
            <div id="layer3">
              <CalculatorBtn value={"4"} onClick={() => this.enterDigit("4")} />
              <CalculatorBtn value={"5"} onClick={() => this.enterDigit("5")} />
              <CalculatorBtn value={"6"} onClick={() => this.enterDigit("6")} />
              <CalculatorBtn
                value={"-"}
                class={"operator-btn"}
                onClick={() => this.handleOperatorPress("minus")}
              />
            </div>
            <div id="layer4">
              <CalculatorBtn value={"1"} onClick={() => this.enterDigit("1")} />
              <CalculatorBtn value={"2"} onClick={() => this.enterDigit("2")} />
              <CalculatorBtn value={"3"} onClick={() => this.enterDigit("3")} />
              <CalculatorBtn
                value={"+"}
                class={"operator-btn"}
                onClick={() => this.handleOperatorPress("plus")}
              />
            </div>
            <div id="layer5">
              <CalculatorBtn
                value={"0"}
                id={"zero-btn"}
                onClick={() => this.enterDigit("0")}
              />
              <CalculatorBtn
                value={"."}
                onClick={() => this.addFloatingPoint()}
              />
              <CalculatorBtn
                value={"="}
                class={"operator-btn"}
                onClick={() => this.handleOperatorPress("equals")}
              />
            </div>
          </div>
        </div>
      );
    }
  }

export default Calculator;
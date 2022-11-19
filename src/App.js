import { useState } from "react";
import CustomButton from "./components/CustomButton";
import {
  numberButtonClickHandler,
  operationButtonClickHandler,
  decimalButtonClickHandler,
  equalsButtonClickHandler,
  clearButtonClickHandler,
} from "./calculatorUtils.js";

import "./custom-colors.css";
import "./custom-styles.css";
import "./App.css";

const App = () => {
  const [displayFormula, setDisplayFormula] = useState("");
  const [displayOutput, setDisplayOutput] = useState("0");

  const [operationAdded, setOperationAdded] = useState(false);
  const [decimalAdded, setDecimalAdded] = useState(false);

  const [lastResult, setLastResult] = useState(0);
  const [resultGiven, setResultGiven] = useState(false);

  return (
    <div className="App">
      <div id="calculator" className="custom-container">
        <div className="row">
          <div className="display-container">
            <div className="formula-display">{displayFormula}</div>
            <div id="display" className="output-display">
              {displayOutput}
            </div>
          </div>
        </div>
        <div className="button-pad-container">
          <div className="row">
            <CustomButton
              id="clear"
              type="clear"
              text="AC"
              mainFunc={clearButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="divide"
              operation="/"
              type="operation"
              text="/"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="multiply"
              operation="x"
              type="operation"
              text="x"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="seven"
              number="7"
              text="7"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="eight"
              number="8"
              text="8"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="nine"
              number="9"
              text="9"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="subtract"
              operation="-"
              text="-"
              type="operation"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="four"
              number="4"
              text="4"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="five"
              number="5"
              text="5"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="six"
              number="6"
              text="6"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="add"
              operation="+"
              text="+"
              type="operation"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="one"
              number="1"
              text="1"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="two"
              number="2"
              text="2"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="three"
              number="3"
              text="3"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="decimal"
              decimal="."
              text="."
              type="operation"
              mainFunc={decimalButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              decimalAdded={decimalAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="zero"
              number="0"
              text="0"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="equals"
              type="equal"
              text="="
              equals="="
              mainFunc={equalsButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              setDisplayOutput={setDisplayOutput}
              operationAdded={operationAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./calculator.css";

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(num) : display + num);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
        } else if (display.indexOf(".") === -1) {
            setDisplay(display + ".");
        }
    };

    const clear = () => {
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperation: string) => {
        const inputValue = Number.parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = (
        firstValue: number,
        secondValue: number,
        operation: string
    ) => {
        switch (operation) {
            case "+":
                return firstValue + secondValue;
            case "-":
                return firstValue - secondValue;
            case "×":
                return firstValue * secondValue;
            case "÷":
                return firstValue / secondValue;
            case "=":
                return secondValue;
            default:
                return secondValue;
        }
    };

    const handleEquals = () => {
        const inputValue = Number.parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const toggleSign = () => {
        if (display !== "0") {
            setDisplay(
                display.charAt(0) === "-" ? display.slice(1) : "-" + display
            );
        }
    };

    const percentage = () => {
        const value = Number.parseFloat(display);
        setDisplay(String(value / 100));
    };

    const formatDisplay = (value: string) => {
        if (value.length > 9) {
            return Number.parseFloat(value).toExponential(3);
        }
        return value;
    };

    return (
        <div className="calculator">
            {/* Display */}
            <div className="display">
                <div className="display-text">{formatDisplay(display)}</div>
            </div>

            {/* Button Grid */}
            <div className="button-grid">
                {/* Row 1 */}
                <button onClick={clear} className="button function-button">
                    AC
                </button>
                <button onClick={toggleSign} className="button function-button">
                    +/-
                </button>
                <button onClick={percentage} className="button function-button">
                    %
                </button>
                <button
                    onClick={() => performOperation("÷")}
                    className={`button operator-button ${
                        operation === "÷" ? "active" : ""
                    }`}
                >
                    ÷
                </button>

                {/* Row 2 */}
                <button
                    onClick={() => inputNumber("7")}
                    className="button number-button"
                >
                    7
                </button>
                <button
                    onClick={() => inputNumber("8")}
                    className="button number-button"
                >
                    8
                </button>
                <button
                    onClick={() => inputNumber("9")}
                    className="button number-button"
                >
                    9
                </button>
                <button
                    onClick={() => performOperation("×")}
                    className={`button operator-button ${
                        operation === "×" ? "active" : ""
                    }`}
                >
                    ×
                </button>

                {/* Row 3 */}
                <button
                    onClick={() => inputNumber("4")}
                    className="button number-button"
                >
                    4
                </button>
                <button
                    onClick={() => inputNumber("5")}
                    className="button number-button"
                >
                    5
                </button>
                <button
                    onClick={() => inputNumber("6")}
                    className="button number-button"
                >
                    6
                </button>
                <button
                    onClick={() => performOperation("-")}
                    className={`button operator-button ${
                        operation === "-" ? "active" : ""
                    }`}
                >
                    -
                </button>

                {/* Row 4 */}
                <button
                    onClick={() => inputNumber("1")}
                    className="button number-button"
                >
                    1
                </button>
                <button
                    onClick={() => inputNumber("2")}
                    className="button number-button"
                >
                    2
                </button>
                <button
                    onClick={() => inputNumber("3")}
                    className="button number-button"
                >
                    3
                </button>
                <button
                    onClick={() => performOperation("+")}
                    className={`button operator-button ${
                        operation === "+" ? "active" : ""
                    }`}
                >
                    +
                </button>

                {/* Row 5 */}
                <button
                    onClick={() => inputNumber("0")}
                    className="button number-button zero-button"
                >
                    0
                </button>
                <button onClick={inputDecimal} className="button number-button">
                    .
                </button>
                <button
                    onClick={handleEquals}
                    className="button operator-button"
                >
                    =
                </button>
            </div>
        </div>
    );
}

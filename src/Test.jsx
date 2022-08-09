import React from "react";
import ReactDOM from "react-dom";
import CustomSelect from "./CustomSelect";

// import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      defaultSelectText: "Please select an option",
      countryList: [
        { id: 1, name: "Australia" },
        { id: 2, name: "Brazil" },
        { id: 3, name: "China" },
        { id: 4, name: "Denmark" },
        { id: 5, name: "Egypt" },
        { id: 6, name: "Finland" },
        { id: 7, name: "Ghana" },
        { id: 8, name: "Hungary" },
        { id: 9, name: "India" },
        { id: 10, name: "Japan" }
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <div className="test">
          <CustomSelect
            defaultText={this.state.defaultSelectText}
            optionsList={this.state.countryList}
          />
        </div>
      </div>
    );
  }
}

export default App
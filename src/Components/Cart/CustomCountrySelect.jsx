import React from "react";

class CustomCountrySelect extends React.Component {
  constructor(props) {
    super(props);

    // @defaultSelectText => Show default text in select
    // @showOptionList => Show / Hide List options
    // @optionsList => List of options
    this.state = {
      defaultSelectText: "",
      showOptionList: false,
      optionsList: []
    };
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      defaultSelectText: this.props.defaultText
    });
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = e => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected__country-text")
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };

  // This method handles the display of option list
  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = e => {
    this.setState({
      defaultSelectText: e.target.getAttribute("data-name"),
      showOptionList: false
    });
    this.props.onClick(e.target.getAttribute("data-name"));
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    return (
      <div className="custom-select-container custom__country-container">
        <div
          className={showOptionList ? "selected__country-text active" : "selected__country-text"}
          onClick={this.handleListDisplay}
        >
          {defaultSelectText === this.props.defaultText? <span className="country__firs-text">{defaultSelectText}</span> : defaultSelectText}
        </div>
        {showOptionList && (
          <ul className="select-options select__country-options">
            {optionsList.map(option => {
              return (
                <li
                  className="custom-select-option custom__country-select-option"
                  data-name={option}
                  onClick={this.handleOptionClick}
                  id={option}
                  key={option}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default CustomCountrySelect;
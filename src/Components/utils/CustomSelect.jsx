import React from "react";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelectText: "",
      showOptionList: false,
      optionsList: []
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      defaultSelectText: this.props.defaultText
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };

  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };

  handleOptionClick = e => {
    this.setState({
      defaultSelectText: e.target.getAttribute("data-name"),
      showOptionList: false
    });
    this.props.onClick(e.target.getAttribute("id"))
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    return (
      <div className={this.props.defaultText === "Sorting" ? "custom-select-container custom-sorting" : 'custom-select-container custom-categories'}>
        <div
          className={showOptionList ? "selected-text active" : "selected-text"}
          onClick={this.handleListDisplay}
        >
          {defaultSelectText}
        </div>
        {showOptionList && (
          <ul className="select-options">
            {optionsList.map(option => {
              return (
                <li
                  className="custom-select-option"
                  data-name={option.name}
                  id={option.id}
                  key={option.id}
                  onClick={this.handleOptionClick}
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default CustomSelect;
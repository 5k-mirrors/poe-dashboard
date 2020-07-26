import React, { Component } from "react";
import NewContentIcon from "newContentIcon";

class NewContentReload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  componentDidMount() {
    window.addEventListener("newContentAvailable", () => {
      this.setState({
        show: true
      });
    });
  }

  onReloadButtonClick = () => {
    window.location.reload(window.location.href);
  };

  render() {
    const { show } = this.state;
    let reloadIconDisplayer = null;
    if (show) {
      reloadIconDisplayer = (
        <button type="button" name="Reload" onClick={this.onReloadButtonClick}>
          <img src={NewContentIcon} alt="New content available" />
        </button>
      );
    }
    return reloadIconDisplayer;
  }
}

export default NewContentReload;

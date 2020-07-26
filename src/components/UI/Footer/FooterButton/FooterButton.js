import React, { Component } from "react";
import { FooterLink, ButtonContainer } from "./FooterButton.style";
import AlertDialog from "../../AlertDialog/AlertDialog";

class FooterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    };

    this.onOpenDialog = this.onOpenDialog.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
  }

  onOpenDialog() {
    this.setState({
      showDialog: true
    });
  }

  onCloseDialog() {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const { buttonText, dialogText } = this.props;
    const { showDialog } = this.state;
    return (
      <ButtonContainer>
        <FooterLink type="button" onClick={() => this.onOpenDialog()}>
          {buttonText}
        </FooterLink>
        <AlertDialog
          showDialog={showDialog}
          contentText={dialogText}
          dialogTitle={buttonText}
          onCloseDialog={this.onCloseDialog}
        />
      </ButtonContainer>
    );
  }
}

export default FooterButton;

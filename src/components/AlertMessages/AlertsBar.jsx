import React from "react";
import { Alert } from "react-bootstrap";

function AlertsBar(props) {
  let { variant, message, show } = props;
  return (
    <Alert variant={variant} show={show}>
      {message}
    </Alert>
  );
}

export default AlertsBar;

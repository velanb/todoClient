import React from "react";
import { Navbar } from "react-bootstrap";

function AppNavbar(props) {
  let { navBarState } = props;
  let { appName } = navBarState;
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Navbar.Brand>{appName}</Navbar.Brand>
    </Navbar>
  );
}

export default AppNavbar;

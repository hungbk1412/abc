import React from "react";
import "ordering/Navbar.css";
import {
  Navbar,
  NavItem,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  Button,
  ButtonGroup,
  Label,
  Col,
  Row,
  InputGroupText
} from "reactstrap";

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar id={"Navbar"} className={"pt-0 pb-0"}>
        <Nav className={"h-100 w-100 d-flex"}>
          <Row className={"w-100 h-100"}>
            <Col xs={7} className={"h-100 d-flex"}>
              <ButtonGroup id={"Navbar-buttonGroup-2"} className={""}>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    F
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    G
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    H
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    I
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    K
                  </Button>
                </NavItem>
              </ButtonGroup>
            </Col>
            <Col xs={5} className={"h-100 d-flex"}>
              <NavItem className={"NavItem d-flex align-items-center w-100"}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className={"fa fa-search"} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type={"text"}
                      name={"searchBar"}
                      id={"searchBar"}
                      className={"p-0"}
                    />
                  </InputGroup>
              </NavItem>
              <ButtonGroup id={"Navbar-buttonGroup-1"} className={"ml-auto"}>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button color={"primary"} className={"Navbar-button rounded"}>
                    A
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    B
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    C
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    D
                  </Button>
                </NavItem>
                <NavItem className={"NavItem d-flex align-items-center"}>
                  <Button
                    color={"primary"}
                    className={"Navbar-button rounded-circle"}
                  >
                    E
                  </Button>
                </NavItem>
              </ButtonGroup>
            </Col>
          </Row>
        </Nav>
      </Navbar>
    );
  }
}

import React from "react";
import { connect } from "react-redux";
import Bill from "./Bill";
import Menu from "./Menu";
import Utilities from "./Utilities";
import { Container, Col, Row } from "reactstrap";


class Content extends React.Component {

  render() {
    return (
      <Container fluid className={"mt-1 bg-light"}>
        <Row>
          <Col xs={7}>
            <Bill />
            <Utilities />
          </Col>
          <Col xs={5}>
            <Menu addButton={true} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = function(state) {
  return {

  };
};
const mapDispatchToProps = function(dispatch) {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

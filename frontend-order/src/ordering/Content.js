import React from "react";
import { connect } from "react-redux";
import Bill from "ordering/Bill";
import Menu from "ordering/Menu";
import Utilities from "ordering/Utilities";
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
            <Menu/>
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

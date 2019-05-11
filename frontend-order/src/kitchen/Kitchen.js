import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-store';
import { Container, Col, Row, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import Menu from '../ordering/Menu'

class Kitchen extends Component {
    
    render() {
        return (
            <Container fluid className={"mt-1 bg-light"}>
                <Row>
                    <Col xs={7}>
                        <Card>
                            <CardHeader>
                                <CardBody>
                                    <CardFooter>
                                        
                                    </CardFooter>
                                </CardBody>
                            </CardHeader>
                        </Card>
                    </Col>
                    <Col xs={5}>
                        <Menu inStockButton={true} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = function (state) {
    return {

    };
};
const mapDispatchToProps = function (dispatch) {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kitchen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { Container, Col, Row, Card, CardBody, CardHeader, CardFooter, Button, Table, Input } from "reactstrap";
import Menu from '../ordering/Menu';
import {cashierGetBills, checkout, changeDiscount, changeVAT} from '../actions/cashierActions';
import {storeApi} from '../constant';

class CheckOut extends Component { 
    componentDidMount() {
        this.props.cashierGetBills();
        const socket = openSocket(storeApi);
        socket.on('order', data => {
            if (data.action === 'createBill') {
                this.props.cashierGetBills();
            }
        })
    }
    
    render() {
        return (
            <>
                { this.props.finalBills.map(bill => {
                    return (
                        <Container fluid className={"mt-1 bg-light"}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th className={"text-center"}>SL</th>
                                        <th className={"text-center"}>Đơn giá</th>
                                        <th className={"text-center"}>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill.items.map(product => {
                                        return (
                                            <tr key={product["name"]}>
                                                <td>
                                                    <div>{product["name"]}</div>                                               
                                                </td>
                                                <td className={"text-center"}>
                                                    {product["quantity"]}
                                                </td>
                                                <td className={"text-center"}>{product["price"]}</td>
                                                <td className={"text-center"}>
                                                    <span>{product["total"]}</span>                                                
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <div style={{'marginBottom': '100px'}} className={"border-top border-color-dark"}>
                                <Row>
                                    <Col xs={5}>
                                    </Col>
                                    <Col style={{ 'fontSize': '30px', 'padding': '20px' }} xs={5} className={"ml-auto d-flex align-items-center"}>
                                        <div className={"mr-auto"}>Tổng thành tiền</div>
                                        <div className={"ml-auto"}>{this.props.cost}</div>
                                    </Col>
                                </Row>
                                <Row className={"mb-1"}>
                                    <Col xs={5}>
                                        {/* <Input type={"number"} /> */}
                                    </Col>
                                    <Col xs={5} className={"ml-auto d-flex"}>
                                        <div className={"mr-auto p-0"} xs={6}>Chiết khấu</div>
                                        <div className={"ml-auto p-0"} xs={6}>
                                            <Input type={"number"} name={"discount"} className={"p-0"} value={bill.discount}
                                                onChange={this.props.changeDiscount.bind(this, bill._id)} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={"mb-1"}>
                                    <Col xs={5} className={"d-flex"}>
                                        <Col xs={6} className={"pr-1 pl-0"}>
                                            {/* <Dropdown isOpen={this.state.isLeftToggled} toggle={this.handleLeftToggle}>
                                                <DropdownToggle caret className={"w-100 bg-white text-dark border-info"}>
                                                    SomeThing
                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Header</DropdownItem>
                                                    <DropdownItem>Item 2</DropdownItem>
                                                    <DropdownItem>Item 3</DropdownItem>
                                                    <DropdownItem>Item 4</DropdownItem>
                                                    <DropdownItem>Item 5</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={6} className={"pr-0 pl-1"}>
                                            <Dropdown isOpen={this.state.isRightToggled} toggle={this.handleRightToggle}>
                                                <DropdownToggle caret className={"w-100 bg-white text-dark border-info"}>
                                                    SomeThing
                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Header</DropdownItem>
                                                    <DropdownItem>Item 2</DropdownItem>
                                                    <DropdownItem>Item 3</DropdownItem>
                                                    <DropdownItem>Item 4</DropdownItem>
                                                    <DropdownItem>Item 5</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown> */}
                                        </Col>
                                    </Col>
                                    <Col xs={5} className={"d-flex ml-auto"}>
                                        <p>VAT</p>
                                        <Button id={"UtilitiesJs-VATButton-0"} className={"p-0 ml-1"} color={"primary"}
                                            onClick={() => this.props.changeVAT(bill._id, 0)}>0%</Button>
                                        <Button id={"UtilitiesJs-VATButton-10"} className={"p-0 ml-1"} color={"primary"}
                                            onClick={() => this.props.changeVAT(bill._id, 0.1)}>10%</Button>
                                        <p className={"ml-auto"}>{bill.vat * 100}%</p>
                                    </Col>
                                </Row>
                                <Row className={"mb-1"}>
                                    <Col xs={5}>
                                        {/* <Input type={"text"} placeholder={"Tu dong tao ma"} className={"mb-1"} /> */}
                                    </Col>
                                    <Col xs={5} className={"ml-auto d-flex"}>
                                        <p>Tổng cộng</p>
                                        <div className={"ml-auto"}>{bill.totalPrice}</div>
                                    </Col>
                                </Row>
                                <Row className={"mb-1"}>
                                    <Col xs={5}>
                                        <h1>{bill.username}</h1>
                                    </Col>
                                    <Col xs={5} className={"ml-auto"}>
                                        <p>Tiền khách trả</p>
                                        <p>Tiền thừa</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>
                                    </Col>
                                    <Col className={"pl-1"}>
                                        <Button color={"danger"} className={"h-100"} block
                                            onClick={() => this.props.checkout(bill)}>Thanh Toán</Button>
                                    </Col>
                                    <Col xs ={4}></Col>
                                </Row>
                            </div>
                        </Container>
                    )
                })}
            </>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        finalBills: state.checkout.finalBills,
        needToReRender: state.checkout.needToReRender,
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        changeVAT: (id, vat) => {
            dispatch(changeVAT(id, vat))
        },
        changeDiscount: (id, event) => {
            dispatch(changeDiscount(event, id))
        },
        cashierGetBills: () => {
            dispatch(cashierGetBills());
        },
        checkout: (bill) => {
            dispatch(checkout(bill))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOut);
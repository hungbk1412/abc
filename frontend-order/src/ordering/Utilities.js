import React from 'react';
import 'ordering/Utilities.css'
import {
    Col,
    Row,
    Button,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';
import {connect} from 'react-redux';
import {changeVAT, changeDiscount, createBill, createTempOrder} from 'actions/orderActions';


class Utilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            VAT: 0,
            isLeftToggled: false,
            isRightToggled: false
        };
        // this.handleLeftToggle = this.handleLeftToggle.bind(this);
        // this.handleRemoveGuest = this.handleRemoveGuest.bind(this);
        // this.handleRightToggle = this.handleRightToggle.bind(this);

    }

    // handleRemoveGuest() {
    //     let button = document.getElementById("UtilitiesJs-guestButton");
    //     button.style.display = "none";
    // }

    // handleLeftToggle() {
    //     this.setState({
    //         ...this.state,
    //         isLeftToggled: !this.state.isLeftToggled
    //     })
    // }

    // handleRightToggle() {
    //     this.setState({
    //         ...this.state,
    //         isRightToggled: !this.state.isRightToggled
    //     })
    // }

    createBill = (orders) => {
        let bill = orders[0];
        delete bill['done'];
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].items.length; j++) {
                delete orders[i].items[j]['served'];
                if (i > 0) {
                    let indexItemInMainBill = bill.items.findIndex(item => {
                        return item['name'] === orders[i].items[j]['name']
                    })
                    if (indexItemInMainBill === -1) {
                        bill.items.push(orders[i].items[j])
                    } else {
                        bill.items[indexItemInMainBill].quantity += orders[i].items[j].quantity;
                        bill.items[indexItemInMainBill].total = bill.items[indexItemInMainBill].quantity * bill.items[indexItemInMainBill].price
                    }
                }
            }
        }
        this.props.createBill(bill)
    }

    render() {
        return (
            <div className={"border-top border-color-dark"}>
                <Row>
                    <Col xs={5}>
                        {/* <div className={"d-flex mb-1 mt-1"}>
                            <Input type={"text"} name={"customerName"} placeholder={"Ten Khach Hang"}/>
                            <Button color={"success"}><i className={"fa fa-plus"}/></Button>
                        </div>
                        <Button className={"text-primary mb-1 text-left p-0"} color={"light"}
                                onClick={this.handleRemoveGuest}
                                id={"UtilitiesJs-guestButton"}>
                            <i className={"fa fa-times"}/> Khách lẻ
                        </Button> */}
                    </Col>
                    <Col style={{'fontSize': '30px', 'padding': '20px'}} xs={5} className={"ml-auto d-flex align-items-center"}>

                        <div  className={"mr-auto"}>Tổng thành tiền</div>
                        <div className={"ml-auto"}>{this.props.cost}</div>

                    </Col>
                </Row>
                {/* <Row className={"mb-1"}>
                    <Col xs={5}>
                        <Input type={"number"}/>
                    </Col>
                    <Col xs={5} className={"ml-auto d-flex"}>
                        <div className={"mr-auto p-0"} xs={6}>Chiết khấu</div>
                        <div className={"ml-auto p-0"} xs={6}>
                            <Input type={"number"} name={"discount"} className={"p-0"} value={this.props.discount}
                                   onChange={this.props.changeDiscount}/>
                        </div>
                    </Col>
                </Row>
                <Row className={"mb-1"}>
                    <Col xs={5} className={"d-flex"}>
                        <Col xs={6} className={"pr-1 pl-0"}>
                            <Dropdown isOpen={this.state.isLeftToggled} toggle={this.handleLeftToggle}>
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
                            </Dropdown>
                        </Col>
                    </Col>
                    <Col xs={5} className={"d-flex ml-auto"}>
                        <p>VAT</p>
                        <Button id={"UtilitiesJs-VATButton-0"} className={"p-0 ml-1"} color={"primary"}
                                onClick={() => this.props.changeVAT(0)}>0%</Button>
                        <Button id={"UtilitiesJs-VATButton-10"} className={"p-0 ml-1"} color={"primary"}
                                onClick={() => this.props.changeVAT(0.1)}>10%</Button>
                        <p className={"ml-auto"}>{this.props.VAT * 100}%</p>
                    </Col>
                </Row>
                <Row className={"mb-1"}>
                    <Col xs={5}>
                        <Input type={"text"} placeholder={"Tu dong tao ma"} className={"mb-1"}/>
                    </Col>
                    <Col xs={5} className={"ml-auto d-flex"}>
                        <p>Tổng cộng</p>
                        <div className={"ml-auto"}>{this.props.total}</div>
                    </Col>
                </Row>
                <Row className={"mb-1"}>
                    <Col xs={5}>
                        <Input type={"textarea"} className={"mb-1"}/>
                    </Col>
                    <Col xs={5} className={"ml-auto"}>
                        <p>Tiền khách trả</p>
                        <p>Tiền thừa</p>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={4} className={"pr-1"}>
                        <Button color={"primary"} className={"d-block"} block>Chuyển bàn</Button>
                        {/* <Button color={"primary"} className={"d-block"} block>Tách bàn</Button> */}
                    </Col>
                    <Col xs={4} className={"pl-1 pr-1"}>
                        <Button onClick={()=>this.props.createTempOrder(this.props.bill, this.props.username)} color={"primary"} className={"d-block"} block>Báo chế biến</Button>
                        {/* <Button color={"warning"} className={"d-block"} block>Tạm tính</Button> */}
                    </Col>
                    <Col xs={4} className={"pl-1"}>
                        <Button color={"danger"} className={"h-100"} block
                                disabled={this.props.tempOrders}
                                onClick={()=>this.createBill(this.props.tempOrders)}>Thanh Toán</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tempOrders: state.order.tempOrders.orders,
        username: state.auth.username,
        bill: state.order.bill,
        cost: state.order.cost,
        total: state.order.bill.totalPrice,
        VAT: state.order.vat,
        discount: state.order.discount,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeVAT: (vat) => {
            dispatch(changeVAT(vat))
        },
        changeDiscount: (event) => {
            dispatch(changeDiscount(event))
        },
        createBill: (bill) => {
            dispatch(createBill(bill))
        },
        createTempOrder: (bill, username) => {
            let temp_cost = bill.items.reduce(function (total, elem) {
                total = total + elem.price * elem.quantity;
                return total;
            }, 0);
            bill.totalPrice = temp_cost;
            dispatch(createTempOrder(bill, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Utilities);


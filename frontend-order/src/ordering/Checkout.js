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

    printBill = (bill) => {
        let myWindow  = window.open('', 'bill', 'height=600,width=800');
        myWindow.document.write(`<head>
        <meta charset="utf-8">
        <title>A simple, clean, and responsive HTML invoice template</title>
        
        <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }
        
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        
        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }
        
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
        
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
        
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.item td{
            border-bottom: 1px solid #eee;
        }
        
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        
        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        
        .rtl table {
            text-align: right;
        }
        
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="http://storage.googleapis.com/hust-edu.appspot.com/images/347519313-1553408625211-logo_hust.png" style="width:100%; max-width:50px;">
                                </td>
                                
                                <td>
                                    Created: ${new Date()}<br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    Cà phê Hưng NT<br>
                                    Số 1 Đại Cồ Việt<br>
                                    Hai Bà Trưng, Hà Nội
                                </td>
                                
                                <td>
                                    Khách lẻ<br>
                                    ${bill.username}<br>
                                    Thanh toán: Tiền mặt
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                        <br><br><br><br>
                        <table style="text-align: center" cellpadding="0" cellspacing="0">
                            <tr class="heading">
                                <td>Đồ uống</td>
                                <td style="text-align: center">Giá</td>
                                <td>Số lượng</td>
                                <td>Thành tiền  </td>
                            </tr>`)
                for (let i = 0; i < bill.items.length; i++) {
                    myWindow.document.write(`             
                        <tr class="item">
                            <td>${bill.items[i].name}</td>
                            <td>${bill.items[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</td>
                            <td>${bill.items[i].quantity}</td>
                            <td>${bill.items[i].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</td>
                        </tr>`)
                }
                myWindow.document.write(`
                                    <tr class="total">
                                        <td>Giảm giá: ${bill.discount}%</td>
                                        <td>VAT: ${bill.vat}%</td>
                                        <td></td>                    
                                        <td> Tổng: ${bill.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND </td>
                                    </tr>
                                </table>
                            </div>
                        </body>`)
                this.props.checkout(bill);
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
                                                <td className={"text-center"}>{product["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</td>
                                                <td className={"text-center"}>
                                                    <span>{product["total"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>                                                
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
                                    </Col>
                                    <Col xs={5} className={"ml-auto d-flex"}>
                                        <p>Tổng cộng</p>
                                        <div className={"ml-auto"}>{bill.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</div>
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
                                    <Button onClick={()=>this.printBill(bill)} color={"primary"} className={"d-block"} block>In hóa đơn</Button>
                                    </Col>
                                    <Col xs ={4}>
                                        <Button color={"danger"} className={"h-100"} block onClick={() => this.props.checkout(bill)}>Thanh Toán</Button>
                                    </Col>
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
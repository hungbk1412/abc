import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import axios from '../axios-store';
import { Container, Col, Row, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import Menu from '../ordering/Menu';
import {kitchenGetTempOrder, checkItemDone} from '../actions/kitchenActions';
import './Kitchen.css';
import {storeApi} from '../constant';

class Kitchen extends Component {

    componentDidMount() {     
        this.props.kitchenGetTempOrder();
        const socket = openSocket(storeApi)
        socket.on('order', data => {
            if (data.action === 'newTempOrder') {
                this.props.kitchenGetTempOrder()
            }
        }) 
        // console.log('this.props.tempOrders', this.props.tempOrders)
    }

    async checkItemDone(name, id) {
        let orderIndex =  this.props.tempOrders.findIndex(order => {
            return order._id === id;
        })
        let itemIndex = this.props.tempOrders[orderIndex].items.findIndex(item => {
            return item.name === name;
        })
        this.props.tempOrders[orderIndex].items[itemIndex].served = true;
        // console.log('this.props.tempOrders[orderIndex]: ', this.props.tempOrders[orderIndex]);
        await this.props.checkItemDone(this.props.tempOrders[orderIndex]);
        // await this.props.kitchenGetTempOrder();
        // return null;
    }

    render() {
        // console.log('this.props.tempOrders', this.props.tempOrders)
        return (
            <Container fluid className={"mt-1 bg-light"}>
                <Row>
                    <Col style={{'backgroundColor': 'azure'}} xs={7}>
                    { this.props.tempOrders.map(order => {
                        return (
                            <div key={order._id}>
                                <Card className='orders'>
                                    <CardHeader>
                                        {order.username}
                                    </CardHeader>
                                    <CardBody>
                                        { order.items.filter(item => item.served == false)
                                            .map(item => {
                                            return (
                                                <>
                                                    <Row style={{'padding': '10px', 'border': '1px solid black'}}>
                                                        <Col xs='7'>
                                                            <div>{item.name}</div>                                                            
                                                        </Col>
                                                        <Col xs='2'>{item.quantity}</Col>
                                                        <Col xs='3'>
                                                            <Button 
                                                                onClick={() => this.checkItemDone(item.name, order._id)}
                                                                color='success'
                                                                size='sm'
                                                                className={"ml-auto"}
                                                            >
                                                                Done
                                                            </Button>
                                                        </Col>
                                                        <div style={{'fontSize': '14px'}}>Note: {item.note}</div>   
                                                    </Row>
                                                    
                                                </>
                                            )
                                        })}
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}                        
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
        tempOrders: state.kitchen.tempOrders,
        needToReRender: state.kitchen.needToReRender
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        kitchenGetTempOrder: () => {
            dispatch(kitchenGetTempOrder());
        },
        checkItemDone: (order) => {
            dispatch(checkItemDone(order))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kitchen);
import React from "react";
import "ordering/Menu.css";
import {
    Col,
    Row,
    Button,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
} from "reactstrap";
import openSocket from 'socket.io-client';
import {connect} from "react-redux";
import {addProduct, getProducts, getProductTypes, checkInStock} from "../actions/orderActions";

class Menu extends React.Component {
    state = {products: null}

    componentDidMount() {
        this.props.getProductTypes();
        this.props.getProducts();
        const socket = openSocket('http://localhost:5000');
        socket.on('order', data => {
            if (data.action === 'checkInStock') {
                this.props.getProducts();
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({...this.state, products: this.props.products});
        }
    }

    checkInStock = (id, inStock) => {
        let products = this.state.products;
        let productLength = products.length;
        for (let i = 0; i < productLength; i++) {
            if (products[i]['_id'] === id) {
                products[i].inStock = !inStock;
                this.setState({...this.state, products: products})
                break;
            }
        }
        this.props.checkInStock(id, inStock);
    }

    render() {
        return (
            <div>
                <Row>
                    {/* <Col className={"text-center"}>
                        <Button color={"secondary"} className={"MenuJs-headButton"}>
                            <div>Phong/Ban [0/30]</div>
                            <div>B.1</div>
                        </Button>
                    </Col>
                    <Col className={"text-center"}>
                        <Button color={"secondary"} className={"MenuJs-headButton"}>
                            <div>Thuc Don</div>
                            <div>Tat ca</div>
                        </Button>
                    </Col> */}
                </Row>
                <Row className={"pt-3"}>
                    <ListGroup className={"w-100"}>
                        {
                            this.props.productType.map(type => {
                                return (
                                    <div key={type._id}>
                                        <ListGroupItemHeading className={"mt-2"}>
                                            {type.type}
                                        </ListGroupItemHeading>
                                        { this.state.products === null ? null :
                                            this.state.products.filter(product => product.type.type == type.type).map((product) => {
                                                // console.log(product);
                                                
                                            return (
                                                <ListGroupItem
                                                    key={product["_id"]}
                                                    className={"d-flex w-100 align-items-center p-0 pl-2"}
                                                >
                                                    <div>{product["name"]}</div>
                                                    <div className={"MenuJs-price"}>{product["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                                    </div>
                                                    <Button
                                                        disabled = {!product['inStock']}
                                                        color={"link"}
                                                        className={"ml-auto"}
                                                        onClick={() => this.props.addProduct(product)}
                                                        style={ this.props.addButton === true ? null : {'display': 'none'}}
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button 
                                                        className={"ml-auto"} 
                                                        style={this.props.inStockButton === true ? null : { 'display': 'none' }} 
                                                        color={product.inStock ? "danger" : 'success'} 
                                                        size="sm"
                                                        onClick={() => this.checkInStock(product['_id'], product.inStock)}
                                                    >
                                                        {product.inStock ? 'Báo hết hàng' : 'Báo còn hàng'}
                                                    </Button>
                                                </ListGroupItem>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }
                    </ListGroup>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.order.products,
        productType: state.order.productType,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => {
            dispatch(addProduct(product));
        },

        getProducts: () => {
            dispatch(getProducts());
        },
        getProductTypes: () => {
            dispatch(getProductTypes());
        },
        checkInStock: (productId, inStock) => {
            let product = Object.assign({}, {productId: productId, inStock: inStock})
            // console.log('product', product);
            dispatch(checkInStock(product));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

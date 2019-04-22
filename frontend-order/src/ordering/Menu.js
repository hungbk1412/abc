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
import {connect} from "react-redux";
import {addProduct, getProducts, getProductTypes} from "actions/orderActions";

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProductTypes();
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className={"text-center"}>
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
                    </Col>
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
                                        {
                                            this.props.products.filter(product => product.type.type == type.type).map((product) => {
                                            return (
                                                <ListGroupItem
                                                    key={product["_id"]}
                                                    className={"d-flex w-100 align-items-center p-0 pl-2"}
                                                >
                                                    <div>{product["name"]}</div>
                                                    <div className={"MenuJs-price"}>{product["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                                    </div>
                                                    <Button
                                                        color={"link"}
                                                        className={"ml-auto"}
                                                        onClick={() => this.props.addProduct(product)}
                                                    >
                                                        Add
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

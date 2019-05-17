import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import openSocket from 'socket.io-client';
import {
  removeDrink,
  increaseQuantity,
  decreaseQuantity,
  getTempOrders,
  takeNote
} from "actions/orderActions";
import "ordering/Bill.css";
import {storeApi} from '../constant';

class Bill extends React.Component {

  componentDidMount() {
    this.props.getTempOrders(this.props.username);
    const socket = openSocket(storeApi);
    socket.on('order', data => {
      if (data.action === 'checkItemDone') {
          this.props.getTempOrders(this.props.username)
      }
  }) 
  }

  takeNote = (product, e) => {
    this.props.takeNote(e.target.value, product);
  }

  render() {
    return (
      <div className={"overflow-auto"} id={"BillJs"}>
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
            {this.props.bill.map(product => {
              return (
                <tr key={product["name"]}>
                  <td>
                    <div>{product["name"]}</div>
                    <div className={"font-italic font-weight-light"}>
                      Ghi chú:
                      <input type='text' name='note' onBlur={this.takeNote.bind(this, product)} />
                    </div>
                  </td>
                  <td className={"text-center"}>
                    <Button
                      color={"link"}
                      onClick={() => this.props.inc(product)}
                    >
                      <i className={"fa fa-plus"} />
                    </Button>
                    {product["quantity"]}
                    <Button
                      color={"link"}
                      onClick={() => this.props.dec(product)}
                    >
                      <i className={"fa fa-minus"} />
                    </Button>
                  </td>
                  <td className={"text-center"}>{product["price"]}</td>
                  <td className={"text-center"}>
                    <span>{product["total"]}</span>
                    <Button
                      className={"ml-1"}
                      size={"sm"}
                      color={"link"}
                      onClick={() => this.props.remove(product)}
                    >
                      <i className={"fa fa-trash"} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          { this.props.tempOrders.map(order => {
              return (
                order.items.map(product => 
                  <tbody>
                    <tr key={product["_id"]}>
                      <td>
                        <div>{product["name"]}</div>
                      </td>
                      <td>
                        <div>{product["quantity"]}</div>
                      </td>
                      <td>
                        <div>{product['price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</div>
                      </td>
                      <td>
                        <div>{product['total'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</div>
                      </td>
                      <td>
                        <div>{product['served'] ? 'Đã phục vụ' : null}</div>
                      </td>
                    </tr>
                  </tbody>
                )
              )              
            })}          
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bill: state.order.bill.items,
    tempOrders: state.order.tempOrders.orders,
    username: state.auth.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTempOrders: (username) => {
      dispatch(getTempOrders(username));
    },
    remove: product => {
      dispatch(removeDrink(product));
    },
    inc: product => {
      dispatch(increaseQuantity(product));
    },
    dec: product => {
      dispatch(decreaseQuantity(product));
    },
    takeNote: (note, product) => {
      dispatch(takeNote(note, product));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bill);

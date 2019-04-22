import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import {
  removeDrink,
  increaseQuantity,
  decreaseQuantity
} from "actions/orderActions";
import "ordering/Bill.css";

class Bill extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"overflow-auto"} id={"BillJs"}>
        <Table>
          <thead>
            <tr>
              <th>Ten</th>
              <th className={"text-center"}>SL</th>
              <th className={"text-center"}>Don Gia</th>
              <th className={"text-center"}>Thanh Tien</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bill.map(product => {
              return (
                <tr key={product["name"]}>
                  <td>
                    <div>{product["name"]}</div>
                    <div className={"font-italic font-weight-light"}>
                      Ghi chu:
                      {(function() {
                        if (product["note"] == null) {
                          return " " + "None";
                        } else {
                          return " " + product["note"];
                        }
                      })()}
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
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bill: state.order.bill.items
  };
};
const mapDispatchToProps = dispatch => {
  return {
    remove: product => {
      dispatch(removeDrink(product));
    },
    inc: product => {
      dispatch(increaseQuantity(product));
    },
    dec: product => {
      dispatch(decreaseQuantity(product));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bill);

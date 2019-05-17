import React, { Component } from 'react';
import { Table, DatePicker } from 'antd';
import axios from '../../axios-store';
import moment from 'moment';

const {RangePicker} = DatePicker;

export class Bill extends Component {
  state = {
    bills: []
  }

  componentDidMount() {
    axios.get('/api/manager/get-final-bill/All').then((res) => {
      const bills = res.data
      this.setState({ bills: bills })
      // console.log('bills', bills)
    }).catch(err => {
      console.log(' :', err);
    })
    // console.log(moment("2019-05-14T16:22:59.683Z").format('HH:mm'));    
  } 

  onChange = (value, dateString) => {
    console.log('value :', value._d);
    console.log('dateString :', dateString);
  }

  render() {
    const columns = [
      {
        title: 'Ngày',
        dataIndex: 'time',
        sorter:  (a, b) => { return a.time.localeCompare(b.time) }
      },
      {
        title: 'VAT',
        dataIndex: 'vat',
      },
      {
        title: 'Giảm giá',
        dataIndex: 'discount',
      },
      {
        title: 'Tổng giá',
        dataIndex: 'totalPrice',
        sorter: (a, b) => {
          let aNum1 = a.totalPrice.replace(',', '');
          let aNum2 = aNum1.replace(' VND', '')
          let bNum1 = b.totalPrice.replace(',', '');
          let bNum2 = bNum1.replace(' VND', '')
          return Number(aNum2) - Number(bNum2)
        }
      }
    ]
    let data = [];    
    let bills = this.state.bills;
    let billsLength = bills.length;
    for (let i = 0; i < billsLength; i++) {
      const billInfo = {
        key: bills[i]._id,
        time: moment(bills[i].createdAt).format('YYYY-MM-DD HH:mm'),
        vat: bills[i].vat + '%',
        discount: bills[i].discount*100 + '%',
        totalPrice: bills[i].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND',
        items: bills[i].items
      }
      data.push(billInfo)
    }
    return (
      <>
        <DatePicker onChange={this.onChange} />
        <br />        
        <br />
        <RangePicker onChange={this.onChange} />
        <br />
        <br />
        <Table 
          columns={columns} 
          dataSource={data} 
          expandedRowRender = {record => {
            return record.items.map(item => <div>{item.name} : {item.quantity}</div>)
          }}  
        />
        {/* <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Thời gian</th>
                <th scope="col">VAT</th>
                <th scope="col">Giảm giá</th>
                <th scope="col">Tổng giá</th>
              </tr>
            </thead>
            <tbody>
                {this.state.bills.map(bill => 
                  <tr>
                    <td>{moment(bill.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                    <td>{bill.vat}%</td>
                    <td>{bill.discount * 100}%</td>                    
                    <td>{bill.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div> */}
      </>
    )
  }
}

export default Bill;

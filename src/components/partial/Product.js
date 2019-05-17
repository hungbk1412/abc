import React, { Component } from 'react'
import axios from '../../axios-store';
import {Table, Button} from 'antd';

export class Product extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get('/api/order/products').then((res) => {
      const products = res.data
      this.setState({ products: products })
      console.log('products : ', products )
    }).catch(err => {
      console.log(' :', err);
    })
    // console.log(moment("2019-05-14T16:22:59.683Z").format('HH:mm'));    
  } 
  render() {
    const columns = [
      {
        title: 'Tên',
        dataIndex: 'name'
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price
      },
      {
        title: 'Loại',
        dataIndex: 'type',
        sorter: (a, b) => { return a.type.localeCompare(b.type) }
      },
      {
        title: 'Hành động',
        dataIndex: '',
        key: 'action',
        render: () => 
        <div>
          <Button type="primary">Sửa</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="danger">Xóa</Button>
        </div>
      },
    ]
    let data = [];
    let products = this.state.products;
    let productsLength = products.length;
    for (let i = 0; i < productsLength; i++) {
      const userInfo = {
        key: products[i]._id,
        name: products[i].name,
        price: products[i].price,
        type: products[i].type.type       
      }
      data.push(userInfo);
    }
    return (
      <>
        <Button type="primary">Thêm đồ uống mới</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary">Thêm loại đồ uống mới</Button>
        <br />
        <br />
        <Table columns={columns} dataSource={data} />
      </>
    )
  }
}

export default Product

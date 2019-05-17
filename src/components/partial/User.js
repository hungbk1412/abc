import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-store';
import {Table, Button, Popconfirm, Input, Radio} from 'antd';
const RadioGroup = Radio.Group;

export class User extends Component {
  state = {
    isAddingNew: false,
    isEditing: false,
    newUser: {},
    users: []
  }

  componentDidMount() {
    axios.get('/api/manager/get-user').then((res) => {
      const users = res.data
      this.setState({ users: users })
    }).catch(err => {
      console.log(' :', err);
    })
    // console.log(moment("2019-05-14T16:22:59.683Z").format('HH:mm'));    
  }
  nameHandler = (e) => {
    const newUser = Object.assign({}, this.state.newUser);
    this.setState({newUser: {...newUser, username: e.target.value}})
  }
  passHandler = (e) => {
    const newUser = Object.assign({}, this.state.newUser);
    this.setState({newUser: {...newUser, password: e.target.value}})
  }
  roleHandler = async (e) => {
    const newUser = Object.assign({}, this.state.newUser);
    await this.setState({newUser: {...newUser, role_id: e.target.value}})
  }
  activeHandler = async (e) => {
    // console.log('e.target.value :', e.target.value);
    const newUser = Object.assign({}, this.state.newUser);
    await this.setState({newUser: {...newUser, isActive: e.target.value}})
    // console.log('this.state.newEmployee', this.state.newEmployee)
  }
  edit = (record) => {  
    record.isActive = JSON.parse(record.isActive)
    this.setState({newUser: record});
    this.setState({isEditing: true});
  }
  confirmAdd = () => {
    let newUser = Object.assign({}, this.state.newUser);
    axios.post('/api/manager/new-user', newUser).then(() => {
      let users = this.state.users;
      newUser = {...newUser, isActive: true};
      users.push(newUser);
      this.setState({isAddingNew: false, users: users})
    }).catch(err => {console.log('err :', err);})
  }
  confirmEdit = () => {
    let newUser = Object.assign({}, this.state.newUser);
    console.log('newUser :', newUser);
    axios.post('/api/manager/edit-user', newUser).then(() => {
      let users = this.state.users;
      let index = users.findIndex(employee => employee._id === newUser.key)
      users[index] = {...newUser, _id: newUser.key};
      this.setState({ users: users, isEditing: false });
    }).catch(err => {console.log('err', err)})
  }
  render() {
    const form = {
      maxWidth: '500px'
    }
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username'
      },
      {
        title: 'Role ID',
        dataIndex: 'role_id',
        sorter: (a, b) => a.role - b.role
      },
      {
        title: 'Is active?',
        dataIndex: 'isActive'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: (text, record) => 
        <div>
          <Button onClick={() => this.edit(record)} type="primary">Sửa</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title='Sure to delete?' onConfirm={() => this.deleteHandler(record.key)} >
            <Button type="danger">Xóa</Button>
          </Popconfirm>          
        </div>
      },
    ]
    let data = [];
    let users = this.state.users;
    let usersLength = users.length;
    for (let i = 0; i < usersLength; i++) {
      const userInfo = {
        key: users[i]._id,
        username: users[i].username,
        role_id: users[i].role_id,
        isActive: users[i].isActive.toString()     
      }
      data.push(userInfo);
    }
    return (
      <>
        <Button onClick={() => this.setState({isAddingNew: true})} type="primary">Thêm tài khoản mới</Button>
        <br />
        <br />
        {(this.state.isAddingNew || this.state.isEditing) ? 
          <div id = {'form'} style ={form}>
            <p>Username: <Input value={this.state.newUser.username} onChange={this.nameHandler} /> </p>
            <p>Password: <Input.Password onChange={this.passHandler} /> </p>
            <p>Role: <RadioGroup defaultValue={this.state.newUser.role_id ? this.state.newUser.role_id : null} name='radiogroup' onChange={this.roleHandler}>
                <Radio value={1}>1 - Account tại bàn cho khách đặt</Radio>
                <Radio value={2}>2 - Account quầy bar / bếp</Radio>
                <Radio value={3}>3 - Account thu ngân</Radio>
                <Radio value={4}>4 - Account quản lý</Radio>
              </RadioGroup>
            </p>
            {this.state.isEditing ? 
              <p>
                Is active? &nbsp;&nbsp;
                <RadioGroup defaultValue={this.state.newUser.isActive} name='radiogroup' onChange={this.activeHandler}>
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
                </RadioGroup>
              </p> : null}
            <p>
              <Button onClick={!this.state.isEditing ? this.confirmAdd : this.confirmEdit} type='primary'>Xác nhận</Button>&nbsp;&nbsp;
              <Button onClick={() => this.setState({ isAddingNew: false, isEditing: false, newUser: {} })} type='danger'>Cancel</Button>
            </p>
          </div> : null}
        <Table columns={columns} dataSource={data} />
      </>
    )
  }
}

export default User

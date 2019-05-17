import React, { Component } from 'react';
import axios from '../../axios-store';
import {Table, Button, Input, InputNumber, Radio, DatePicker, Popconfirm} from 'antd';
import moment from 'moment';
import '../../stylesheet/User.css'
const RadioGroup = Radio.Group;
export class Employee extends Component {
  state = {
    isAddingNew: false,
    isEditing: false,
    newEmployee: {},
    employees: []
  }
  nameHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, fullName: e.target.value}})
  }
  genderHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, gender: e.target.value}})
  }
  phoneHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, phone: e.target.value}})
  }
  emailHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, email: e.target.value}})
  }
  birthdayHandler = (date, dateString) => {
    console.log('date', date)
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, birthday: dateString}})
  }
  roleHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, role: e.target.value}})
  }
  salaryRateHandler = (e) => {
    const newEmployee = Object.assign({}, this.state.newEmployee);
    this.setState({newEmployee: {...newEmployee, salaryRate: e}});
  }
  activeHandler = async (e) => {
    // console.log('e.target.value :', e.target.value);
    const newEmployee = Object.assign({}, this.state.newEmployee);
    await this.setState({newEmployee: {...newEmployee, isActive: e.target.value}})
    // console.log('this.state.newEmployee', this.state.newEmployee)
  }
  confirmAdd = () => {
    let newEmployee = Object.assign({}, this.state.newEmployee);
    axios.post('/api/manager/new-employee', newEmployee).then(() => {
      let employees = this.state.employees;
      newEmployee = {...newEmployee, isActive: true};
      employees.push(newEmployee);
      this.setState({isAddingNew: false, employees: employees});
    }).catch(err => {
      console.log('err :', err);
    })
  }
  edit = (record) => {  
    window.location.href = '#form'
    if (record.isActive === 'Đang hoạt động') {
      record.isActive = true;
    } else if (record.isActive === 'Ngưng hoạt động') {
      record.isActive = false
    }
    this.setState({newEmployee: record});
    this.setState({isEditing: true});
  }
  confirmEdit = () => {
    let newEmployee = Object.assign({}, this.state.newEmployee);
    axios.post('/api/manager/edit-employee', newEmployee).then(() => {
      let employees = this.state.employees;
      let index = employees.findIndex(employee => employee._id === newEmployee.key)
      employees[index] = {...newEmployee, _id: newEmployee.key};
      this.setState({ employees: employees, isEditing: false });
    }).catch(err => {console.log('err', err)})
  }
  getEmployees = () => {
    axios.get('/api/manager/get-employee').then((res) => {      
      const employees = res.data
      this.setState({ employees: employees })      
    }).catch(err => {
      console.log('err :', err);
    })
  }
  deleteHandler = (key) => {
    axios.post('/api/manager/delete-employee', {_id: key}).then(() => {
      let employees = this.state.employees;
      let index = employees.findIndex(employee => employee._id === key)
      employees.splice(index, 1);
      this.setState({ employees: employees })
    }).catch(err => {
      console.log('err :', err);
    })
  }
  componentDidMount() {
    this.getEmployees(); 
    // console.log(moment('14-12-1996', 'DD-MM-YYYY').format('MM/DD/YYYY'));    
  } 
  render() {
    const form = {
      maxWidth: '500px'
    }
    const columns = [
      {
        title: 'Họ và tên',
        dataIndex: 'fullName'
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        sorter:  (a, b) => { return a.gender.localeCompare(b.gender) }
      },
      {
        title: 'SDT',
        dataIndex: 'phone'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Sinh nhật',
        dataIndex: 'birthday',
        sorter:  (a, b) => { return (moment(a.birthday, 'DD/MM/YYYY').format('MM/DD')).localeCompare(moment(b.birthday, 'DD/MM/YYYY').format('MM/DD')) }
      },
      {
        title: 'Chức vụ',
        dataIndex: 'role',
        sorter:  (a, b) => { return a.role.localeCompare(b.role) }
      },
      {
        title: 'Lương (nghìn VNĐ/h)',
        dataIndex: 'salaryRate',
        sorter: (a, b) => {
          let aNum = a.salaryRate.replace(',', '');
          let bNum = b.salaryRate.replace(',', '');
          return Number(aNum) - Number(bNum)
        }
      },
      {
        title: 'Trạng thái',
        dataIndex: 'isActive'
      },      
      {
        title: 'Hành động',
        dataIndex: '',
        key: 'action',
        render: (text, record) => 
        <div>
          <Button type="primary" onClick={() => this.edit(record)}>Sửa</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title='Sure to delete?' onConfirm={() => this.deleteHandler(record.key)} >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </div>
      },
    ]
    let data = [];
    let employees = this.state.employees;
    let employeesLength = employees.length;
    for (let i = 0; i < employeesLength; i++) {
      const userInfo = {
        key: employees[i]._id,
        fullName: employees[i].fullName,
        phone: employees[i].phone,
        email: employees[i].email,
        role: employees[i].role,
        gender: employees[i].gender,
        birthday: employees[i].birthday,
        salaryRate: employees[i].salaryRate ? employees[i].salaryRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null,
        isActive: employees[i].isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'        
      }
      data.push(userInfo);
    }
    return (
      <>
        <Button onClick={() => this.setState({isAddingNew: true})} type="primary">Thêm nhân viên mới</Button>
        <br />
        <br />
        {(this.state.isAddingNew || this.state.isEditing) ?
          <div id={'form'} style={form}>
            <p>Họ và tên: <Input value={this.state.newEmployee.fullName} onChange={this.nameHandler} /></p>
            <p> Giới tính: <RadioGroup value={this.state.newEmployee.gender} name='radiogroup' onChange={this.genderHandler}>
              <Radio value={'Nam'}>Nam</Radio>
              <Radio value={'Nữ'}>Nữ</Radio>
            </RadioGroup></p>
            <p>SĐT: <Input value={this.state.newEmployee.phone} onChange={this.phoneHandler} /></p>
            <p>Email: <Input value={this.state.newEmployee.email} onChange={this.emailHandler} /></p>
            <p>Sinh nhật: <DatePicker value={moment(this.state.newEmployee.birthday)} onChange={this.birthdayHandler} /></p>
            <p>Chức vụ: 
              <RadioGroup value={this.state.newEmployee.role} name='radiogroup' onChange={this.roleHandler}>
                <Radio value={'Phục vụ'}>Phục vụ</Radio>
                <Radio value={'Thu ngân'}>Thu ngân</Radio>
                <Radio value={'Pha chế / nhà bếp'}>Pha chế / nhà bếp</Radio>
                <Radio value={'Bảo vệ'}>Bảo vệ</Radio>
                <Radio value={'Kế toán'}>Kế toán</Radio>
                <Radio value={'Quản lý'}>Quản lý</Radio>
              </RadioGroup>
            </p>
            {this.state.isEditing ? 
              <p>Trạng thái: <RadioGroup name='radiogroup' defaultValue={this.state.newEmployee.isActive} onChange={this.activeHandler}>
                  <Radio value={true}>Đang hoạt động</Radio>
                  <Radio value={false}>Ngưng hoạt động</Radio>
                </RadioGroup>
              </p> : null}
            <p>Mức lương (nghìn VNĐ/h): <InputNumber value={this.state.newEmployee.salaryRate} onChange={this.salaryRateHandler} /></p>
            <p>
              <Button onClick={!this.state.isEditing ? this.confirmAdd : this.confirmEdit} type='primary'>Xác nhận</Button>&nbsp;&nbsp;
              <Button onClick={() => this.setState({ isAddingNew: false, isEditing: false, newEmployee: {} })} type='danger'>Cancel</Button>
            </p>
          </div> : null }
        <br />
        <br />
        <Table columns={columns} dataSource={data} />
      </>
    )
  }
}

export default Employee;

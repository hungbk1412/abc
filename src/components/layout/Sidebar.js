import React, { Component } from 'react';
import '../../stylesheet/layout/Sidebar.css';
import SidebarLink from '../partial/SidebarLink';
import { links } from '../../utils/links';

class Sidebar extends Component {
  state = {
    isSidebarFull: true
  }
  render() {
    let sidebarClass = this.state.isSidebarFull ? 'sidebar is-full' : 'sidebar';
    return (
      <div className={sidebarClass}>
        <div className="sidebar-header" >
          <img src="/images/react-logo.png" alt="" />
          <h1 hidden={!this.state.isSidebarFull}>HungNT</h1>
        </div>
        <div className="sidebar-links">
          <ul className="navbar-nav">
            {
              links.map((menu, index) => {
                return menu
                  ? <SidebarLink
                    to={menu.to}
                    icon={menu.icon}
                    label={menu.label}
                    key={index}
                    exact={menu.exact}
                    isSidebarFull={this.state.isSidebarFull}
                  />
                  : ''
              })
            }
          </ul>
        </div>
        <div className="sidebar-footer">

        </div>
        <div className="toggle-sidebar">
          <i hidden={this.state.isSidebarFull} onClick={() => this.setState({ isSidebarFull: true })}>
            <svg viewBox="64 64 896 896" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
          </i>
          <i hidden={!this.state.isSidebarFull} onClick={() => this.setState({ isSidebarFull: false })}>
            <svg viewBox="64 64 896 896" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path></svg>
          </i>
        </div>
      </div>
    )
  }
}

export default Sidebar

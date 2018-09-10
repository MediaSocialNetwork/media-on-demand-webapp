import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Identicon } from 'ui/elements'

import {
  BillingIcon,
  DashboardIcon,
  PaymentIcon,
  ProjectListIcon,
  SignOutIcon,
  UiIcon
} from 'ui/icons'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 1;
`

const Surface = styled.div`
  position: absolute;
  width: 256px;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1;
  transform: ${
    ({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'
  };
`

const Content = styled.div`
  display: grid;
  grid-template-rows: 96px 1fr;
  height: 100%;
`

const List = styled.ul`
  display: grid;
  grid-template-columns: 100%
  grid-auto-rows: 32px;
`

List.Item = styled.li`
  display: grid;
  grid-template-columns: 32px 1fr;
`

List.Icon = styled.div`
  display: flex;
  align-items: center;
`

List.Text = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  line-height: 32px;
`

const Profile = styled.div`
  position: relative;
`

const UserName = styled.div`
  height: 64px;
  background: #666;
  font-size: 12px;
  padding: 32px 8px 0 80px;
  line-height: 32px;
  color: #fff;
`

const UserEmail = styled.div`
  line-height: 16px;
  font-size: 10px;
  padding: 0 8px 0 80px;
`

const UserAvatar = styled.div`
  position: absolute;
  background: white;
  width: 64px;
  height: 64px;
  bottom: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Menu = ({
  open = true,
  signOut,
  toDashboard,
  toProjectList
}) => (
  <Fragment>
    { open && <Overlay /> }
    <Surface open={ open }>
      <Content>
        <Profile className="profile">
          <UserName>Peter Smith</UserName>
          <UserEmail>d@dapps.me</UserEmail>
          <UserAvatar>
            <Identicon circle size={ 56 } id="d@dapps.me" />
          </UserAvatar>
        </Profile>
        <div className="menu">
          <List>
            <List.Item onClick={ toDashboard }>
              <List.Icon>
                <DashboardIcon />
              </List.Icon>
              <List.Text>
                Dashboard
              </List.Text>
            </List.Item>
            <List.Item onClick={ toProjectList }>
              <List.Icon>
                <ProjectListIcon />
              </List.Icon>
              <List.Text>
                Projects
              </List.Text>
            </List.Item>
            <List.Item>
              <List.Icon>
                <BillingIcon />
              </List.Icon>
              <List.Text>
                Billing
              </List.Text>
            </List.Item>
            <List.Item>
              <List.Icon>
                <PaymentIcon />
              </List.Icon>
              <List.Text>
                Payment Methods
              </List.Text>
            </List.Item>
            <List.Item onClick={ signOut }>
              <List.Icon>
                <SignOutIcon />
              </List.Icon>
              <List.Text>
                Sign Out
              </List.Text>
            </List.Item>
          </List>
        </div>
      </Content>
    </Surface>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    toDashboard: () => actions.requestLocation('/'),
    toProjectList: () => actions.requestLocation('/projects'),
    toUI: () => actions.requestLocation('/ui'),
    signOut: () => actions.closeLayout()
  })
)(Menu)

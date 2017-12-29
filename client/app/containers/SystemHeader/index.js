import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { MorphReplace } from 'react-svg-morph'

// icons
import IconMenu from 'react-icons/lib/md/menu'
import IconClose from 'react-icons/lib/md/chevron-right'

// internal
import { toggleSystemDrawer } from 'actions/drawer'
import { COLOR } from 'styles/constants'

// local
import style from './style'

@connect(state => {
  const menu = state.burgerMenu['layout/SYSTEM']

  return {
    showMenu: menu ? menu.isOpen : false
  }
})
@Radium
class SystemHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openSystemMenu = this._openSystemMenu.bind(this)
  }

  render() {
    const { showMenu } = this.props

    return (
      <nav style={style.wrapper}>
        <figure style={style.menuIcon} onClick={this._openSystemMenu(!showMenu)}>
          <MorphReplace width={24} height={24} fill={COLOR.light.string()}>
            { showMenu ?
              <IconClose key="IconClose" /> :
              <IconMenu key="IconMenu" />
            }
          </MorphReplace>
        </figure>
      </nav>
    )
  }

  _openSystemMenu(showMenu) {
    const { dispatch } = this.props

    return () => dispatch(toggleSystemDrawer(showMenu))
  }
}

export default SystemHeader

import React from 'react'

import * as model from '../actions/model'
import { consolidate } from '../actions/util'

import Action from './Action'


const MAC = window.navigator.platform.match(/Mac/) !== null


const MenuAction = Action(({ action, ...props }) => {
    const key = action.key ? renderKey(action.key) : null

    return <div
        className="item"
        {...props}
        >
        <span className="title">{action.title}</span>
        {key}
    </div>
})


export default class MenuBar extends React.Component {
    state = {
        menus: consolidate(this.props.actions),
        open: null,
    }

    render() {
        const { menus, open } = this.state
        const { value, onChange } = this.props

        const className = open !== null ? 'menubar open' : 'menubar'

        return <div className={className}>
            {menus.map((menu, index) =>
                <div key={menu.title} className="topmenu" data-index={index}>
                    <span
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onOpenMenu}
                        onMouseOver={this.onOpenMenu}
                        >{menu.title}</span>
                    <Menu
                        menu={menu}
                        open={menu === open}
                        value={value}
                        onChange={onChange}
                        dismiss={this.onCloseMenus}
                        />
                </div>
            )}
            <div className="overlay" onMouseDown={this.onCloseMenus} />
        </div>
    }

    onMouseDown = ev => {
        // To prevent browser from moving focus (and thus removing selection).
        ev.preventDefault()
    }

    onOpenMenu = ev => {
        // We only want to open a menu on hover if there's already a menu open.
        if (ev.type === 'mouseover' && this.state.open === null) {
            return
        }

        const index = ev.target.parentElement.dataset.index
        const menu = this.state.menus[index] || null

        this.setState({ open: menu })
    }

    onCloseMenus = ev => {
        // To prevent browser from moving focus (and thus removing selection).
        if (ev) ev.preventDefault()
        this.setState({ open: null })
    }
}


class Menu extends React.Component {
    render() {
        const { items } = this.props.menu

        const className = this.props.open ? 'menu open' : 'menu'

        return <div className={className}>
            {items.map(item => this[item.$$typeof](item))}
        </div>
    }

    [model.GROUP](group) {
        if (group.title) {
            const { value, onChange, dismiss } = this.props

            return <SubMenu
                menu={group}
                value={value}
                onChange={onChange}
                dismiss={dismiss}
                />
        }

        return <div className="group">
            {group.items.map(item => this[item.$$typeof](item))}
        </div>
    }

    [model.ACTION](action) {
        const { value, onChange, dismiss } = this.props

        return <MenuAction
            key={action.title}
            action={action}
            value={value}
            onChange={onChange}
            onClick={dismiss}
            />
    }
}


class SubMenu extends React.Component {
    state = {
        open: false,
    }

    render() {
        const { menu, value, onChange, dismiss } = this.props

        return <div className="sub-menu">
            <div className="item"
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                >
                <span className="title">{menu.title}</span>
                <i className="material-icons">arrow_right</i>
            </div>
            <Menu
                menu={menu}
                value={value}
                open={this.state.open}
                onChange={onChange}
                dismiss={dismiss}
                />
        </div>
    }

    // Prevent focus from moving
    onMouseDown = ev => ev.preventDefault()

    onMouseUp = () => {
        this.setState({ open: true })
    }
}


function renderKey(key) {
    const parts = key.replace(/\b\w/g, x => x.toUpperCase()).split('+')

    if (parts[0] === 'Mod') {
        if (MAC) {
            const i = parts.length - 2
            parts.shift()
            parts[i] = '\u2318' + parts[i]
        } else {
            parts[0] = 'Ctrl'
        }
    }

    return <span className="key">{parts.join('+')}</span>
}

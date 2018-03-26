import React from 'react'

import * as model from './index'


function createGroup({ title, category }, children) {
    return model.group(title, category, children)
}


function createAction({ title, ...attrs }, children) {
    if (children.length > 0) {
        throw new Error("Actions can't have children")
    }

    return model.action(title, attrs)
}


function createWidget(f, ...args) {
    const v = f(...args)

    return model.is(v) ? v : model.widget(v)
}


export function createBuilder(native) {
    return function builder(type, attributes, ...children) {
        attributes = attributes || {}

        switch (type) {
        case 'group':   return createGroup(attributes, children)
        case 'action':  return createAction(attributes, children)
        default:        break
        }

        // In React all class components must extend React.Component, in which
        // case their prototype will be React.Component.prototype. For all
        // functions and root classes it will be Function.prototype.
        const isClass = Reflect.getPrototypeOf(type) !== Function.prototype
        if (typeof type === 'function' && !isClass) {
            return createWidget(type, { children, ...attributes })
        }

        return createWidget(native, type, attributes, ...children)
    }
}
export default createBuilder(React.createElement)

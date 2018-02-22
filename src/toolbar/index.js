import React from 'react'

import { deriveActions } from '../actions/slate'

import ToolBar from './ToolBar'


export default () => ({
    renderEditor({ children, value, plugins, ...props }, editor) {
        const actions = deriveActions(plugins)

        return <React.Fragment>
            <ToolBar
                actions={actions}
                value={value}
                onChange={editor.onChange}
                />
            {children}
        </React.Fragment>
    }
})

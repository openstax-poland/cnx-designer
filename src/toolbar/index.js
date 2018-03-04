import React from 'react'

import { deriveActions } from '../actions/slate'

import ToolBar from './ToolBar'


export default () => ({
    renderEditor({ children, value, plugins, ...props }, editor) {
        const actions = deriveActions(plugins)

        return <React.Fragment>
            <div className="system-panels">
                <ToolBar
                    actions={actions}
                    value={value}
                    onChange={editor.onChange}
                    />
            </div>
            <div className="document">
                {children}
            </div>
        </React.Fragment>
    }
})

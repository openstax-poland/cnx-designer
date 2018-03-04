import React from 'react'

import { deriveActions } from '../actions/slate'

import ToolBar from './ToolBar'
import MenuBar from './MenuBar'


export default () => ({
    renderEditor({ children, value, plugins, ...props }, editor) {
        const actions = deriveActions(plugins)

        return <React.Fragment>
            <div className="system-panels">
                <MenuBar
                    actions={actions}
                    value={value}
                    onChange={editor.onChange}
                    />
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

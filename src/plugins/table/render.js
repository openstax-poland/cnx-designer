// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import * as React from 'react'

export default function renderBlock({ node, children }, _, next) {
    switch (node.type) {
    case 'table': {
        const classes = ['table']
        if (node.data.has('frame')) {
            classes.push(`frame--${node.data.get('frame')}`)
        }
        if (node.data.has('colsep')) {
            classes.push(`colsep--${Boolean(node.data.get('colsep'))}`)
        }
        if (node.data.has('rowsep')) {
            classes.push(`rowsep--${Boolean(node.data.get('rowsep'))}`)
        }
        return <div className={classes.join(' ')}>
            {children}
        </div>
    }

    case 'table_summary':
        return <div className="table__summary">
            {children}
        </div>

    case 'table_caption':
        return <div className="table__caption">
            {children}
        </div>

    case 'table_tgroup': {
        const attrs = {}
        if (node.data.has('char')) {
            attrs['data-char'] = node.data.get('char')
            attrs['data-charoff'] = node.data.get('charoff') || 50
        }

        const classes = ['table__tgroup']
        if (node.data.has('frame')) {
            classes.push(`frame--${node.data.get('frame')}`)
        }
        if (node.data.has('align')) {
            classes.push(`colsep--${node.data.get('align')}`)
        }
        if (node.data.has('char')) {
            classes.push(`char--${node.data.get('char')}`)
        }
        return <table className={classes.join(' ')} {...attrs}>
            {children}
        </table>
    }

    case 'table_colspec':
        return <div className="table__colspec">
            {children}
        </div>

    case 'table_spanspec':
        return <div className="table__spanspec">
            {children}
        </div>

    case 'table_thead': {
        const classes = ['table__thead']
        if (node.data.has('valign')) {
            classes.push(`valign--${node.data.get('valign')}`)
        }
        return <thead className={classes.join(' ')}>
            {children}
        </thead>
    }

    case 'table_tbody': {
        const classes = ['table__tbody']
        if (node.data.has('valign')) {
            classes.push(`valign--${node.data.get('valign')}`)
        }
        return <tbody className={classes.join(' ')}>
            {children}
        </tbody>
    }

    case 'table_tfoot': {
        const classes = ['table__tfoot']
        if (node.data.has('valign')) {
            classes.push(`valign--${node.data.get('valign')}`)
        }
        return <tfoot className={classes.join(' ')}>
            {children}
        </tfoot>
    }

    case 'table_row': {
        const classes = ['table__row']
        if (node.data.has('rowsep')) {
            const val = node.data.get('rowsep') === '0' ? 'false' : 'true'
            classes.push(`rowsep--${val}`)
        }
        if (node.data.has('valign')) {
            classes.push(`valign--${node.data.get('valign')}`)
        }
        return <tr className={classes.join(' ')}>
            {children}
        </tr>
    }

    case 'table_entry': {
        const attrs = {}
        if (node.data.has('char')) {
            attrs['data-char'] = node.data.get('char')
            attrs['data-charoff'] = node.data.get('charoff') || 50
        }

        const classes = ['table__entry']
        if (node.data.has('align')) {
            classes.push(`align--${node.data.get('align')}`)
        }
        if (node.data.has('colsep')) {
            classes.push(`colsep--${Boolean(node.data.get('colsep'))}`)
        }
        if (node.data.has('rowsep')) {
            classes.push(`rowsep--${Boolean(node.data.get('rowsep'))}`)
        }
        if (node.data.has('valign')) {
            classes.push(`valign--${node.data.get('valign')}`)
        }
        return <td className={classes.join(' ')} {...attrs}>
            {children}
        </td>
    }

    default:
        return next()
    }
}

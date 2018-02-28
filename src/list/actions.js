/** @jsx createMenu */

import createMenu from '../actions'
import { changeListType } from './changes'


export default ({ list }) => <group category="List">
    <action
        title="Bullet list"
        icon="format_list_bulleted"
        action={change => change.call(changeListType, list, 'ul_list')}
        />
    <action
        title="Numbered list"
        icon="format_list_numbered"
        action={change => change.call(changeListType, list, 'ol_list')}
        />
    <action
        title="Increase list level"
        key="tab"
        icon="format_indent_increase"
        action={list.changes.increaseItemDepth}
        />
    <action
        title="Decrease list level"
        key="shift+tab"
        icon="format_indent_decrease"
        action={list.changes.decreaseItemDepth}
        />
</group>

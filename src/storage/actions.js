/** @jsx createMenu */

import createMenu from '../actions'

import SaveIcon from './SaveIcon'


export default storage => <group category="Document">
    <action
        title="Save"
        key="mod+s"
        icon="save"
        enabled={value => !storage.current(value)}
        action={change => storage.write(change.value)}
        handler={SaveIcon}
        />
</group>

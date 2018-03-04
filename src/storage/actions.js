/** @jsx createMenu */

import createMenu from '../actions'


export default storage => <group category="Document">
    <action
        title="Save"
        key="mod+s"
        icon="save"
        enabled={value => !storage.current(value)}
        action={change => storage.write(change.value)}
        />
</group>

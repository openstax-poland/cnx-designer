import React from 'react'

import Load from '../components/Load'
import Editor from '../editor'
import Storage from '../storage'
import PersistDB from '../persistence/db'

async function loader({ match }) {
    const id = match.params.id

    const [persist, storage] = await Promise.all([
        PersistDB.load(id),
        Storage.load(id),
    ])

    let value

    if (persist.dirty) {
        value = await persist.restore()
    } else {
        value = await storage.read()
        await persist.save(value, 'test')
    }

    return { persist, storage, value }
}

export default Load(loader)(Editor)

import React from 'react'

import Load from '../components/Load'
import Editor from '../editor'
import Storage from '../storage'

async function loader({ match }) {
    const storage = await Storage.load(match.params.id)
    const value = await storage.read()
    return { storage, value }
}

export default Load(loader)(Editor)

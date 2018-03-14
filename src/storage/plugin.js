import actions from './actions'
import renderEditor from './render'


export default function Storage({ storage }) {
    return {
        actions: actions(storage),
        storage: storage,
        renderEditor: renderEditor(storage),
    }
}

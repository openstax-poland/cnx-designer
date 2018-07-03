import renderEditor from './render'

export default function Storage({ storage }) {
    return {
        renderEditor: renderEditor(storage),
    }
}

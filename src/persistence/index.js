import { mark } from './changes'

export default function Persistence(options) {
    const { db } = options

    return {
        onChange: change => mark(db, change),
    }
}

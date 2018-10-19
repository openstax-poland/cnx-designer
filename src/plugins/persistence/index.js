import { onChange } from './handlers'

/**
 * @param {DocumentDB} options.db
 */
export default function Persistence(options) {
    const { db } = options

    return {
        onChange: onChange(db),
    }
}

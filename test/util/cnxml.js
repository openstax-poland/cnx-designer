export default global.cnxml = function cnxml(fragments) {
    if (fragments.length > 1) {
        throw new Error('cnxml`` does not support interpolation')
    }

    return `<document>
        <content>
            ${fragments[0]}
        </content>
    </document>`
}

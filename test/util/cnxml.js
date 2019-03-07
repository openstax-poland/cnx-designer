export default global.cnxml = function cnxml(fragments) {
    if (fragments.length > 1) {
        throw new Error('cnxml`` does not support interpolation')
    }

    return `<document xmlns="http://cnx.rice.edu/cnxml">
        <content>
            ${fragments[0]}
        </content>
    </document>`
}

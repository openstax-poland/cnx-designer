export default global.cnxml = function cnxml(fragments) {
    if (fragments.length > 1) {
        throw new Error('cnxml`` does not support interpolation')
    }

    return `<document xmlns="http://cnx.rice.edu/cnxml" xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0">
        <content>
            ${fragments[0]}
        </content>
    </document>`
}

export function mimeToRegExp(pattern) {
    const pattern2exp = pattern => pattern.replace('*', '.*')

    return RegExp(pattern.split(',').map(pattern2exp).join('|'))
}

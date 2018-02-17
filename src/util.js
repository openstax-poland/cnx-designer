const MAC = window.navigator.platform.match(/Mac/) !== null


export function Shortcut(pattern, fn) {
    const matcher = pattern.split('+').reduce((matcher, part) => {
        switch (part) {
        case 'alt':
            return ev => ev.altKey && matcher(ev)

        case 'mod':
            return ev => (MAC ? ev.metaKey : ev.ctrlKey) && matcher(ev)

        case 'shift':
            return ev => ev.shiftKey && matcher(ev)

        default: return ev => ev.key.toLowerCase() === part && matcher(ev)
        }
    }, _ => true)

    return {
        onKeyDown(event, change, editor) {
            if (matcher(event)) {
                change.call(fn)
                event.stopPropagation();
                event.preventDefault();
                return true
            }
        }
    }
}

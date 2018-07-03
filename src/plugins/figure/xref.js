export default function renderXRef(target, coutners) {
    switch (target.type) {
    case 'figure':
        return `Figure ${coutners.get('figure')}`
    }
}

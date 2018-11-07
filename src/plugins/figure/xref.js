// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function renderXRef(target, coutners) {
    switch (target.type) {
    case 'figure':
        return `Figure ${coutners.get('figure')}`
    }
}

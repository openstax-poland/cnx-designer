// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const r = new Uint8Array(16);
function s(start, end) {
    return Array.from(r.subarray(start, end), x => x.toString(16).padStart(2, '0')).join('');
}
export function v4() {
    window.crypto.getRandomValues(r);
    r[6] = 0x40 | (r[6] & 0x0f);
    r[8] = 0x40 | (r[8] & 0x3f);
    return `${s(0, 4)}-${s(4, 6)}-${s(6, 8)}-${s(8, 10)}-${s(10, 16)}`;
}

import { Operation } from 'slate';
import { CnxEditor } from './plugin';
export default function apply(apply: (op: Operation) => void, editor: CnxEditor, op: Operation): void;

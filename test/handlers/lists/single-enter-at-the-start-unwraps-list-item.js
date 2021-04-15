/** @jsx h */

export default input => input.break()

export const input = <editor>
    <itemlist>
        <li>
            <p><cursor/>Some text</p>
        </li>
    </itemlist>
</editor>

export const output = <editor>
    <itemlist>
        <li>
            <p><text/></p>
        </li>
        <li>
            <p><cursor/>Some text</p>
        </li>
    </itemlist>
</editor>

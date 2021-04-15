/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <itemlist>
        <li>
            <p>Some<cursor/>text</p>
        </li>
    </itemlist>
</editor>

export const output = <editor>
    <itemlist>
        <li>
            <p>Some</p>
        </li>
        <li>
            <p><cursor/>text</p>
        </li>
    </itemlist>
</editor>

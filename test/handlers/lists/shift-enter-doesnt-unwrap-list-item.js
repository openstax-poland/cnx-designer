/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

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
            <p><text/></p>
            <p><cursor/>text</p>
        </li>
    </itemlist>
</editor>

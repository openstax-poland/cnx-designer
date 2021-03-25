/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Pro<cursor/>blem</p>
        </exproblem>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Pro</p>
            <p><text/></p>
            <p><cursor/>blem</p>
        </exproblem>
    </exercise>
</editor>

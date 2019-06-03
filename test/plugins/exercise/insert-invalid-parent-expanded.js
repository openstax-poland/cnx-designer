/** @jsx h */

export default editor => editor.insertExercise()

export const input = <value>
    <document>
        <ul>
            <li>
                <p>First list</p>
            </li>
            <li>
                <p>It has four <anchor/>items</p>
            </li>
            <li>
                <p>Of which this is<focus/> third</p>
            </li>
            <li>
                <p>And this is fourth</p>
            </li>
        </ul>
    </document>
</value>

export const output = <value>
    <document>
        <ul>
            <li>
                <p>First list</p>
            </li>
        </ul>
        <exercise>
            <exproblem>
                <ul>
                    <li>
                        <p>It has four <anchor/>items</p>
                    </li>
                    <li>
                        <p>Of which this is<focus/> third</p>
                    </li>
                </ul>
            </exproblem>
        </exercise>
        <ul>
            <li>
                <p>And this is fourth</p>
            </li>
        </ul>
    </document>
</value>

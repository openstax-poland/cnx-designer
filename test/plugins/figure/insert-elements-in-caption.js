/** @jsx h */

export default (change, editor) => {
  change.insertAdmonition('note')
  change.insertExercise()
  change.wrapBlock('quotation')
  change.insertSection()
  change.wrapInList('ul_list')
}

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>Cap<cursor/>tion</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>Cap<cursor/>tion</figcaption>
        </figure>
    </document>
</value>

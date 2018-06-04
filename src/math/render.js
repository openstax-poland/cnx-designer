import React from 'react'
import MathLive from 'mathlive'
import { WithCounters } from 'slate-counters'


export default function renderNode(props) {
    const { node, attributes } = props

    switch (node.type) {
    case 'math':
        console.log(attributes)
        return <BlockMath {...props}/>
    }
}


const BlockMath = WithCounters(({ node }) => node.key)(
class BlockMath extends React.Component {
    shouldComponentUpdate(...args) {
        return !this.math && super.shouldComponentUpdate(...args)
    }

    render() {
        const { attributes, counters, node } = this.props
        console.log(this.props.node.data.get('mathml'))

        const style = {
            counterReset: `equation ${counters.get('equation')}`,
        }

        return <div className="equation" style={style} {...attributes}>
            <div
                contentEditable={false}
                ref={this.setRef}
                dangerouslySetInnerHTML={{ __html: node.data.get('mathml') }}
                />
        </div>
    }

    setRef = el => {
        this.math = MathLive.makeMathField(el, {
            onContentDidChange: this.onChange,
        })
    }

    onChange = math => {
        const mathml = math.text('mathML')
        const { editor, node } = this.props

        editor.change(c => c.setNodeByKey(node.key, { data: { mathml } }))
    }
})

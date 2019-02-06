// Fix invalid cnxml.
// For example:
/* 
<para>
  Text before
  <list>
    <item>item</item>
  </list>
  text
  <figure>...</figure
  after
</para>
 */
//should become:
/* 
<para>
  Text before
</para>
<list>
  <item>item</item>
</list>
<para>
  text
</para>
<figure>...</figure>
<para>
  after
</para>
 */

const BLOCK_TAGS = [
  'caption',
  'commentary',
  'exercise',
  'figure',
  'image',
  'item',
  'list',
  'media',
  'note',
  'para',
  'problem',
  'section',
  'solution',
  'subfigure',
  'title',
]

const fixCNXML = (tree) => {
  const treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_ELEMENT, {
    acceptNode: node => {
      return node.nodeName.toLowerCase() === 'para' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    },
  })

  while (treeWalker.nextNode()) {
    const currentNode = treeWalker.currentNode

    if (currentNode.nodeName === 'para') {
      const hasBlockChild = Array.from(currentNode.childNodes).find(n =>
        BLOCK_TAGS.includes(n.nodeName.toLowerCase())
      )

      // Process only those <para> tags which contains invalid childs
      if (hasBlockChild) {
        let paragraphNodes = []
        let nodes = []

        // Create para from paragraphNodes[] and add it to nodes[]
        const createPara = () => {
          if (paragraphNodes.length) {
            let para = document.createElement('para')
            paragraphNodes.forEach(c => para.append(c))
            nodes.push(para)
            paragraphNodes = []
          }
        }

        currentNode.childNodes.forEach(child => {
          const childName = child.nodeName.toLowerCase()

          if (BLOCK_TAGS.includes(childName)) {
            // Wrap paragraphNodes with para and postition it before handling child node
            createPara()
            nodes.push(child)
          } else {
            // Push node to paragraphNodes
            paragraphNodes.push(child)
          }
        })
        // If there are unprocessed paragraphNodes then create new para with them
        createPara()

        nodes.forEach(node => currentNode.parentNode.insertBefore(node, currentNode))
      }
    }
  }

  return tree
}

export default fixCNXML

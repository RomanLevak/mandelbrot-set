/**
 * creates and returns a canvas
 * @param {Element} parentNode an DOM element in to which canvas1which canvas willl be appended
 * @param {Function} cb which draws canvas content and will be called on resize event
 */
function makeResponsiveCanvas(parentNode) {
    parentNode.style.boxSizing = 'border-box'
    // parentNode.style.overflow = 'hidden'
    const canv = document.createElement('canvas')
    const {width, height} = getNodeWidthAndHeight(parentNode)
    canv.width = width
    canv.height = height

    parentNode.appendChild(canv)

    return canv
}

export default makeResponsiveCanvas

function getNodeWidthAndHeight(node) {
    const {parentNode} = node

    let {
        paddingLeft, paddingRight,
        paddingTop, paddingBottom,
        borderLeftWidth, borderRightWidth,
        borderTopWidth, borderBottomWidth
    } = getComputedStyle(parentNode)

    const parentWidth = parentNode.offsetWidth
    const parentHeight = parentNode.offsetHeight

    paddingLeft = parseFloat(paddingLeft)
    paddingRight = parseFloat(paddingRight)
    paddingTop = parseFloat(paddingTop)
    paddingBottom = parseFloat(paddingBottom)
    borderLeftWidth = parseFloat(borderLeftWidth)
    borderRightWidth = parseFloat(borderRightWidth)
    borderTopWidth = parseFloat(borderTopWidth)
    borderBottomWidth = parseFloat(borderBottomWidth)

    const width = parentWidth - paddingLeft - paddingRight- borderLeftWidth - borderRightWidth
    const height = parentHeight - paddingTop - paddingBottom - borderTopWidth- borderBottomWidth

    return {width, height}
}

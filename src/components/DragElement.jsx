import React from 'react'
import { DragSource } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.


/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    props.onDrop()
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

function Card(props) {
  // Your component receives its own props as usual
  const { id, children } = props
  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource } = props
  return connectDragSource(
    children
  )
}

// Export the wrapped version
export default DragSource('asana', cardSource, collect)(Card)

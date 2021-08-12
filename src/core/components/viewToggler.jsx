import React, { useState } from 'react'

/**
 * 
 * @param {string} props.active
 * @param {Array<Object>} props.views 
 * @returns {Object}
 */
const ViewToggler = (props) => {

  const [value, setValue] = useState(0)

  let views = props.views.filter(item => item.name == props.active)
  let Element = views.length? views[0].element: <span></span>

  const onChange = (data) => {
    if (   props.onChange
        && typeof props.onChange == 'function') {
        props.onChange(data)
    }
  }

  return (
    <Element onChange={onChange} />
  )
}

export default ViewToggler
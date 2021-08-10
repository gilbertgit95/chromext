import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

const ComponentTemplate = (props) => {

  const [value, setValue] = useState(0)

  const doThis = () => {
    setValue(value + 1)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={ doThis }>click me { value }</Button>
    </div>
  )
}

export default ComponentTemplate
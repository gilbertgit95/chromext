import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TestComp from '../core/components/componentTemplate.jsx'

const Root = (props) => {
  // states
  const [value, setValue] = useState('')

  // life cycles
  useEffect(() => {
    // mounted code here

    // unmount code here
    return () => {

    }
  }, [])

  // internal variables

  // internal methods

  // render UI
  return (
    <div>
      <Button variant="contained" color="primary">Root</Button>
      <TestComp />
    </div>
  )
}

export default Root

import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const LoadingSearchSelect = (props) => {

  const [value, setValue] = useState(0)

  const doThis = () => {
    setValue(value + 1)
  }

  const onOpen = (event) => {
    console.log('open dialog')
  }

  return (
    <>
        <Button
            onClick={onOpen}
            style={{
                cursor: 'pointer',
                textAlign: 'center'
            }}>
            { props.children }
            { ' ' }
            <ArrowDropDownIcon
                size="small"
                color="primary" />
        </Button>
    </>
  )
}

export default LoadingSearchSelect
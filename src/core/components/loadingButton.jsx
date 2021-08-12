import React, { useState } from 'react'
import { CircularProgress, Button} from '@material-ui/core'

const LoadingButton = (props) => {

    let disabled = Boolean(props.disabled) || Boolean(props.isLoading)
    let isLoading = Boolean(props.isLoading)

    delete props.disabled
    delete props.isLoading

    return (
        <Button {...props} disabled={disabled}>
            <>
                { isLoading? <CircularProgress
                    size="small"
                    color="primary"
                    style={{width: 15}} />: null }
                { ' ' + props.children }
            </>
        </Button>
    )
}

export default LoadingButton
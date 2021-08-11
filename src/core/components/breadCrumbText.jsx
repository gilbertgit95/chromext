import React from 'react'

import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Typography from '@material-ui/core/Typography'

/*
 * 
 * @param {string|Array<Object>} props.content
 * @param {string} props.default
 * @param {object} props.style
 * @returns
 */

const BreadCrumbText = (props) => {

    // check for text content
    let isText = Boolean(typeof props.content == 'string')
    // for text title
    let text = isText && props.content.length? props.content: props.default
    // for breadcrumbs
    let contents = []

    // check for array content
    if (!isText && props.content.length == 0) {
        isText = true
        text = props.default
    } else {
        contents = props.content
    }

    return (
        <Typography
            style={props.style? props.style: {}}
            color="primary"
            variant="caption">
            {
                // if text display text directly, if not loop to items
                isText? text: contents.map((item, index) => (
                    <>
                        {/* display item name */}
                        <b>{ item } </b>

                        {/* if the text is still in bihind the last item display arrow */}
                        { ((index + 1 ) < contents.length)? (
                            <ArrowRightIcon style={{ verticalAlign: 'middle'}} />
                        ): null }
                    </>
                ))
            }
        </Typography>
    )
}

export default BreadCrumbText
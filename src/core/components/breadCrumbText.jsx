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

    let contents = []
    if (props.content && typeof props.content == 'object' && props.content.length) {
        contents = props.content
    } else {
        contents = [props.default]
    }

    return (
        <Typography
            style={props.style? props.style: {}}
            color="primary"
            variant="caption">
            {
                // if text display text directly, if not loop to items
                contents.map((item, index) => (
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
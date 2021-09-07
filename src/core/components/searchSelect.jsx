import React, {useState, useEffect} from 'react'

import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const SearchSelect = (props) => {

    /**
     * init states
     */
    const [search, setSearch] =     useState('')
    const [options, setOptions] =   useState(props.options)
    const [anchorEl, setAnchorEl] = useState(null)


    useEffect(() => {
        let searchkey = search.toLowerCase()

        let filteredOptions = props.options.filter(item => {
            let itemLabel = item[props.fields.label].toLowerCase()
            return itemLabel.indexOf(searchkey) >= 0
        })

        setOptions(filteredOptions)
    }, [props.options])

    /**
     * methods
     */
    // handles the openning of dropdown
    const handleClick = (event) => {
        // if this component is disable, do not open the dropdown
        if (!Boolean(props.disabled)) setAnchorEl(event.currentTarget)
    }

    // handles the closing of the dropdown
    const handleClose = () => {
        setSearch('')
        setAnchorEl(null)
    }

    // handles the search in textbox
    const handleSearch = (event) => {
        setSearch(event.currentTarget.value)

        let searchkey = event.currentTarget.value.toLowerCase()

        let filteredOptions = props.options.filter(item => {
            let itemLabel = item[props.fields.label].toLowerCase()
            return itemLabel.indexOf(searchkey) >= 0
        })

        setOptions(filteredOptions)
    }

    // handles the selection of item in the dropdown
    const handleSelect = (val) => {
        onChange(val)
        handleClose()
    }

    // handles the removing of selected item
    const handleEraseSelected = () => {
        onChange(null)
    }

    // callback if changes on the selected value is made
    const onChange = (selected) => {
        if (typeof props.onChange == 'function') {
            props.onChange(selected)
        }
    }


    /**
     * variables before render
     */
    let sel = props.options && props.options.length? props.options.filter(item => {
        return item[props.fields.value] == props.value
    }): []
    let currentSelectedText = sel &&  sel.length? sel[0][props.fields.label]: props.placeholder


    /**
     * rederer
     */
    return (
        <div
            style={{width: '100%', paddingRight: 10, paddingLeft: 10}}>
            {/* the main display component */}
            <div style={{width: '100%'}}>
                <div
                    style={{
                        width: '70%',
                        display: 'inline-block',
                        paddingRight: 10,
                        paddingLeft: 10,
                        // blur display color when no selection is made
                        // or when disabled
                        ...(sel.length? {}: {color: '#ccc'}),
                        ...(!Boolean(props.disabled)? {}: {color: '#ccc'})
                    }}
                    aria-controls="search-select-component"
                    aria-haspopup="true"
                    onClick={handleClick} >
                    { currentSelectedText }
                </div>
                <div style={{width: '10%', display: 'inline-block', textAlign: 'end'}}>
                    {
                        // show x button when something is selected
                        sel.length? (
                            <IconButton
                                disabled={Boolean(props.disabled)}
                                onClick={handleEraseSelected}
                                size="small">
                                <CloseIcon />
                            </IconButton>
                        ): null
                    }
                </div>
            </div>

            {/* dropdown section component */}
            <Menu
                id="search-select-component"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                {/* search section */}
                <div
                    style={{
                        paddingRight: 10,
                        paddingLeft: 10
                    }}>
                    <TextField
                        style={{border: 'none'}}
                        placeholder={currentSelectedText}
                        onChange={handleSearch}
                        value={search} />
                </div>
                {/* options section */}
                <div style={{minWidth: 200, maxHeight: 200, overflowY: 'auto'}}>
                    {
                        options.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    onClick={() => {handleSelect(item[props.fields.value])}}>
                                    { item[props.fields.label] }
                                </MenuItem>
                            )
                        })
                    }
                </div>
            </Menu>
        </div>
    )
}

export default SearchSelect
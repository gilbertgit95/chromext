import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import MaterialTable from 'material-table'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoadingSearchSelect = (props) => {

  const [value, setValue] = useState(0)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onOpen = (event) => {
    console.log('open dialog')
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  };

  const doThis = () => {
    setValue(value + 1)
  }

  return (
    <>
      {/* button */}
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
        {/* dialog box */}
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                { props.dialogTitle? props.dialogTitle: 'Select Item' }
              </Typography>
              <Button autoFocus color="inherit" onClick={onClose}>
                Done
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ maxWidth: '100%', paddingTop: 50 }}>
            <MaterialTable columns={props.columns} data={props.data} title='' />
          </div>
        </Dialog>
    </>
  )
}

export default LoadingSearchSelect
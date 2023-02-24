import React from 'react'
import { Snackbar } from '@mui/material'

const ShowMsg = ({msg,setSnackbarMsg}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
    }
    setSnackbarMsg(false)
}

  return (
    <div>
       <Snackbar
            open={msg.toShow}
            autoHideDuration={4000}
            onClose={handleClose}
            message={msg.msg}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
        /> 
    </div>
  )
}

export default ShowMsg

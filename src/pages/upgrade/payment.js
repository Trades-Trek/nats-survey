import CardWrapper from 'src/component/Cardwrapper'
import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import Paper from '@mui/material/Paper';
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { Box, Button, Grid, Typography } from '@mui/material'

const Payment = () => {

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CardWrapper HeaderComponent={<></>} title=''>
      {' '}


      <Dialog
       fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center'}}>
         Bank Transfer
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center'}}>
          <DialogContentText id="alert-dialog-description">
            <p><strong>Account Name:</strong> Timothy Okoro</p>
            <p><strong>Account Number: 12345678</strong></p>
            <p><strong>Bank: GTB</strong></p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Paper sx={{ height: 500, width: '100%'}} elevation={0} />
      <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end'}}>
    <Button variant="text" onClick={handleClickOpen}>
      Transfer to Bank account
    </Button>
  </div>
    </CardWrapper>
  )
}

Payment.getLayout = page => <BlankLayout>{page}</BlankLayout>
Payment.authGuard = true

export default Payment

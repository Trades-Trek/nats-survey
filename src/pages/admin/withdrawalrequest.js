import Grid from '@mui/material/Grid'

import BlankLayout from 'src/@core/layouts/BlankLayoutOther'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { userService } from 'src/services'
import toast from 'react-hot-toast'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const AdminWithdrawalrequest = () => {
  const [pendingTransactions, setPendingTransactions] = useState([])

  useEffect(() => {
    const getT = async () => {
      try {
        const res = await userService.pendingWithdrawalRequest()
        setPendingTransactions(res.data)
      } catch (error) {
        toast.error('Failed to get request withdrawal, try again')
      }
    }

    getT()
  }, [])

  console.log(pendingTransactions, '....pendingTransactions......')

  const whatToDisplay = t => {
    if (t.paymentMethod === 'cryptocurrency') {
      return t.cryptoWallet
    }

    if (t.paymentMethod === 'paypal') {
      return t.userId.email
    }

    if (t.paymentMethod === 'bank_account') {
      return t.userId.email
    }
    return ''
  }

  const approveTransaction = async transactionId => {

    try {
      const res = await userService.approvePendingWithdrawalRequest({transactionId})

      if(!res.success){
        toast.error('Failed to updated to approved, try again')
        return
      }

      // Update the pendingTransactions state to update the status of the approved transaction.
      setPendingTransactions(prevPendingTransactions => {
        const updatedPendingTransactions = prevPendingTransactions.map(transaction => {
          if (transaction._id === transactionId) {
            return {
              ...transaction,
              status: 'approved'
            }
          }
          return transaction
        })
        return updatedPendingTransactions
      })
      toast.success('Updated to approved')
    } catch (error) {
      toast.error('Failed to updated to approved, try again')
    }
  }

  return (
    <Grid
      container
      style={{ position: 'relative' }}
      spacing={6}
      sx={{ marginTop: 10, background: 'white', padding: 10, justifyContent: 'space-between' }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Email/Crypto Wallet/bankaccount</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTransactions?.map(transaction => (
              <TableRow key={transaction._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {transaction.paymentMethod}
                </TableCell>
                <TableCell align='right'>{transaction.amount}</TableCell>
                <TableCell align='right'>{transaction.status}</TableCell>
                <TableCell align='right'>{whatToDisplay(transaction)}</TableCell>

                <TableCell align='right'>
                  {transaction.status === 'awaiting_admin_approval' && (
                    <Button variant='contained' onClick={() => approveTransaction(transaction._id)}>
                      Approve transaction
                    </Button>
                  )}

                  {transaction.status === 'approved' && 'approved'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default AdminWithdrawalrequest

AdminWithdrawalrequest.getLayout = page => <BlankLayout>{page}</BlankLayout>
AdminWithdrawalrequest.adminGuard = true

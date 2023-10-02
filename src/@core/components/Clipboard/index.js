import React, { useState } from 'react'
import clipboardCopy from 'clipboard-copy'
import { Typography, Box } from '@mui/material'

import toast from 'react-hot-toast'

function CopyToClipboard({ yourRefferal }) {
  const textToCopy = `${window.location.origin}/signup?referral=${yourRefferal}` // Replace with the text you want to copy

  const handleCopyClick = async () => {
    try {
      await clipboardCopy(textToCopy)
      toast.success('Referral link copied')

    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <Box style={{ gap: 15, display: 'flex', alignItems: 'center' }}>
      <Typography
        sx={{
          color: '#3D3D3D',
          borderRadius: '5px',
          background: '#F8F7F7',
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: 100,
          lineHeight: 'normal',
          letterSpacing: 0.18,
          width: 561,
          p: 2,
          my: 4
        }}
      >
        {window.location.origin}/signup?referral={yourRefferal}
      </Typography>
      <Box
        onClick={handleCopyClick}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 10
        }}
      >
        <img src='/images/pages/copyclip.png' style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
      </Box>
    </Box>
  )
}

export default CopyToClipboard

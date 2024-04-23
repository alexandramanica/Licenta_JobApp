import React from 'react'
import { useState } from 'react'

import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

export default function NavbarStudent() {

    return (
    <div>
      <AppBar
        position="fixed"
        sx={{ display: { xs: 'none', md: 'block' },
              width: { md: 'calc(100% - 220px)' },
              ml: { md: '220px' },
              backgroundColor: 'white',
              boxShadow:'none',
              borderBottom: '1px solid #f1f1f1',}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

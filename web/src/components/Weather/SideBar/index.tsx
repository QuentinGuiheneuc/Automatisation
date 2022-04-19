import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Grid, IconButton, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchLocation from '../SearchLocation';


export function SideBar() {

  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Grid container>
      <Grid container wrap='nowrap' justifyContent='flex-end'>
        <Typography color={"#4ECCEC"} sx={{ marginTop: 4 }}>Méteo</Typography>
        <IconButton
          sx={{ color: "#4ECCEC", marginRight: 3, marginTop: 3 }}
          aria-label="open drawer"
          onClick={handleDrawer}
        > <CloudIcon />
        </IconButton>
      </Grid>
      <Drawer
        sx={{
          width: 100,
          flexShrink: 0,
          "& .MuiPaper-root": {
            top: "67px",
            backgroundColor: "#4ECCEC",
            textDecorationColor: "white"
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Grid container >
          <Grid item xs={5}>
            <IconButton onClick={handleDrawer} sx={{ color: "white", marginTop: 2 }}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Typography sx={{ marginTop: 2.5 }} color={"white"} fontSize={20}>Méteo</Typography>
        </Grid>
        <SearchLocation />
      </Drawer>
    </Grid>
  )
}

export default SideBar;
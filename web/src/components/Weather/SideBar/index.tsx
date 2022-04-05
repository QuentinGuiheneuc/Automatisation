import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchLocation from '../SearchLocation';


export function SideBar() {

  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton
            sx={{color: "white"}}
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawer}
          > <MenuIcon /> 
          </IconButton>
          <Drawer
        sx={{
          width: 400,
          flexShrink: 0,
          "& .MuiPaper-root": {
            top: "61px",
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
          <IconButton onClick={handleDrawer}>
          <MenuIcon /> 
          </IconButton>
          <Typography>Méteo</Typography>
          <SearchLocation onClose={(): void =>{"bonjour"}}/>
          </Drawer>
          </div>
      )}
  


export default SideBar;
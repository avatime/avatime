import React, { FC } from 'react'
import Avatar from '@mui/material/Avatar';
interface IProps {}

/**
* @author
* @function @MainHeader
**/

export const MainHeader:FC<IProps> = (props) => {
  return (
    <div style={{position:"absolute",top:10, right:"5%"}}>  <Avatar alt="example" src="../../assets/profileEx.jpg"  sx={{ width: 56, height: 56 }} />
    </div>
   )
 }

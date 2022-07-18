import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IProps {}

export const TestPage:FC<IProps> = (props) => {
  return (
    <div><Link to="/main">MainPage</Link></div>
   )
 }

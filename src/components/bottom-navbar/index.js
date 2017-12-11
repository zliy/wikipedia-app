import React from 'react'

import {
    NavLink,
  } from 'react-router-dom'

export default function (props) {
    return (
        <nav id="bottom-navbar">
            <NavLink replace activeClassName="apptabbar-active" to="/explore">Explore</NavLink>
            <NavLink replace activeClassName="apptabbar-active" to="/saved">Saved</NavLink>
            <NavLink replace activeClassName="apptabbar-active" to="/history">History</NavLink>
        </nav>
    )
}
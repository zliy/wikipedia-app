import React from 'react'

import {
    NavLink,
} from 'react-router-dom'

export default function (props) {
    return (
        <nav className="bottom-navbar">
            <div className="bottom-navbar-content">
                <NavLink replace activeClassName="apptabbar-active" to="/explore">
                    <i className="fa fa-globe" aria-hidden="true"></i>
                    Explore
                </NavLink>
                <NavLink replace activeClassName="apptabbar-active" to="/saved">
                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                    Saved
                </NavLink>
                <NavLink replace activeClassName="apptabbar-active" to="/history">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    History
                </NavLink>
            </div>
            <div className="bottom-navbar-holder"></div>
        </nav>
    )
}
import React from "react"
import ICONS from '@/icon/'

class TopNavBar extends React.Component {

    render() {
        const {
            children,
            nofixed,
            leftContent,
            iconLeft,
            iconRight,
            // events:
            onLeftClick,
            onTitleClick,
            onRightClick,
        } = this.props

        const nofixedStyle = {
            position: 'fixed',
            top: 0,
            width: '100%',
        }

        return (
            <div className="top-navbar" >
                <div className="top-navbar-bar" style={nofixed ? {} : nofixedStyle}>
                    <div className="top-navbar-left" onClick={onLeftClick}>
                        {iconLeft}
                        {leftContent ? <div className="top-navbar-leftcontent">{leftContent}</div> : ''}
                    </div>
                    <div className="top-navbar-title"
                        onClick={onTitleClick}
                    >{children}</div>
                    <div className="top-navbar-right" onClick={onRightClick}>{iconRight}</div>
                </div>
                {nofixed ? '' : <div className="top-navbar-holder" ></div>}
            </div>
        )
    }
}
TopNavBar.i = {
    settings: ICONS.settings,
    back: ICONS.back,
    search: ICONS.search,
}


export default TopNavBar
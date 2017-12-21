import React from "react"
import PropTypes from 'prop-types'

/* 
handler receive a event target
*/
class LongPress extends  React.Component {
    render() {
        const { children, timeout, handler } = this.props
        const TIMEOUT = timeout || 400
        return React.cloneElement(children, {
            onTouchStart: (e) => {
                /* note: e在timeout之后没有信息， */
                const target = e.target
                this.timeOutID = setTimeout(handler, TIMEOUT, target)
            },
            onTouchEnd: (e) => { clearTimeout(this.timeOutID); this.timeOutID = null },
            onTouchMove: (e) => { clearTimeout(this.timeOutID); this.timeOutID = null },
        })

    }
}

LongPress.propTypes = {
    children: PropTypes.element.isRequired,
    timeout: PropTypes.number,
    handler: PropTypes.func,
}

export default LongPress


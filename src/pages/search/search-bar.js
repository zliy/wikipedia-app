import React from "react"



export default class SearchBar extends React.Component {


    handleFocus = () => {
        let that = this
        window.addEventListener('touchmove', function handler() {
            if (document.activeElement == that.inputNode) {
                that.inputNode.blur()
                console.log('blur input')
            }
            window.removeEventListener('touchmove', handler)
        })
    }


    render() {
        const {
            onCloseClick, onInput,
        } = this.props
        return (
            <div className='search-bar'>
                <div className="search-bar-content">
                    <i class="search-bar-icon fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search Wikipedia"
                        onFocus={this.handleFocus}
                        ref={(n) => { this.inputNode = n }}
                        onInput={e => onInput(e.target.value)} />
                    <i class="clear-input fa fa-times-circle" aria-hidden="true"></i>
                    <span className='close-page' onClick={onCloseClick}>X</span>
                </div>
                <div className="search-bar-holder"></div>
            </div>
        )
    }
}

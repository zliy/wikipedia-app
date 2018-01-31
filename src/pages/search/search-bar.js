import React from "react"
import SVG from 'react-inlinesvg';

import close from '@/icon/close.svg'



export default class SearchBar extends React.Component {
    componentDidMount() {
        let inputNode = this.inputNode
        inputNode.focus()
        inputNode.selectionStart = inputNode.value.length
        inputNode.selectionEnd = inputNode.value.length
        // setTimeout(() => inputNode.click(), 300) // bug
    }

    handleFocus = () => {
        let that = this
        window.addEventListener('touchmove', function handler() {
            if (document.activeElement === that.inputNode) {
                that.inputNode.blur()
                console.log('blur input')
            }
            window.removeEventListener('touchmove', handler)
        })
    }

    handleClearInputClick = () => {
        this.props.clearInput()
        this.inputNode.focus()
    }
    render() {
        const { inputtingText,
            onCloseClick, onInput,
    } = this.props
        return (
            <div className='search-bar'>
                <div className="search-bar-content">
                    <i className="search-bar-icon fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search Wikipedia"
                        onFocus={this.handleFocus}
                        ref={(n) => { this.inputNode = n }}
                        value={inputtingText}
                        onChange={onInput} />{ /* note: why on change*/}
                    <i className="clear-input fa fa-times-circle" aria-hidden="true"
                        onClick={this.handleClearInputClick}
                    />
                    <span className="close-page" onClick={onCloseClick}>
                        <SVG src={close} />
                    </span>
                </div>
                <div className="search-bar-holder"></div>
            </div>
        )
    }
}

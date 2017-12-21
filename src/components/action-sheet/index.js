import React from "react"


export default class extends React.Component {
    moveHandler = (e) => {
        e.preventDefault()
        let { clientX, clientY } = e.changedTouches[0]
        let currOverBtn = document.elementFromPoint(clientX, clientY).closest('.action-sheet-button')

        if (this.mouseMoveOver !== currOverBtn) {
            this.mouseMoveOver && (this.mouseMoveOver.classList.remove('active'))
            currOverBtn && (currOverBtn.classList.add('active'))
            this.mouseMoveOver = currOverBtn
        }
    }
    componentDidMount() {
        this.contentDOM.addEventListener('touchmove', this.moveHandler)
    }

    render() {
        const { actions, cancelHandler } = this.props
        let isRealClick = false
        this.mouseMoveOver = null
        return (
            <div className='action-sheet' 
                onTouchStart={()=>{ isRealClick = true}}
                onClick={(e)=>{ isRealClick && cancelHandler()}}
            >
                <div className="action-sheet-content"
                    onTouchStart={(e) => {
                        let currOverBtn = e.target.closest('.action-sheet-button')
                        currOverBtn && currOverBtn.classList.add('active')
                    }}
                    onTouchEnd={(e) => {
                        let { clientX, clientY } = e.changedTouches[0]
                        let currOverBtn = document.elementFromPoint(clientX, clientY).closest('.action-sheet-button')
                        currOverBtn && currOverBtn.classList.remove('active')
                        if (this.mouseMoveOver) {
                            currOverBtn.dispatchEvent(new MouseEvent('click', { 'bubbles': true, }))
                        }
                        this.mouseMoveOver = null
                    }}
                    ref={(dom) => { this.contentDOM = dom }}

                /* note: react默认代理了touch，wheel？事件,currentTarget为document */
                >
                    <ul className="actions"> {
                        actions.map((aAct) => {
                            return (
                                <li key={aAct.title} className="action-sheet-button"
                                    onClick={() => { isRealClick && aAct.handler() }}
                                    style={{ color: aAct.fontColor }}>{aAct.title}</li>
                            )
                        })
                    } </ul>
                    {/* note: 移动后touchend 事件还是在down的元素上触发？ */}
                    <div className="action-sheet-cancel action-sheet-button"
                        onClick={(e) => { isRealClick && cancelHandler(e) }}
                    >取消</div>
                </div>
            </div>
        )
    }
}






// import View from './action-sheet'


// export { View }
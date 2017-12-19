import React from "react"
import { connect } from "react-redux"

import TopNavBar from "@cpt/top-navbar/index.js"
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiList from '@cpt/wiki-list/'

import mapTime from '@/js/mapTime'
import { LONTPRESSTIMEOUT } from '@/constants'
import ActionSheet from '@cpt/action-sheet/'

let scroll = 0

class History extends React.Component {

    componentWillUnmount() {
        scroll = window.scrollY
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    /* history 的state比较扁平，然后map成复杂结构，方便处理 */

    render() {
        this.longPressTimeoutID = null
        const { historyGroups, actTargetID,
            showActions, cancelActions, deleteItems, } = this.props
        console.log('mapped historyGroups: ', historyGroups)
        return (
            <main>
                <TopNavBar
                    // iconLeft={TopNavBar.i.back}
                    leftContent={'Clear'}
                    iconRight={TopNavBar.i.search}
                    // eslint-disable-next-line
                    onTitleClick={() => location.reload()}
                    onLeftClick={console.log.bind(null, 'Left clicked')}
                >History</TopNavBar>


                {historyGroups.map(group => {
                    return (<WikiList items={group.data}
                        onTouchStart={(e) => {
                            const targetLi = e.target.closest('li')
                            this.lpTimeoutID = setTimeout(showActions, LONTPRESSTIMEOUT, targetLi)
                        }}
                        onTouchEnd={(e) => { clearTimeout(this.lpTimeoutID); this.lpTimeoutID = null }}
                        onTouchMove={(e) => { clearTimeout(this.lpTimeoutID); this.lpTimeoutID = null }}
                    >{group.readableTime}</WikiList>)
                })}


                {actTargetID && <ActionSheet cancelHandler={cancelActions}
                    actions={[
                        { title: '查看', handler: () => { console.log('view fired') } },
                        { title: '删除', fontColor: 'red', handler: () => { deleteItems(actTargetID) }, }
                    ]}></ActionSheet>}


                <BottomNavBar></BottomNavBar>
            </main>
        )
    }
}

function splitHistory(items) {
    return items.reduceRight((mapedState, item) => {
        let { readableTime, index } = mapTime(item.time)
        mapedState[index] = mapedState[index] || { readableTime, data: [] }
        mapedState[index].data.push(item.summary)
        return mapedState
    }, [])
}

function mapState({ history }) {
    return {
        historyGroups: splitHistory(history.historyItems || []),
        actTargetID: history.actTargetID,
    }
}

function mapDispatch(dispatch) {
    return {
        showActions: (li) => {
            const liid = li.dataset.liid
            dispatch({ type: 'HISTORY/SHOWACTIONS', payload: { actTargetID: liid } })
        },
        cancelActions: () => {
            dispatch({ type: 'HISTORY/HIDEACTIONS' })
        },
        deleteItems: (title) => {
            dispatch({ type: 'HISTORY/DELETEITEM', payload: { delTitles: [title] } })
        },
    }
}


export default connect(mapState)(History)


import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { withRouter } from 'react-router-dom'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiListItem from '@cpt/wiki-list-item'

import WikiList from '@cpt/wiki-list/'
import ActionSheet from '@cpt/action-sheet/'
import LongPress from '@cpt/longpress/'

import { LONTPRESSTIMEOUT } from '@/constants'

let scroll = 0

class Saved extends React.Component {

    componentWillMount() {
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    componentWillUnmount() {
        scroll = window.scrollY
    }

    render() {

        // console.log('saved rendered')
        const { savedItems, actTargetID, history,
            showActions, cancelActions, deleteItems, clearAll } = this.props
        return (
            <main >
                <TopNavBar
                    // iconLeft={TopNavBar.i.back}
                    leftContent={'Clear'}
                    onLeftClick={clearAll}
                    iconRight={TopNavBar.i.search}
                    onRightClick={window.loadTestDataToIndexDB}
                    // eslint-disable-next-line
                    onTitleClick={() => location.reload()}
                >Saved</TopNavBar>

                <LongPress handler={(t) => {
                    let li = t.closest('li.wiki-list-item')
                    console.log(li)
                    li && showActions(li)
                }}>
                    <WikiList items={savedItems}></WikiList>
                </LongPress>

                <TransitionGroup>
                    {actTargetID &&
                        <CSSTransition timeout={300} classNames={'action-sheet-animation'}>
                            <ActionSheet cancelHandler={cancelActions}
                                actions={[
                                    { title: '查看', handler: () => { history.push(`wiki/${actTargetID}`) } },
                                    { title: '删除', fontColor: 'red', handler: () => { deleteItems(actTargetID) }, }
                                ]} />
                        </CSSTransition>
                    }
                </TransitionGroup>


                <BottomNavBar></BottomNavBar>
            </main >
        )
    }
}


function fetchSummary(items) {
    return function (dispatch) {
        return
    }
}


function mapState({ saved }) {
    return {
        savedItems: saved.savedItems || [],
        actTargetID: saved.actTargetID,
    }
}
function mapDispatch(dispatch) {
    return {
        showActions: (li) => {
            const liid = li.dataset.liid
            dispatch({ type: 'SAVED/SHOWACTIONS', payload: { actTargetID: liid } })
        },
        cancelActions: () => {
            dispatch({ type: 'SAVED/HIDEACTIONS' })
        },
        deleteItems: (title) => {
            dispatch({ type: 'SAVED/DELETEITEM', payload: { delTitles: [title] } })
        },
        clearAll: () => {
            dispatch({ type: 'SAVED/CLEAR' })
        }
    }
}


export default withRouter(connect(mapState, mapDispatch)(Saved))
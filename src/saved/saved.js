import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiListItem from '@cpt/wiki-list-item'

import WikiList from '@cpt/wiki-list/'
import ActionSheet from '@cpt/action-sheet/'

import get from '@/js/fetch'
import { LONTPRESSTIMEOUT } from '@/constants'

let scroll = 0

class Saved extends React.Component {

    componentWillMount() {
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    componentWillUnmount() {
        console.log('saved: componentWillUnmount')
        scroll = window.scrollY
    }

    render() {
        this.lpTimeoutID = null
        console.log('saved rendered')
        const { savedItems, actTargetID,
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


                <WikiList items={savedItems}
                    onTouchStart={(e) => {
                        /* note: e在timeout之后没有信息， */
                        const targetLi = e.target.closest('li')
                        this.lpTimeoutID = setTimeout(showActions, LONTPRESSTIMEOUT, targetLi)
                    }}
                    onTouchEnd={(e) => { clearTimeout(this.lpTimeoutID); this.lpTimeoutID = null }}
                    onTouchMove={(e) => { clearTimeout(this.lpTimeoutID); this.lpTimeoutID = null }}
                ></WikiList>


                {actTargetID && <ActionSheet cancelHandler={cancelActions}
                    actions={[
                        { title: '查看', handler: () => { console.log('view fired') } },
                        { title: '删除', fontColor: 'red', handler: () => { deleteItems(actTargetID) }, }
                    ]}></ActionSheet>}

                    
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
        clearAll: (title) => {
            dispatch({ type: 'SAVED/CLEAR' })
        }
    }
}


export default connect(mapState, mapDispatch)(Saved)
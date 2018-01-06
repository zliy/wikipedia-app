import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import Card from '@cpt/card/'
import * as Cards from '@cpt/typedcards/'


import { CARDTYPE } from '@/constants'
import * as actions from './actions'
import { actions as savedAct } from '@/pages/saved/'
import loadingImg from '@/icon/loading.gif'
import { spawn } from 'child_process';



class Loading extends React.Component {
    constructor() {
        super()
        this.style = {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "flex-start",
            "height": "46px",
            "width": "100%",
            marginTop: '-46px',
            // transition: 'margin-top 50ms',
        }
    }

    render() {
        let { newStyle } = this.props
        return (
            <div className="loading" style={{ ...this.style, ...newStyle }}>
                <img src={loadingImg} style={{ height: '32px', }} alt="" />
            </div>
        )
    }
}


let scroll = 0

class Explore extends React.Component {
    componentWillUnmount() {
        scroll = window.scrollY
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    render() {
        console.log('explore rendered')
        const { explored, savedItems, isFetching,
            fetchNew, toggleSave } = this.props
        return (
            <main className="explore" onTouchMove={(e) => {
                if (!isFetching && window.pageYOffset <= -90) {
                    fetchNew()
                }
                if(isFetching){
                    console.log(window.scrollY)
                    e.preventDefault()
                }
            }} >
                <TopNavBar
                    iconLeft={TopNavBar.i.settings}
                    iconRight={TopNavBar.i.search}
                    onLeftClick={() => this.props.history.push('/settings')}
                >Explore</TopNavBar>

                {isFetching ? <Loading ref={(dom) => { this.loadingDom = dom }} newStyle={this.newStyle}></Loading> : <span style={{ "display": "flex", "justifyContent": "center", "alignItems": "flex-start", "height": "46px", "marginTop": "-46px" }}>下拉刷新</span>}
                {
                    explored.map((aCard) => {
                        switch (aCard.type) {
                            case CARDTYPE.RANDOM: {
                                const summary = aCard.summary
                                return (
                                    <Cards.Random key={aCard.type + summary.title}
                                        summary={summary}
                                        isSaved={savedItems.some(val => val.title === summary.title)}
                                        toggleSave={toggleSave}
                                    />
                                )
                            }
                            case CARDTYPE.MORELIKE: {
                                const { summary, time, items } = aCard
                                return (
                                    <Cards.MoreLike key={aCard.type + summary.title}
                                        time={time}
                                        summary={summary}
                                        items={items}
                                    />
                                )
                            }
                            case CARDTYPE.TOPREAD: {
                                const { date, items } = aCard
                                return (
                                    <Cards.TopRead key={aCard.type + date}
                                        date={date}
                                        items={items.slice(0, 5)}
                                    />
                                )
                            }
                            default:
                                throw new Error('unknown Card type: ' + aCard.type)

                        }
                    })
                }

                <BottomNavBar></BottomNavBar>
            </main>
        )
    }
}

function mapState(state) {
    return {
        explored: state.explore.explored || [],
        isFetching: state.explore.isFetching,
        savedItems: state.saved.savedItems || [],
    }
}

function mapDispatch(dispatch) {
    return {
        fetchNew() {
            dispatch(actions.fetchNew())
        },
        dispatch,
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        toggleSave(title) {
            console.log('toggleSave clicked')
            if (stateProps.savedItems.some(val => val.title === title)) {
                dispatchProps.dispatch({ type: 'SAVED/DELETEITEM', payload: { delTitles: [title] } })
            } else {
                dispatchProps.dispatch(savedAct.addNew(title))
            }
        },
    }
}

export default connect(mapState, mapDispatch, mergeProps)(Explore)
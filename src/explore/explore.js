import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import Card from '@cpt/card/'
import * as Cards from '@cpt/typedcards/'


import { CARDTYPE } from '@/constants'






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
        console.log(this.props)
        const { explored } = this.props
        return (
            <main className="explore">
                <TopNavBar
                    iconLeft={TopNavBar.i.settings}
                    iconRight={TopNavBar.i.search}
                    onLeftClick={() => this.props.history.push('/settings')}
                >Explore</TopNavBar>


                {
                    explored.map((aCard) => {
                        switch (aCard.type) {
                            case CARDTYPE.RANDOM: {
                                const summary = aCard.summary
                                return (
                                    <Cards.Random key={aCard.type + summary.title}
                                        summary={summary}
                                    />
                                )
                            }
                            // case CARDTYPE.BECAUSEUREAD: {
                            //     return (
                            //         <Cards.BeacuseURead></Cards.BeacuseURead>
                            //     )
                            // }
                            default:
                                throw new Error('unknown Card type')

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
        explored: state.explore.explored || []
    }
}

export default connect(mapState)(Explore)
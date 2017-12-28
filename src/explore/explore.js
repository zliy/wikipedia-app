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
                                        items={items.slice(0,5)}
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
        explored: state.explore.explored || []
    }
}

export default connect(mapState)(Explore)
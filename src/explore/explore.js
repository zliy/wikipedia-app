import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import Card from '@cpt/card/'

import { CARDTYPE } from '@/constants'

let scroll = 0

class Explore extends React.Component {
    componentWillUnmount() {
        scroll = window.scrollY        
    }
    componentDidMount(){
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
                                    <Card>
                                        {/* note: Cpt.child */}
                                        <Card.header
                                            subtitle="Random article"
                                            title="Wikipedia"
                                        ></Card.header>
                                        <Card.body
                                            imgSrc={summary.originalimage.source}
                                            description={summary.description || summary.extract}
                                            title={summary.title}
                                        >
                                        </Card.body>
                                        <Card.footer />

                                    </Card>
                                )
                            }
                            case CARDTYPE.RANDOM:
                                const summary = 1

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
        explored: state.explored
    }
}

export default connect(mapState)(Explore)
import React from 'react'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import Card from '@cpt/card/'



export default class extends React.Component {
    componentWillUnmount() {
        console.log('explore: componentWillUnmount')
    }
    render() {
        console.log('explore rendered')
        console.log(this.props)
        return (
            <main className="explore">
                <TopNavBar
                    iconLeft={TopNavBar.i.settings}
                    iconRight={TopNavBar.i.search}
                    onLeftClick= {()=>this.props.history.push('/settings')}
                >Explore</TopNavBar>

                <Card>
                    <Card.header
                        subtitle={'中文维基百科上的最多阅读'}
                        title={'11月25日 星期六'}
                    />
                    <Card.body
                        imgSrc={"https://upload.wikimedia.org/wikipedia/commons/7/76/Stork.jpg"}
                        title={"鹳科"}
                        description={'鹳科在鸟类传统分类系统中是鸟纲鹳形目中的一个科，又俗稱送子鳥。'}
                    />
                    <Card.footer />
                </Card>

                <Card>
                    <Card.header
                        title={'Wikipedia'}
                        subtitle={'Random article'}
                    />
                </Card>

                <Card>
                    <Card.header
                        subtitle={'中文维基百科上的最多阅读'}
                        title={'11月25日 星期六'}
                    />
                    <Card.body
                        imgSrc={"https://upload.wikimedia.org/wikipedia/commons/7/76/Stork.jpg"}
                        title={"鹳科"}
                        description={'鹳科在鸟类传统分类系统中是鸟纲鹳形目中的一个科，又俗稱送子鳥。'}
                    />
                    <Card.footer />
                </Card>

                <Card>
                    <Card.header
                        subtitle={'中文维基百科上的最多阅读'}
                        title={'11月25日 星期六'}
                    />
                    <Card.body
                        imgSrc={"https://upload.wikimedia.org/wikipedia/commons/7/76/Stork.jpg"}
                        title={"鹳科"}
                        description={'鹳科在鸟类传统分类系统中是鸟纲鹳形目中的一个科，又俗稱送子鳥。'}
                    />
                    <Card.footer />
                </Card>
                <BottomNavBar></BottomNavBar>



            </main>
        )
    }
}
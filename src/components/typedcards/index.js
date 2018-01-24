import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Card, { SaveForLater } from '@cpt/card/'
import WikiList from '@cpt/wiki-list/'

import dice from '@/icon/003-dice.svg'
import ranking from '@/icon/ranking.svg'
import books from '@/icon/books.svg'


import mapTime from '@/js/mapTime'
const SummaryShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    extract: PropTypes.string.isRequired,
    pageid: PropTypes.number.isRequired
})


export class Random extends React.Component {
    render() {
        const { summary, isSaved,
            toggleSave, onCardClick } = this.props
        return (
            <Card onClick={onCardClick}>
                <Card.header subtitle="Random article" title="Wikipedia" thumb={dice} />
                <Card.body
                    imgSrc={_.get(summary, 'thumbnail.source')} //_.get(summary, 'originalimage.source') ||
                    description={summary.description || summary.extract}
                    title={summary.title}
                >
                    <SaveForLater saved={isSaved} onClick={(e) => { toggleSave(summary.title); e.stopPropagation() }} />
                </Card.body>
                {/* <Card.footer /> */}
            </Card>
        )
    }
}
Random.propTypes = {
    summary: SummaryShape,
    isSaved: PropTypes.bool.isRequired,
}



export class TopRead extends React.Component {

    get dayString() {
        const date = this.props.date
        let y = date.substr(0, 4)
        let m = date.substr(4, 2)
        let d = date.substr(6, 2)
        return `${m}月${d}日`
    }
    render() {
        const { items, date,
            onFooterClick, } = this.props
        return (
            <Card>
                <Card.header
                    subtitle="Top read on Chinese Wikipedia"
                    title={this.dayString}
                    thumb={ranking}
                ></Card.header>
                <WikiList items={items.slice(0, 5)} noborder />
                <Card.footer onFooterClick={onFooterClick}>
                    {`在 ${this.dayString} 的更多热门条目`}
                </Card.footer>
            </Card>
        )
    }
}

TopRead.propTypes = {
    time: PropTypes.number,
    items: PropTypes.arrayOf(SummaryShape),
}



export class MoreLike extends React.Component {
    render() {
        const { time, summary, items,
            onFooterClick } = this.props
        return (
            <Card>
                <Card.header subtitle="Because you read" 
                title={mapTime(time).readableTime} 
                thumb={books}                
                />
                <Card.body
                    imgSrc={summary.originalimage.source}
                    description={summary.description || summary.extract}
                    title={summary.title}
                />
                <WikiList items={items.slice(0, 3)} noborder />
                <Card.footer onFooterClick={onFooterClick} >
                    {`更多类似 ${summary.title} 的条目`}
                </Card.footer>
            </Card>
        )
    }
}

MoreLike.propTypes = {
    time: PropTypes.number, // readable time
    summary: SummaryShape,
    items: PropTypes.arrayOf(SummaryShape),
}

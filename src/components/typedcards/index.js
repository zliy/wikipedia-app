import React from 'react'
import PropTypes from 'prop-types'

import Card from '@cpt/card/'
import WikiList from '@cpt/wiki-list/'

import mapTime from '@/js/mapTime'
const SummaryShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    extract: PropTypes.string.isRequired,
    pageid: PropTypes.number.isRequired
})


export class Random extends React.Component {
    render() {
        const { summary } = this.props
        return (
            <Card>
                <Card.header subtitle="Random article" title="Wikipedia" />
                <Card.body
                    imgSrc={summary.originalimage.source}
                    description={summary.description || summary.extract}
                    title={summary.title}
                />
                <Card.footer />
            </Card>
        )
    }
}
Random.propTypes = {
    summary: SummaryShape,
}



export class TopRead extends React.Component {
    render() {
        const { date, items } = this.props
        return (
            <Card>
                <Card.header
                    subtitle="Top read on Chinese Wikipedia"
                    title={date}
                ></Card.header>
                <WikiList items={items} noborder />
                <Card.footer />
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
        const { time, summary, items } = this.props
        return (
            <Card>
                <Card.header subtitle="Because you read" title={mapTime(time).readableTime} />
                <Card.body
                    imgSrc={summary.originalimage.source}
                    description={summary.description || summary.extract}
                    title={summary.title}
                />
                <WikiList items={items.slice(0, 3)} noborder />

                <Card.footer />

            </Card>
        )
    }
}

MoreLike.propTypes = {
    time: PropTypes.number, // readable time
    summary: SummaryShape,
    items: PropTypes.arrayOf(SummaryShape),
}

import React from 'react'
import PropTypes from 'prop-types'

import Card from '@cpt/card/'
import WikiList from '@cpt/wiki-list/'

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
        const { time, items } = this.props
        return (
            <Card>
                <Card.header
                    subtitle="Top read on Chinese Wikipedia"
                    title={time}
                ></Card.header>
                <WikiList items={items} />
                <Card.footer />
            </Card>
        )
    }
}

TopRead.propTypes = {
    time: PropTypes.number,
    items: PropTypes.arrayOf(SummaryShape),
}



export class BeacuseURead extends React.Component {
    render() {
        const { time, summary, items } = this.props
        return (
            <Card>
                <Card.header subtitle="Because you read" title={time} />
                <Card.body
                    imgSrc={summary.originalimage.source}
                    description={summary.description || summary.extract}
                    title={summary.title}
                />
                <WikiList items={items.slice(0, 3)} />

                <Card.footer />

            </Card>
        )
    }
}

BeacuseURead.propTypes = {
    time: PropTypes.number, // readable time
    summary: SummaryShape,
    items: PropTypes.arrayOf(SummaryShape),
}

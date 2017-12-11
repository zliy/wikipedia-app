import React from "react"
import TopNavBar from "@cpt/top-navbar"
import JView from "react-json-view"

class Setting extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { history } = this.props

        return (
            <main>
                <TopNavBar
                    iconLeft={TopNavBar.i.back}
                    leftContent="Close"
                    onLeftClick={() => history.goBack()}
                >Settings</TopNavBar>
                <section>
                    <h2>localstorage
                        <button style={{ color: "blue" }}
                            onClick={() => { localStorage.clear(); this.forceUpdate() }}> Clear
                                </button>
                    </h2>
                    {Object.keys(localStorage).map((valkey) => {
                        return <JView key={valkey}
                            indentWidth="2" collapsed="1" name={valkey}
                            src={JSON.parse(localStorage[valkey])}></JView>
                    })}
                </section>
            </main>
        )
    }
}


export default Setting

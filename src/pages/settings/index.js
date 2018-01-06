import React from "react"
import TopNavBar from "@cpt/top-navbar"
import JView from "react-json-view"

import Dexie from 'dexie';
import db from '@/js/db'

class Setting extends React.Component {

    render() {
        const { history } = this.props

        return (
            <main className='settings'>
                <TopNavBar
                    iconLeft={TopNavBar.i.back}
                    leftContent="Close"
                    onLeftClick={() => history.goBack()}
                >Settings</TopNavBar>
                <section>
                    
                        <button style={{ color: "blue" }}
                            onClick={() => { db.delete().then(()=>{window.location.reload()});  }}> 
                            delete indexDB:wikipedia
                                </button>
                    

                    <button style={{ color: "blue" }} onClick={()=>{window.loadTestDataToIndexDB()}}
                    >loadTestDataToIndexDB()</button>

                    {/* {Object.keys(localStorage).map((valkey) => {
                        return <JView key={valkey}
                            indentWidth="2" collapsed="1" name={valkey}
                            src={JSON.parse(localStorage[valkey])}></JView>
                    })} */}
                </section>
            </main>
        )
    }
}


export default Setting

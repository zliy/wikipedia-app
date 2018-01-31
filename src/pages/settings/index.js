import React from "react"
import TopNavBar from "@cpt/top-navbar"

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
                    <ul>
                        <li>                <button style={{ color: "blue" }}
                            onClick={() => { window.loadTestDataToIndexDB() }}>
                            加载测试数据
                    </button></li>
                        <li>                    <button style={{ color: "blue" }}
                            onClick={() => { db.delete().then(() => { window.location.reload() }); }}>
                            删除数据库
                    </button>
                        </li>
                    </ul>




                </section>
            </main>
        )
    }
}


export default Setting

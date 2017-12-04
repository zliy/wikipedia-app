import React from "react"
import SVG from 'react-inlinesvg';

import search from '@/icon/007-search.svg'
import back from '@/icon/001-back.svg'
import settings from '@/icon/005-settings.svg'

let ICONS = { search, back, settings }

for (let [name, url] of Object.entries(ICONS)) {
    ICONS[name] = <SVG src={url}/>
}


export default ICONS


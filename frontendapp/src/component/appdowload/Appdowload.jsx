import React from 'react'
import './appdowload.css'
import {assets} from '../../assets/asset.js'
const Appdowload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>For better Exerience Dowload <br /> Zomato app</p>
      <div  className="app-dowload-platform">
        <img src={assets.appstore} alt="" />
        <img src={assets.playstore} alt="" />
      </div>
    </div>
  )
}

export default Appdowload

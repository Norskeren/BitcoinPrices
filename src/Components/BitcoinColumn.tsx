import React from 'react'
import '../CSS/BitcoinColumn.css'
import {Bitcoin} from '../Types/types'
const BitcoinColumn: React.FC<Bitcoin> = (
    {
        high,
        low,
        close,
        open,
        volumefrom,
        volumeto,
        time
    }) => {

    return (
        <div id="div_BitcoinColumn">
            <div id="div_time_container">
                <div>
                    <p><span>Date:</span></p>
                    <p>{new Date(time*1000).toLocaleDateString('en-US')}</p>
                </div>
            </div>
            <div>
                <div><p><span>Volume to:</span> </p><p>{volumeto}</p></div>
                <div><p><span>Volume from:</span> </p><p>{volumefrom}</p></div>
            </div>

            <div>
                <div><p><span>High:</span> </p><p>{high}</p></div>
                <div><p><span>Low:</span> </p><p>{low}</p></div>
            </div>
            <div>
                <div><p><span>Open:</span> </p><p>{open}</p></div>
                <div><p><span>Close:</span> </p><p>{close}</p></div>
            </div>


        </div>
    )
}

export default BitcoinColumn

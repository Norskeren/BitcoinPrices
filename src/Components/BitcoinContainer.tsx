import React, {useState, useEffect} from 'react'
import '../CSS/BitcoinContainer.css'
import BitcoinColumn from "./BitcoinColumn";
import {Bitcoin, BitcoinList} from "../Types/types";
import axios from "axios";

function BitcoinContainer() {

    const [bitcoinData, setBitcoinData] = useState<BitcoinList>() // data from API
    const [pageNumber, setPageNumber] = useState(0); // current page number -1 for easier math calculation
    const [dataSize, setDataSize] = useState(0); // the size of the data
    const [pageLimit, setPageLimit] = useState(0);

    // updates pageNumber if sessionStorage !== null, fetches data into bitcoinData,
    useEffect(() => {
        if (sessionStorage.getItem("currentPage")) {
            setPageNumber(Number(sessionStorage.getItem("currentPage")));
        }

        const fetchBitcoinData = async () => {
            await axios.get<BitcoinList>('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
                .then((response) => {
                    setBitcoinData(response.data);
                });
        }

        fetchBitcoinData()
            .catch(console.error);

    }, []);

    // updates pageNumber and sessionstorage after next or previous is clicked
    const updateCurrentPage = (page: string) => {
        if (page === "prev") {
            if (pageNumber > 0) {
                setPageNumber(pageNumber - 1);
                sessionStorage.setItem("currentPage", String(pageNumber - 1));
            }
        } else if (page === "next") {
            if (pageNumber < pageLimit) {
                setPageNumber(pageNumber + 1);
                sessionStorage.setItem("currentPage", String(pageNumber + 1));
            }
        } else {
            console.log("error");
        }
    }
    // When bitcoinData changes, set new length to dataSize
    useEffect(() => {
        if (bitcoinData) {
            setDataSize(bitcoinData.Data.Data.length)

        }

    }, [bitcoinData])
    // when dataSize updates, set new pageLimit
    useEffect(() => {
        setPageLimit(Math.floor(dataSize / 20))
    }, [dataSize])

    return (
        <div id="div_bitcoin_container">
            <div className="div_button_container">
                {/*Conditionally render next or previous button based on what page you are on*/}
                {pageNumber !== 0 && <button onClick={() => {
                    updateCurrentPage("prev")
                }}>Previous</button>}
                <p id="p_pageNumber">Page: {pageNumber + 1}</p>
                {pageNumber !== pageLimit && <button onClick={() => {
                    updateCurrentPage("next")
                }}>Next</button>}
            </div>
            {/*Render BitcoinColumn component if bitcoinData has a value*/}
            {bitcoinData && bitcoinData.Data.Data.slice(pageNumber * 20, pageNumber * 20 + 20).map((bitcoin: Bitcoin) => {
                return (
                    <BitcoinColumn
                        close={bitcoin.close}
                        high={bitcoin.high}
                        low={bitcoin.low}
                        open={bitcoin.open}
                        time={bitcoin.time}
                        volumefrom={bitcoin.volumefrom}
                        volumeto={bitcoin.volumeto}
                    />
                )
            })}
            <div className="div_button_container">
                {pageNumber !== 0 && <button onClick={() => {
                    updateCurrentPage("prev")
                }}>Previous</button>}
                {pageNumber !== pageLimit && <button onClick={() => {
                    updateCurrentPage("next")
                }}>Next</button>}
            </div>
        </div>

    )
}

export default BitcoinContainer
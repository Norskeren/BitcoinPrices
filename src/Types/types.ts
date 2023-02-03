export type Bitcoin = {
    high: number;
    low: number;
    close: number;
    open: number;
    volumefrom: number;
    volumeto: number;
    time: number;
}
export type BitcoinList = {
    Data: {
        Data: Bitcoin[]
    }
}
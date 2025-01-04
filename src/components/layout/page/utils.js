export const calculateBasketPrice = () => {
    const cartData = localStorage.getItem("dataGelary")

    if (cartData) {
        const parse = JSON.parse(cartData)
        let countPrice = 0
        parse.forEach(v=>{
            countPrice += v?.price * v.count
        })

        return countPrice
    }

    return 0
}
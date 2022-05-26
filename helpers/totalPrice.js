function finalPrice(price, member){
    if(member === "Gold"){
        const output = price - price*0.15
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(output)
    }else{
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    }
}

module.exports = finalPrice
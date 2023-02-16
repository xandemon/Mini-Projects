const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD"
})

export default function priceFormatter(amount) {
    return formatter.format(amount/100);
}
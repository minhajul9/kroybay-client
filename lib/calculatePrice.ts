export const calculatePrice = (basePrice: string | number,discountType: string,  discountValue: string | number) => {
    const hasDiscount = !!discountType;

    let price;

    if (hasDiscount) {
        if (discountType == "FLAT") {
            price = Number(basePrice) - Number(discountValue);
        }
        else {
            price = Math.ceil(Number(basePrice) - ((Number(basePrice) / 100) * Number(discountValue)));
        }
    }
    else {
        price = basePrice
    }

    return {price, hasDiscount};
}
// export const DisplayPriceInRupees = (price)=>{
//     return new Intl.NumberFormat('en-IN',{
//         style : 'currency',
//         currency : 'INR'
//     }).format(price)
// }


export const DisplayPriceInRupees = (price) => 
    isNaN(price) || price === null || price === undefined
        ? 'Invalid Price'
        : new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2, // Ensures proper formatting
        }).format(Number(price));

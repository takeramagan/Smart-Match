// export const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'CAD',
//   maximumFractionDigits: 0,
//   minimumFractionDigits: 0
//   // These options are needed to round to whole numbers if that's what you want.
//   // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//   // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
// })
// export const formatter = (countryCode) => {
//   const currency = countryCode === 'us' ? 'USD' : 'CAD'
//   const format =  new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//     maximumFractionDigits: 0,
//     minimumFractionDigits: 0
//   })
//   //给美元符号$ 增加USD :显示效果为USD$
//   const newFormat = {...format, format: (num) => ((countryCode === 'us' ? 'USD' : '') + format.format(num))}
//   return newFormat
// }
export const formatter = (countryCode) => {
  const currency = countryCode === 'us' ? 'USD' : 'CAD'
  const format =  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })
  //给美元符号$ 增加USD :显示效果为USD$
  const newFormat = {...format, format: (num) => (
    (countryCode === 'us' ? 'USD$' : 'CAD$') + (num ? format.format(num) : 'N.A')
    )}
  return newFormat
}


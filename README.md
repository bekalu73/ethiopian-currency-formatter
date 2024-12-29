# Ethiopian Currency Formatter

A lightweight library to format numbers into Ethiopian Birr (ETB) and convert numbers to Amharic words.

## Installation

```bash
npm install ethiopian-currency-formatter
```

## Usage

```javascript
const {
  formatToETB,
  numberToAmharic,
  numberToAmharicWithDecimals,
  parseETB,
} = require("ethiopian-currency-formatter");

console.log(formatToETB(1234.56)); // "ETB 1,234.56"
console.log(formatToETB(1234.56, { withSymbol: false })); // "1,234.56"
console.log(formatToETB(1234.56, { locale: "am-ET" })); // "ETB 1,234.56" (formatted for Amharic locale)
console.log(numberToAmharic(1234)); // "አንድ ሺህ ሁለት መቶ ሠላሳ አራት"
console.log(numberToAmharicWithDecimals(1234.56)); // "አንድ ሺህ ሁለት መቶ ሠላሳ አራት ነጥብ አምስት ስድስት"
console.log(parseETB("ETB 1,234.56")); // 1234.56
```

## Repository

For more information, visit the [GitHub repository](https://github.com/bekalu73/ethiopian-currency-formatter).

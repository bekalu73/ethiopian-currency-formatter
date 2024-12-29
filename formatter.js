// formatter.js
const units = [
  "",
  "አንድ",
  "ሁለት",
  "ሶስት",
  "አራት",
  "አምስት",
  "ስድስት",
  "ሰባት",
  "ስምንት",
  "ዘጠኝ",
];
const tens = ["", "", "ሃያ", "ሠላሳ", "አርባ", "ሃምሳ", "ስልሳ", "ሰባ", "ሰማንያ", "ዘጠና"];
const scales = ["", "ሺህ", "ሚሊዮን", "ቢሊዮን"];

const validateNumber = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("Input must be a valid number");
  }
};

const formatToETB = (amount, options = {}) => {
  validateNumber(amount);
  const { locale = "en-ET", currency = "ETB", withSymbol = true } = options;
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
  return withSymbol
    ? formattedAmount
    : formattedAmount.replace(/[^0-9.,]/g, "");
};

const numberToAmharic = (number) => {
  validateNumber(number);
  if (number === 0) return "ዜሮ";

  const chunks = [];
  let scale = 0;

  while (number > 0) {
    const chunk = number % 1000;
    if (chunk) chunks.push({ chunk, scale });
    number = Math.floor(number / 1000);
    scale++;
  }

  return chunks
    .reverse()
    .map(({ chunk, scale }) => {
      const hundreds = Math.floor(chunk / 100);
      const remainder = chunk % 100;
      const tensPlace = Math.floor(remainder / 10);
      const unitsPlace = remainder % 10;

      const parts = [];
      if (hundreds) parts.push(`${units[hundreds]} መቶ`);
      if (tensPlace) parts.push(tens[tensPlace]);
      if (unitsPlace) parts.push(units[unitsPlace]);

      return `${parts.join(" ")} ${scales[scale]}`.trim();
    })
    .join(" ");
};

const numberToAmharicWithDecimals = (number) => {
  const [integerPart, decimalPart] = number.toString().split(".");
  const amharicInteger = numberToAmharic(parseInt(integerPart, 10));

  if (!decimalPart) return amharicInteger;

  const amharicDecimals = decimalPart
    .split("")
    .map((digit) => units[parseInt(digit, 10)])
    .join(" ");

  return `${amharicInteger} ነጥብ ${amharicDecimals}`;
};

const parseETB = (formattedString) => {
  if (typeof formattedString !== "string") {
    throw new Error("Input must be a string");
  }
  const number = parseFloat(formattedString.replace(/[^\d.-]/g, ""));
  if (isNaN(number)) {
    throw new Error("Invalid currency format");
  }
  return number;
};

module.exports = {
  formatToETB,
  numberToAmharic,
  numberToAmharicWithDecimals,
  parseETB,
  // ...additional exports if needed...
};

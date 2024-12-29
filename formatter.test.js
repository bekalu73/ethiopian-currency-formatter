const { formatToETB, numberToAmharic } = require("./formatter");

test("formats numbers to ETB", () => {
  expect(formatToETB(1234.56)).toBe("ETB 1,234.56");
  expect(formatToETB(1234.56, { withSymbol: false })).toBe("1,234.56");
  expect(formatToETB(1234.56, { locale: "am-ET" })).toBe("ETB 1,234.56");
});

test("converts numbers to Amharic words", () => {
  expect(numberToAmharic(1234)).toBe("አንድ ሺህ ሁለት መቶ ሠላሳ አራት");
  expect(numberToAmharic(0)).toBe("ዜሮ");
});

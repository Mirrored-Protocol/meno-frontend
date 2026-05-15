export const DISPLAY_ASSET_SYMBOL = "XLM";
export const MOCK_FIAT_RATE = 0.12;

export function formatPrice(
   amount,
   { showFiat = false, symbol = DISPLAY_ASSET_SYMBOL, fiatRate = MOCK_FIAT_RATE } = {}
) {
   const parsedAmount = Number.parseFloat(amount);

   if (Number.isNaN(parsedAmount)) {
      return showFiat ? "$0.00" : `0 ${symbol}`;
   }

   if (showFiat) {
      const fiatValue = parsedAmount * fiatRate;
      return `$${fiatValue.toFixed(2)}`;
   }

   return `${parsedAmount.toFixed(2)} ${symbol}`;
}

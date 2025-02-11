const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 97770;
const SELL_PRICE = 98452;

const API_URL = "https://testnet.binance.vision"; //https://api.binance.com

let isOpened = false;

async function start() {
  //comandos do robô
  const { data } = await axios.get(
    API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL
  );
  const candle = data[data.length - 1];
  const price = parseFloat(candle[4]);

  //console.clear();
  console.log("Preço: " + price);

  if (price <= BUY_PRICE && isOpened === false) {
    console.log("COMPROU NO VALOR DE $ " + price);
    isOpened = true;
  } else if (price >= SELL_PRICE && isOpened === true) {
    console.log("VENDEU NO VALOR DE $ " + price);
    isOpened = false;
  } else {
    console.log("Aguardar...");
  }
}

setInterval(start, 3000);
start();

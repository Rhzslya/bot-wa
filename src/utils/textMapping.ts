import {
  axisProduct,
  briProduct,
  eWalletProduct,
  gopayProduct,
  indosatProduct,
  plnProduct,
  smartfrenProduct,
  telkomselProduct,
  threeProduct,
  xlProduct,
} from "./textMessage";
export const statusMapping = {
  "0": "Belum Selesai",
  "1": "Selesai",
  "2": "Dalam Proses",
  "3": "Tidak Bisa Diperbaiki",
};

export const productPriceMapping = {
  telkomsel: telkomselProduct,
  axis: axisProduct,
  xl: xlProduct,
  indosat: indosatProduct,
  three: threeProduct,
  smartfren: smartfrenProduct,
  dana: eWalletProduct,
  shopee: eWalletProduct,
  ovo: eWalletProduct,
  gopay: gopayProduct,
  pln: plnProduct,
  bri: briProduct,
};

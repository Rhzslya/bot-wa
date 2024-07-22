import { axisProduct, telkomselProduct } from "./textMessage";
export const statusMapping = {
  "0": "Belum Selesai",
  "1": "Selesai",
  "2": "Dalam Proses",
  "3": "Tidak Bisa Diperbaiki",
};

export const productPriceMapping = {
  telkomsel: telkomselProduct,
  axis: axisProduct,
};

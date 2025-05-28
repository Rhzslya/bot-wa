import { capitalizeFirst } from "./capitalizeFirst";
import { formatPriceToIDR } from "./formatPrice";
import { getGreeting } from "./getGreetings";

export const helpMessageForCustomer = `*Sinari Cell Bot Help*

Selamat datang di layanan bantuan Sinari Cell! Berikut adalah daftar perintah yang bisa Anda gunakan:

1.Periksa status layanan
\`\`\`!status(spasi)[ServiceID]\`\`\`
  
\`\`\`_Contoh:_ !status(spasi)12345\`\`\`

2.Menampilkan Harga Produk
\`\`\`!harga(spasi)[Nama Produk]\`\`\`

\`\`\`_Contoh:_ !harga(spasi)indosat\`\`\`

Note: Produk Tersedia
- Telkomsel
- Axis
- XL
- Indosat
- Three
- Smartfren
- Dana
- Shopee
- Ovo
- Gopay
- PLN
- BRI

3.Menampilkan pesan bantuan ini.
\`\`\`!help\`\`\`

Jika Anda membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami!

Terima kasih telah menggunakan layanan kami. 😊

*Sinari Cell*
`;

export const helpMessageForAdmin = `*Sinari Cell Bot Help*

Selamat datang di layanan bantuan Sinari Cell! Berikut adalah daftar perintah yang bisa Anda gunakan:

1.Tambahkan Service baru.
\`\`\`!add_service
[Nama] 
[Nomor Handphone] 
[Tipe Handphone] 
[Tipe Servis] 
[Harga]\`\`\`

\`\`\`_Contoh:_
!add_service
Sinari 
08123456789 
Samsung A51 
Ganti LCD 
500000\`\`\`

2.Tambahkan Produk baru.
\`\`\`!add_product
ID Produk
Provider (Telkomsel/Axis/dll)
Tipe Produk (pulsa/internet)
Harga Modal
Harga Jual
Deskripsi\`\`\`

\`\`\`_Contoh:_
!add_product
AX5 
Axis 
Pulsa 
5000
8000
Pulsa 5K
\`\`\`

\`\`\`Note : Semua baris setelah harga jual akan dianggap sebagai bagian dari deskripsi.\`\`\`

3.Tambahkan Produk E-Wallet atau Bank baru.
\`\`\`!add_fee_product
ID Produk
Provider (Dana/OVO/BRI/etc)
Tipe Produk (e-wallet/bank)
Harga Min
Harga Maks
Fee
Deskripsi\`\`\`

\`\`\`_Contoh:_
!add_product
DN100
Dana
e-wallet
10000 
100000
3000
Dana 10K - 100K
\`\`\`

\`\`\`Note : Semua baris setelah Fee akan dianggap sebagai bagian dari deskripsi.\`\`\`

4.Update Harga Produk
\`\`\`!update_product
ID Produk
Harga Jual Baru
Deskripsi\`\`\`

\`\`\`_Contoh:_
!update_product
AX5 
5000
Pulsa 5K  
\`\`\`    

\`\`\`Note : Semua baris setelah Harga Jual akan dianggap sebagai bagian dari deskripsi.\`\`\`

5.Update Produk E-Wallet atau Bank
\`\`\`!update_fee_product
ID Produk
Harga Min Baru
Harga Maks Baru
Fee Baru
Deskripsi\`\`\`

\`\`\`_Contoh:_
!update_product
DN100
10000 
100000
3000
Dana 10K - 100K  
\`\`\`  

\`\`\`Note : Semua baris setelah Fee akan dianggap sebagai bagian dari deskripsi.\`\`\`

6.Periksa status layanan
\`\`\`!status(spasi)[ServiceID]\`\`\`
  
\`\`\`_Contoh:_ !status(spasi)12345\`\`\`

7.Perbarui status layanan.
\`\`\`!update(spasi)[ServiceID](spasi)[StatusNumber]\`\`\`

\`\`\`_Contoh:_ !update(spasi)12345(spasi)1
➤ StatusNumber: 
0 untuk _"Belum Selesai"_ 
1 untuk _"Selesai"_
2 untuk _"Dalam Proses"_
3 untuk _"Tidak Bisa Diperbaiki"_\`\`\`

8.Menampilkan Harga
\`\`\`!harga(spasi)[Nama Provider]\`\`\`

\`\`\`_Contoh:_ !harga(spasi)indosat\`\`\`

Note: Produk Tersedia
- Telkomsel
- Axis
- XL
- Indosat
- Three
- Smartfren
- Dana
- Shopee
- Ovo
- Gopay
- PLN
- BRI

9.Menampilkan pesan bantuan ini.
\`\`\`!help\`\`\`

*Sinari Cell*
`;

export const helloText = (pushName: string) =>
  `*Halo ${getGreeting()}, ${pushName}!* \n\nSelamat datang di *Sinari Cell.*\n\nKami menyediakan berbagai layanan perbaikan untuk *smartphone, laptop, dan komputer*, serta menyediakan *sparepart berkualitas* untuk perangkat tersebut. Jangan ragu untuk bertanya mengenai layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n_Apa yang bisa kami bantu hari ini?_ \n\nUntuk informasi lebih lanjut tentang penggunaan bot ini, silakan ketik *"!help".*`;

export const validProviders = [
  "telkomsel",
  "axis",
  "indosat",
  "tri",
  "smartfren",
  "xl",
  "byu",
  "pln",
];

export const validProvidersWithFee = [
  "dana",
  "shopee",
  "ovo",
  "gopay",
  "pln",
  "bri",
  "otherBanks",
];

export const eWalletProviders = ["dana", "shopee", "ovo", "gopay"];
export const pulsaInternetProviders = [
  "telkomsel",
  "axis",
  "indosat",
  "tri",
  "smartfren",
  "xl",
  "byu",
];
export const bankProviders = ["bri", "otherBanks"];
export const listrikProviders = ["pln"];

export const confirmationDeleteProduct = ({
  productId,
  provider,
  productType,
  price,
  basePrice,
  description,
}: {
  productId: string;
  provider: string;
  productType: string;
  price: number;
  basePrice?: number;
  description: string;
}) => {
  const NBSP = "\u00A0";

  const rows = [
    { label: "ID", value: productId },
    { label: "Provider", value: capitalizeFirst(provider) },
    { label: "Tipe", value: capitalizeFirst(productType) },
    { label: "Harga", value: formatPriceToIDR(price) },
    {
      label: "Base Price",
      value: basePrice ? formatPriceToIDR(basePrice) : "Tidak ada",
    },
    { label: "Deskripsi", value: capitalizeFirst(description) },
  ];

  const maxLabelLength = Math.max(...rows.map((row) => row.label.length));
  const spacing = 4;

  let lines = rows.map((row) => {
    const paddedLabel =
      row.label +
      NBSP.repeat(maxLabelLength - row.label.length + spacing) +
      ":";
    return `${paddedLabel}${NBSP.repeat(2)}${row.value}`;
  });

  let result = [
    "*Product Delete Confirmation*",
    "```",
    "",
    ...lines,
    "",
    "Ketik (y) untuk hapus, atau (n) untuk batal. (30 detik)",
    "```",
  ].join("\n");

  return result;
};

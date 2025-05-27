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

2.Periksa status layanan
\`\`\`!status(spasi)[ServiceID]\`\`\`
  
\`\`\`_Contoh:_ !status(spasi)12345\`\`\`

3.Perbarui status layanan.
\`\`\`!update(spasi)[ServiceID](spasi)[StatusNumber]\`\`\`

\`\`\`_Contoh:_ !update(spasi)12345(spasi)1
➤ StatusNumber: 
0 untuk _"Belum Selesai"_ 
1 untuk _"Selesai"_
2 untuk _"Dalam Proses"_
3 untuk _"Tidak Bisa Diperbaiki"_\`\`\`

4.Menampilkan Harga
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

5.Menampilkan pesan bantuan ini.
\`\`\`!help\`\`\`

Jika Anda membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami!

Terima kasih telah menggunakan layanan kami. 😊

*Sinari Cell*
`;

export const axisProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk Axis

Daftar Pulsa:
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  15.000  : Rp  17.000
•  20.000  : Rp  22.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  50.000  : Rp  52.000
• 100.000  : Rp 102.000

Daftar Paket Internet:
•  Kuota Utama 1GB 5 Hari : Rp  17.000
•  Kuota Utama 2GB + 10GB Malam 5 Hari : Rp  25.000
•  Kuota Utama 3.5GB 7 Hari : Rp  29.000

•  Kuota Utama 4GB 15 Hari : Rp  34.000
•  Kuota Utama 6GB 15 Hari : Rp  35.000
•  Kuota Utama 8GB 15 Hari : Rp  50.000

•  Bronet 1GB 24 Jam 30 Hari : Rp  22.000
•  Bronet 2GB 24 Jam 30 Hari : Rp  33.000
•  Bronet 3GB 24 Jam 30 Hari : Rp  42.000
`;

export const telkomselProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk Telkomsel

Daftar Pulsa:
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  15.000  : Rp  17.000
•  20.000  : Rp  22.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  50.000  : Rp  52.000
•  60.000  : Rp  62.000
•  65.000  : Rp  67.000
•  70.000  : Rp  72.000
•  75.000  : Rp  77.000
•  80.000  : Rp  82.000
•  85.000  : Rp  87.000
•  90.000  : Rp  92.000
•  95.000  : Rp  97.000
• 100.000  : Rp 102.000

Daftar Paket Internet:
•  Flash 1GB 30 Hari : Rp  25.000 
•  Flash 2GB 30 Hari : Rp  47.000 
•  Flash 3GB 30 Hari : Rp  65.000
 
•  Flash 4GB + 1GB OMG 30 Hari : Rp  57.000
•  Flash 6GB + 2GB OMG 30 Hari : Rp  85.000
•  Flash 10GB + 2GB OMG 30 Hari : Rp  115.000

•  Data 70MB 7 Hari : Rp  13.000
•  Data 500MB 7 Hari : Rp  25.000
•  Data 1GB + 5GB Maxstream 30 Hari : Rp  30.000
`;

export const xlProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk XL

Daftar Pulsa:
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  15.000  : Rp  17.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  50.000  : Rp  52.000
• 100.000  : Rp 102.000

Daftar Paket Internet
•  Kuota Utama 1GB + 1GB Youtube 7 Hari : Rp  18.000
•  Kuota Utama 1.5GB + 1.5GB Youtube 7 Hari : Rp  22.000
•  Kuota Utama 2.5GB + 2.5GB Youtube 7 Hari : Rp  29.000

•  Kuota Utama 5GB + 10GB Youtube + 20 Menit Telepon 30 Hari : Rp  65.000
•  Kuota Utama 10GB + 20GB Youtube + 40 Menit Telepon 30 Hari : Rp  95.000

•  Kuota Utama 1.5GB + Lokal 2GB + Unl Whatsapp & Line 30 Hari : Rp  24.000
•  Kuota Utama 3GB + Lokal 4.5GB + Unl Whatsapp & Line 30 Hari : Rp  37.000
•  Kuota Utama 5GB + Lokal 4GB + Unl Whatsapp & Line 30 Hari : Rp  48.000
•  Kuota Utama 9GB + Lokal 6GB + Unl Whatsapp & Line 30 Hari : Rp  69.000
`;

export const indosatProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk Indosat

Daftar Pulsa:
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  12.000  : Rp  14.000
•  15.000  : Rp  17.000
•  20.000  : Rp  22.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  40.000  : Rp  42.000
•  50.000  : Rp  52.000
•  60.000  : Rp  62.000
•  70.000  : Rp  72.000
•  80.000  : Rp  82.000
•  90.000  : Rp  92.000
• 100.000  : Rp 102.000

Daftar Paket Internet:
•  Freedom Unlimited 5.5GB 30 Hari : Rp  40.000
•  Freedom Unlimited 10GB 30 Hari : Rp  64.000
•  Freedom Unlimited 20GB 30 Hari : Rp  89.000
•  Freedom Unlimited 35GB 30 Hari : Rp  115.000

•  Freedom 3GB 30 Hari : Rp  25.000
•  Freedom 5.5GB 30 Hari : Rp  37.000
•  Freedom 7GB 30 Hari : Rp  40.000
•  Freedom 9GB 30 Hari : Rp  50.000
•  Freedom 16GB 30 Hari : Rp  77.000

•  Freedom 1GB 2 Hari : Rp  9.000
•  Freedom 2.5GB 5 Hari : Rp  16.000
•  Freedom 5GB 5 Hari : Rp  23.000
`;

export const threeProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk Three

Daftar Pulsa:
•   1.000  : Rp   3.000
•   2.000  : Rp   4.000
•   3.000  : Rp   5.000
•   4.000  : Rp   6.000
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  15.000  : Rp  17.000
•  20.000  : Rp  22.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  40.000  : Rp  42.000
•  50.000  : Rp  52.000
•  75.000  : Rp  77.000
• 100.000  : Rp 102.000

Daftar Paket Internet:
•  Kuota Utama 1GB + 4GB Malam 1 Hari : Rp   8.000
•  Kuota Utama 2.75GB All 3 Hari : Rp   15.000

•  Always On 2.5GB Full 24 Jam : Rp  23.000
•  Always On 3.5GB Full 24 Jam : Rp  27.000
•  Always On 6GB Full 24 Jam : Rp  38.000

•  Happy 1.5GB 1 Hari : Rp   8.000
•  Happy 2.5GB 1 Hari : Rp  10.000
•  Happy 5GB 1 Hari : Rp  18.000
•  Happy 1.5GB 7 Hari : Rp  14.000
•  Happy 9GB 10 Hari : Rp  38.000

•  Happy 7GB + 5GB Tiktok 30 Hari : Rp  37.000
•  Happy 11GB + 5GB Tiktok 30 Hari : Rp  54.000
•  Happy 14GB + 5GB Tiktok 30 Hari : Rp  70.000
•  Happy 18GB + 5GB Tiktok 30 Hari : Rp  74.000
•  Happy 30GB + 5GB Tiktok 30 Hari : Rp  85.000
•  Happy 42GB + 5GB Tiktok 30 Hari : Rp  106.000
`;

export const smartfrenProduct = `
Berikut adalah harga Pulsa dan Paket untuk Produk Smartfren

Daftar Pulsa:
•   5.000  : Rp   7.000
•  10.000  : Rp  12.000
•  20.000  : Rp  22.000
•  25.000  : Rp  27.000
•  30.000  : Rp  32.000
•  40.000  : Rp  42.000
•  50.000  : Rp  52.000
•  60.000  : Rp  62.000
•  75.000  : Rp  77.000
• 100.000  : Rp 102.000

Daftar Paket Internet:
•  Kuota Utama 1.25GB + 2.75GB Malam 7 Hari : Rp  15.000
•  Kuota Utama 2GB + 3GB Malam + 1GB Chat 30 Hari : Rp  25.000
•  Kuota Utama 4GB + 4GB Malam + 2GB Chat 30 Hari : Rp  25.000

•  Kuota Utama 1GB/Hari Unlimited 7 Hari : Rp  32.000
•  Kuota Utama 1GB/Hari Unlimited 14 Hari : Rp  54.000
•  Kuota Utama 500MB/Hari Unlimited 28 Hari : Rp  75.000
•  Kuota Utama 700MB/Hari Unlimited 28 Hari : Rp  83.000
•  Kuota Utama 2GB/Hari Unlimited 28 Hari : Rp  95.000

•  Nonstop 2GB 10 Hari : Rp  14.000
•  Nonstop 3GB 14 Hari : Rp  22.000
•  Nonstop 12GB 30 Hari : Rp  59.000
•  Nonstop 30GB 30 Hari : Rp  82.000
`;

export const eWalletProduct = `
Berikut adalah harga Top-up dan Tarik Saldo Produk e-Wallet Dana, OVO, Shopee

•  Top-Up/Tarik Rp. 10.000 - 49.000 : Admin Rp   2.000 
•  Top-Up/Tarik Rp. 50.000 - 199.000 : Admin Rp   3.000 
•  Top-Up/Tarik Rp. 200.000 - 299.000 : Admin Rp   4.000 
•  Top-Up/Tarik Rp. 300.000 - 399.000 : Admin Rp   5.000 
•  Top-Up/Tarik Rp. 400.000 - 499.000 : Admin Rp   6.000 
•  Top-Up/Tarik Rp. 500.000 - 599.000 : Admin Rp   7.000 
•  Top-Up/Tarik Rp. 600.000 - 799.000 : Admin Rp  10.000 
•  Top-Up/Tarik Rp. 800.000 - 1.500.000 : Admin Rp  12.000 
•  Top-Up/Tarik Rp. 1.501.000 - 2.999.000 : Admin Rp  15.000 
•  Top-Up/Tarik Rp. 3.000.000 - 4.000.000 : Admin Rp  20.000 
`;

export const gopayProduct = `
Berikut adalah harga Top-up dan Tarik Saldo Produk e-Wallet Gopay

•  Top-Up/Tarik Rp. 10.000 - 99.000 : Admin Rp   3.000 
•  Top-Up/Tarik Rp. 100.000 - 249.000 : Admin Rp   4.000 
•  Top-Up/Tarik Rp. 250.000 - 349.000 : Admin Rp   5.000 
•  Top-Up/Tarik Rp. 350.000 - 449.000 : Admin Rp   6.000 
•  Top-Up/Tarik Rp. 450.000 - 549.000 : Admin Rp   7.000 
•  Top-Up/Tarik Rp. 550.000 - 649.000 : Admin Rp   8.000 
•  Top-Up/Tarik Rp. 650.000 - 749.000 : Admin Rp   9.000 
•  Top-Up/Tarik Rp. 750.000 - 999.000 : Admin Rp  10.000 
•  Top-Up/Tarik Rp. 1.000.000 - 1.500.000 : Admin Rp  12.000 
`;

export const plnProduct = `
Berikut adalah harga untuk Produk PLN

Daftar Token:
•  20.000   : Rp  23.000
•  50.000   : Rp  53.000
•  100.000  : Rp  103.000
•  200.000  : Rp  204.000
•  500.000  : Rp  505.000
•  1000.000 : Rp  1.012.000
`;

export const briProduct = `
Berikut adalah harga Produk BRI

Daftar Harga Transfer sesama BRI:
•  Transfer Rp. 10.000 - 100.000 : Admin Rp   3.000 
•  Transfer Rp. 101.000 - 1.000.000 : Admin Rp   5.000 
•  Transfer Rp. 1.001.000 - 2.000.000 : Admin Rp   7.000
•  Transfer Rp. 2.001.000 - 3.000.000 : Admin Rp   10.000
•  Transfer Rp. 3.001.000 - 4.000.000 : Admin Rp   15.000
•  Transfer Rp. 4.001.000 - 5.000.000 : Admin Rp   18.000
•  Transfer Rp. 5.001.000 - 7.000.000 : Admin Rp   20.000

Daftar Harga Transfer Bank Lain:
•  Transfer Rp. 10.000 - 500.000 : Admin Rp  10.000 
•  Transfer Rp. 501.000 - 1.000.000 : Admin Rp  12.000 
•  Transfer Rp. 1.001.000 - 2.000.000 : Admin Rp  13.000 
•  Transfer Rp. 2.001.000 - 3.000.000 : Admin Rp  15.000 
•  Transfer Rp. 3.001.000 - 4.000.000 : Admin Rp  17.000 
•  Transfer Rp. 4.001.000 - 5.000.000 : Admin Rp  20.000 
•  Transfer Rp. 5.001.000 - 6.000.000 : Admin Rp  22.000 
`;

export const helloText = (pushName: string) =>
  `*Halo ${getGreeting()}, ${pushName}!* \n\nSelamat datang di *Sinari Cell.*\n\nKami menyediakan berbagai layanan perbaikan untuk *smartphone, laptop, dan komputer*, serta menyediakan *sparepart berkualitas* untuk perangkat tersebut. Jangan ragu untuk bertanya mengenai layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n_Apa yang bisa kami bantu hari ini?_ \n\nUntuk informasi lebih lanjut tentang penggunaan bot ini, silakan ketik *"!help".*`;

// Daftar provider yang valid
export const validProviders = [
  "telkomsel",
  "axis",
  "indosat",
  "tri",
  "smartfren",
  "xl",
  "byu",
];

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
  const NBSP = "\u00A0"; // non-breaking space

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
    // pad label with NBSP
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
    "Ketik _y_ untuk hapus, atau _n_ untuk batal. (30 detik)",
    "```",
  ].join("\n");

  return result;
};

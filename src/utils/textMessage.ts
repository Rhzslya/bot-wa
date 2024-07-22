export const helpMessageForCustomer = `
🌟 *Sinari Cell Bot Help* 🌟

Selamat datang di layanan bantuan Sinari Cell! Berikut adalah daftar perintah yang bisa Anda gunakan:

1.Periksa status layanan
!status(spasi)[ServiceID]
  
_Contoh:_ !status(spasi)12345

2.!help
➤ Menampilkan pesan bantuan ini.

Jika Anda membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami!

Terima kasih telah menggunakan layanan kami. 😊

🔹 *Sinari Cell* 🔹
`;

export const helpMessageForAdmin = `
🌟 *Sinari Cell Bot Help* 🌟

Selamat datang di layanan bantuan Sinari Cell! Berikut adalah daftar perintah yang bisa Anda gunakan:

1.Tambahkan layanan baru.
!add 
[Nama] 
[Nomor Handphone] 
[Tipe Handphone] 
[Tipe Servis] 
[Price] 

_Contoh:_  
!add
Sinari 
08123456789 
Samsung A51 
Ganti LCD 
500000

2.Periksa status layanan
!status(spasi)[ServiceID]
  
_Contoh:_ !status(spasi)12345

3.Perbarui status layanan.
!update(spasi)[ServiceID](spasi)[StatusNumber]

_Contoh:_ !update(spasi)12345(spasi)1
➤ StatusNumber: 
0 untuk _"Belum Selesai"_ 
1 untuk _"Selesai"_
2 untuk _"Dalam Proses"_
3 untuk _"Tidak Bisa Diperbaiki"_

4.!help
➤ Menampilkan pesan bantuan ini.

Jika Anda membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami!

Terima kasih telah menggunakan layanan kami. 😊

🔹 *Sinari Cell* 🔹
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
`;

export const telkomselProduct = `Berikut adalah harga Pulsa dan Paket untuk Produk Telkomsel`;

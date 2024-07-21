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

**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End

### explain apollo server express
Apollo Server adalah sebuah perangkat lunak (software) yang digunakan untuk membangun server GraphQL. Apollo Server berfungsi sebagai server untuk menerima kueri GraphQL dari klien dan memberikan respons sesuai dengan permintaan tersebut.
Apollo Server Express adalah bagian dari ekosistem Apollo GraphQL yang dirancang untuk berintegrasi dengan Express.js. Apollo Server Express juga merupakan middleware Express.js yang dapat ditambahkan ke aplikasi Express kita. Ini berarti kita dapat menggabungkan Apollo Server ke dalam rantai middleware Express yang ada untuk mengontrol alur permintaan HTTP dan menyediakan API GraphQL melalui rute tertentu di aplikasi kita.

### explain graphQL
GraphQL adalah bahasa kueri dan sistem runtime untuk mengambil dan memanipulasi data dari server. Kueri ini berisi informasi tentang tipe data apa yang diinginkan oleh klien dan bagaimana tipe-tipe tersebut harus dihubungkan. Dengan GraphQL, klien dapat menyusun kueri yang hanya mencakup bidang-bidang data yang benar-benar diperlukan.

Di sisi server, kita mendefinisikan skema GraphQL yang berisi tipe-tipe data yang tersedia, operasi yang diizinkan, dan hubungan antara tipe-tipe tersebut. Misalnya, saya dapat mendefinisikan tipe data Books dan book purchased, serta hubungan antara keduanya dalam skema. 

Ada tiga jenis operasi utama dalam GraphQL: kueri (query), mutasi (mutation), dan langganan (subscription).

1. Kueri digunakan untuk membaca data dari server. Contohnya adalah kueri di atas yang mengambil informasi buku.
2. Mutasi digunakan untuk mengubah data di server, seperti menambahkan, memperbarui, atau menghapus data.
3. Langganan digunakan untuk mengizinkan klien untuk berlangganan pembaruan secara real-time dari server saat data berubah.

GraphQL memecahkan masalah over-fetching (mengambil lebih banyak data dari yang diperlukan) dan under-fetching (mengambil data yang tidak mencukupi) yang sering terjadi dalam REST API. 

Salah satu fitur utama GraphQL adalah bahwa klien hanya mengirim satu permintaan (kueri) ke server, dan server hanya memberikan satu respons.


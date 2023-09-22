**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End

### explain $match
match adalah salah satu operator dalam operasi aggregasi yang digunakan untuk memfilter dokumen untuk meneruskan hanya dokumen yang cocok dengan kondisi yang ditentukan ke tahap alur berikutnya.
Misalnya, dalam kasus ini saya ingin mencari buku dengan genre (fantasy) maka akan dipilih buku hanya yang memiliki genre fantasy.

### explain $sort
sort digunakan untuk mengurutkan dokumen dalam hasil agregasi berdasarkan satu atau lebih kriteria tertentu. Dengan menggunakan $sort, kita dapat mengontrol urutan keluaran dokumen yang diperoleh melalui operasi agregasi. 
kita dapat menentukan apakah ingin mengurutkan secara ascending 1 (dari yang terkecil ke yang terbesar) atau descending -1 (dari yang terbesar ke yang terkecil).

### explain $concat
concat adalah operator dalam operasi agregasi yang digunakan untuk menggabungkan beberapa nilai string menjadi satu nilai string tunggal. dalam kasus ini saya menggabungkan genre lama dengan genre tambahan.

### explain $lookup
lookup adalah salah satu operasi agregasi dalam MongoDB yang digunakan untuk menggabungkan data dari dua koleksi (collections) yang berbeda dalam sebuah database. Ini sangat berguna ketika kita memiliki dua koleksi yang berhubungan dan ingin mengambil data dari kedua koleksi tersebut dalam satu query.
Misalnya, dalam kasus ini saya memiliki koleksi "bookshelves" dan koleksi "book", saya gunakan $lookup untuk menggabungkannya berdasarkan ID buku.

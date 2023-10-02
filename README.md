**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End


### DataLoader explain
DataLoader is a tool used in application development that uses GraphQL to optimize data retrieval from storage such as databases or external APIs. This helps in overcoming the “N+1” problem that often arises in data retrieval when using GraphQL.
The "N+1" problem occurs when you have a GraphQL query that requests a parent data set along with associated child data.

Batching: DataLoader collects similar data requests into a single batch so we can fetch multiple data in one request to the data store.

Caching: DataLoader also provides simple caching, which means if you request the same data more than once in the same request

DataLoader adalah alat yang digunakan dalam pengembangan aplikasi yang menggunakan GraphQL untuk mengoptimalkan pengambilan data dari penyimpanan seperti database atau API eksternal. Hal ini membantu dalam mengatasi masalah “N+1” yang sering muncul dalam pengambilan data saat menggunakan GraphQL.
Masalah "N+1" terjadi ketika Anda memiliki kueri GraphQL yang meminta kumpulan data induk bersama dengan data anak terkait.

Batching: DataLoader mengumpulkan permintaan data serupa ke dalam satu batch sehingga Anda dapat mengambil banyak data dalam satu permintaan ke penyimpanan data.

Caching: DataLoader juga menyediakan caching sederhana, artinya jika Anda meminta data yang sama lebih dari sekali dalam permintaan yang sama.

**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End


### DataLoader explain
DataLoader is a tool used in application development that uses GraphQL to optimize data retrieval from storage such as databases or external APIs. This helps in overcoming the “N+1” problem that often arises in data retrieval when using GraphQL.
The "N+1" problem occurs when you have a GraphQL query that requests a parent data set along with associated child data.

Batching: DataLoader collects similar data requests into a single batch so you can fetch multiple data in one request to the data store.

Caching: DataLoader also provides simple caching, which means if you request the same data more than once in the same request

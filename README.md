**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End

### explain $match
match is one of the operators in an aggregation operation that is used to filter documents to pass only documents that match specified conditions to the next stage of the flow.
For example, in this case I want to search for books in the genre (fantasy), so only books in the fantasy genre will be selected.

### explain $sort
sort is used to sort documents in aggregation results based on one or more specific criteria. Using $sort, we can control the output order of documents obtained through aggregation operations.
we can determine whether we want to sort ascending 1 (from smallest to largest) or descending -1 (from largest to smallest).

### explain $concat
concat is an operator in aggregation operations that is used to combine multiple string values into one single string value. in this case I combined old genres with additional genres.

### explain $lookup
lookup is an aggregation operation in MongoDB which is used to combine data from two different collections in a database. This is very useful when we have two related collections and want to retrieve data from both collections in one query.
For example, in this case I have a collection "bookshelves" and a collection "books", I use $lookup to combine them by book ID.

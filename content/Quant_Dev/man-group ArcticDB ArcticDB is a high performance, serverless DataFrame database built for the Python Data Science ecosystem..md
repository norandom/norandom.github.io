---
title: "man-group/ArcticDB: ArcticDB is a high performance, serverless DataFrame database built for the Python Data Science ecosystem."
source: "https://github.com/man-group/ArcticDB"
author:
  - "[[GitHub]]"
published:
created: 2024-11-13
description: "ArcticDB is a high performance, serverless DataFrame database built for the Python Data Science ecosystem. - man-group/ArcticDB"
tags:
  - "clippings"
---
**ArcticDB** is a high performance, serverless **DataFrame database** built for the Python Data Science ecosystem. Launched in March 2023, it is the successor to [Arctic](https://github.com/man-group/arctic).

ArcticDB offers an intuitive Python-centric API enabling you to read and write Pandas DataFrames to S3 or LMDB utilising a fast C++ data-processing and compression engine.

ArcticDB allows you to:

- **Pandas in, Pandas out**: Read and write Pandas DataFrames, NumPy arrays and native types to S3 and LMDB without leaving Python.
- **Built for time-series data**: Efficiently index and query time-series data across *billions* of rows
- **Time travel**: Travel back in time to see previous versions of your data and create customizable snapshots of the database
- **Schemaless Database**: Append, update and modify data without being constrained by the existing schema
- **Optimised for streaming data**: Built in support for efficient sparse data storage
- **Powerful processing**: Filter, aggregate and create new columns on-the-fly with a Pandas-like syntax
- **C++ efficiency**: Accelerate analytics though concurrency in the C++ data-processing engine

ArcticDB handles data that is big in both row count and column count, so a 20-year history of more than 400,000 unique securities can be stored in a single *symbol*. Each *symbol* is maintained as a separate entity with no shared data which means ArcticDB can scale horizontally across *symbols*, maximising the performance potential of your compute, storage and network.

ArcticDB is designed from the outset to be resilient; there is no single point of failure, and persistent data structures in the storage mean that once a version of a *symbol* has been written, it can never be corrupted by subsequent updates. Pulling compressed data directly from storage to the client means that there is no server to overload, so your data is always available when you need it.
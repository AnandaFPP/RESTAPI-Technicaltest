<br />
<p align="center">
  <h3 align="center">List job</h3>
  <p align="center">
    <a href="https://github.com/AnandaFPP/RESTAPI-Technicaltest"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://restapi-technicaltest.vercel.app/">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)

# About The Project

Membuat api sesuai dengan tugas yang diberikan dengan soal:

1. Login API
    - API harus memvalidasi nama pengguna dan kata sandi
    - Daftar nama pengguna dan kata sandi yang valid harus disimpan di DBMS
    - DBMS apa pun diperbolehkan
    - API harus mengimplementasikan JSON Web Token (JWT)

2. Get job list API
    - API harus diamankan dengan authorization JWT
    - API harus mengembalikan data list pekerjaan sebagai muatan respons dari data yang disimpan di DBMS. Beris id, istilah pekerjaan, lokasi, penuh waktu atau paruh waktu, description pekerjaan.
    - API harus mendukung pagination
    - API harus menyediakan fungsi “pencarian” untuk mencari pekerjaan berdasarkan istilah, lokasi, penuh waktu vs paruh waktu, atau kombinasi ketiganya. Semua parameter adalah opsional.

3. Get job detail API
    - API harus diamankan dengan authorization JWT
    - API harus mengembalikan data detail pekerjaan sebagai respons dari data yang disimpan di DBMS. Berisi id, istilah pekerjaan, lokasi, penuh waktu atau paruh waktu, description pekerjaan.
    - Detail pekerjaan tersebut berdasarkan job id yang dikirim melalui param path

4. Insert dan update job API
    - API harus diamankan dengan authorization JWT
    - API harus menyediakan insert job baru yang berisikan data  id, istilah pekerjaan, lokasi, penuh waktu atau paruh waktu, description pekerjaan
    - API harus menyediakan update job untuk data  istilah pekerjaan, lokasi, penuh waktu atau paruh waktu, description pekerjaan berdasarkan job id.


## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)

# Installation

1. Clone this repository

```sh
git clone https://github.com/AnandaFPP/RESTAPI-Technicaltest
```

2. Change directory to REST-API-Technical-Test

```sh
cd REST-API-Technical-Test
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run start
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)]()
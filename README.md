# Classroom Availability System (CAS)

**Language:** **ID** | [EN](readme_en.md)

Classroom Availability System (CAS) adalah aplikasi web statis untuk menampilkan dan mengelola status ketersediaan ruangan kelas/laboratorium. Halaman publik dapat melihat status ruangan secara read-only, sedangkan admin dapat login dan mengubah status ruangan menjadi `Available` atau `Filled`.

## Live Demo

Aplikasi sudah dapat diakses melalui GitHub Pages:

```text
https://rpzfuu.github.io/Classroom-Availability-System/
```

## Fitur

- Halaman publik status ruangan: `index.html`
- Login admin sederhana dengan `sessionStorage`
- Guard halaman admin agar tidak bisa dibuka tanpa login
- Toggle status 18 ruangan dari panel admin
- Penyimpanan status ruangan menggunakan `localStorage`
- Sinkronisasi otomatis antar-tab browser melalui `storage` event
- Jam realtime format Indonesia/WIB
- Tombol logout admin
- Redirect kompatibilitas untuk nama file lama:
  - `guest.html` ke `index.html`
  - `login.html` ke `admin-login.html`
  - `admin.html` ke `admin-dashboard.html`

## Kredensial Admin

```text
Username: admin
Password: admin
```

## Struktur File

```text
CAS/
|-- index.html                    # Halaman publik / guest
|-- admin-login.html              # Halaman login admin
|-- admin-dashboard.html          # Panel admin
|-- guest.html                    # Redirect ke index.html
|-- login.html                    # Redirect ke admin-login.html
|-- admin.html                    # Redirect ke admin-dashboard.html
|-- css/
|   |-- bootstrap.css
|   `-- styles.css                # CSS kustom CAS
|-- js/
|   |-- bootstrap.js
|   `-- classroom-availability.js # Logika CAS
`-- img/
    |-- building.png
    |-- check.png
    |-- uncheck.png
    |-- login.png
    |-- map.png
    `-- favicon.svg
```

## Cara Menjalankan

### Online

Buka link GitHub Pages berikut:

```text
https://rpzfuu.github.io/Classroom-Availability-System/
```

Untuk masuk sebagai admin dari versi online, klik tombol `Login sebagai admin` atau buka:

```text
https://rpzfuu.github.io/Classroom-Availability-System/admin-login.html
```

### Lokal

Jika ingin menjalankan melalui web server lokal, pastikan folder project berada di direktori web server. Pada konfigurasi lokal sebelumnya:

```text
C:\nginx\html\CAS
```

Jalankan Nginx, lalu buka:

```text
http://localhost/CAS/
```

Untuk masuk sebagai admin:

```text
http://localhost/CAS/admin-login.html
```

## Cara Menggunakan

1. Buka `https://rpzfuu.github.io/Classroom-Availability-System/` untuk melihat status ruangan.
2. Klik `Login sebagai admin`.
3. Masukkan username `admin` dan password `admin`.
4. Klik ikon pada kotak ruangan untuk mengubah status:
   - `Available` berarti ruangan tersedia.
   - `Filled` berarti ruangan terisi.
5. Buka halaman publik di tab lain untuk melihat perubahan status ikut tersinkron.
6. Klik `Logout` untuk keluar dari panel admin.

## Catatan Teknis

CAS saat ini masih berupa aplikasi statis tanpa backend. Status ruangan disimpan di `localStorage`, sehingga data hanya berlaku pada browser dan perangkat yang sama. Jika dibuka dari perangkat lain, status tidak akan ikut tersinkron karena belum ada database/server API.

Login admin juga merupakan validasi sisi browser untuk kebutuhan demo/prototype. Untuk penggunaan produksi, sistem perlu backend, database, autentikasi server-side, dan kontrol akses yang benar.

## Teknologi

- HTML
- CSS
- Bootstrap 5
- JavaScript
- `localStorage`
- `sessionStorage`

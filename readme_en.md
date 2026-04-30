# Classroom Availability System (CAS)

**Language:** [ID](README.md) | **EN**

Classroom Availability System (CAS) is a static web application for displaying and managing classroom/laboratory availability status. Public users can view room status in read-only mode, while admins can log in and update each room status to `Available` or `Filled`.

## Live Demo

The application is available through GitHub Pages:

```text
https://rpzfuu.github.io/Classroom-Availability-System/
```

## Features

- Public room status page: `index.html`
- Simple admin login using `sessionStorage`
- Admin page guard to prevent access without login
- Status toggle for 18 rooms from the admin panel
- Room status storage using `localStorage`
- Automatic synchronization across browser tabs through the `storage` event
- Real-time clock using the Indonesian/WIB format
- Admin logout button
- Compatibility redirects for old file names:
  - `guest.html` to `index.html`
  - `login.html` to `admin-login.html`
  - `admin.html` to `admin-dashboard.html`

## Admin Credentials

```text
Username: admin
Password: admin
```

## File Structure

```text
CAS/
|-- index.html                    # Public / guest page
|-- admin-login.html              # Admin login page
|-- admin-dashboard.html          # Admin panel
|-- guest.html                    # Redirect to index.html
|-- login.html                    # Redirect to admin-login.html
|-- admin.html                    # Redirect to admin-dashboard.html
|-- css/
|   |-- bootstrap.css
|   `-- styles.css                # CAS custom CSS
|-- js/
|   |-- bootstrap.js
|   `-- classroom-availability.js # CAS logic
`-- img/
    |-- building.png
    |-- check.png
    |-- uncheck.png
    |-- login.png
    |-- map.png
    `-- favicon.svg
```

## How to Run

### Online

Open the following GitHub Pages link:

```text
https://rpzfuu.github.io/Classroom-Availability-System/
```

To log in as an admin from the online version, click the `Login sebagai admin` button or open:

```text
https://rpzfuu.github.io/Classroom-Availability-System/admin-login.html
```

### Local

If you want to run the project through a local web server, make sure the project folder is placed inside the web server directory. In the previous local configuration:

```text
C:\nginx\html\CAS
```

Run Nginx, then open:

```text
http://localhost/CAS/
```

To log in as an admin:

```text
http://localhost/CAS/admin-login.html
```

## How to Use

1. Open `https://rpzfuu.github.io/Classroom-Availability-System/` to view room status.
2. Click `Login sebagai admin`.
3. Enter the username `admin` and password `admin`.
4. Click the icon inside a room box to change its status:
   - `Available` means the room is available.
   - `Filled` means the room is occupied.
5. Open the public page in another tab to see the status changes synchronized.
6. Click `Logout` to leave the admin panel.

## Technical Notes

CAS is currently a static application without a backend. Room statuses are stored in `localStorage`, so the data only applies to the same browser and device. If the application is opened from another device, the status will not be synchronized because there is no database/server API yet.

The admin login is also browser-side validation for demo/prototype purposes. For production use, the system needs a backend, database, server-side authentication, and proper access control.

## Technologies

- HTML
- CSS
- Bootstrap 5
- JavaScript
- `localStorage`
- `sessionStorage`

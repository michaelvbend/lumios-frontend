# Lumios

![Lumios logo](./assets/logo-side.png)

<p align="center">
  <img src="./assets/book-scan.gif" alt="Scan book functionality" width="400"/>
</p>

## Overview

This is a **React Native application** that allows users to:

- Scan book ISBN
- Swipe through books.
- View detailed information about books.
- Explore upcoming book-related events.

The app is designed for a smooth and interactive user experience, leveraging modern libraries and tools.

Link to Lumios Backend: [ADD_LINK_TO_THE_BACKEND]

---

## Features

- **Scan Books**: Scan the ISBN book to fetch it from the database.
- **Swipe Books**: Swipe left to dislike or right to like books.
- **Book Details**: View detailed information about each book.
- **Book Events**: Browse a list of upcoming book-related events.
- **API Integration**: Fetches data from a backend API using `Axios`.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/michaelvbend/lumios-frontend.git
   cd your-repo
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   **.env**:

   ```json
   EXPO_PUBLIC_API_URL=http://YOUR_IP:8080/ // BACKEND
   ```

   **.env.test**:

   ```json
   EXPO_PUBLIC_API_URL=http://YOUR_IP:8080/ // WIREMOCK
   ```

4. **Run the application**:

   ```bash
   java -jar ./wiremock/wiremock-standalone-3.5.4.jar --port 9998 --root-dir ./wiremock
   ```

   ```bash
   npm start
   ```

5. **Run the tests**:

   ```bash
   npm test
   ```

## Project status

This project is currently a work in progress. While some features are implemented, there are areas that need further development.

We welcome contributions to help complete the project and improve its functionality!

## Project structure

```bash
/src
 /components    # Reusable components with service
 /screens       # App screens (e.g., SwipeScreen, BookScreen, HomeScreen)
 /types         # Types and models (Book, Event, Navigation, etc.)
 /store         # Store for authentication
 /utils         # Utility functions (Interceptor Axios)
```

## Contributing

1. **Create a new branch**:
   ```bash
   git switch -c feature-branch
   ```
2. **Make your changes and commit them**:

   ```bash
   git commit -m "feat: Add feature XYZ"
   git push
   ```

3. **Open a pull request**

## License

This project is licensed under the MIT License.

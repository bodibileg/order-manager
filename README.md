# Order Manager

This project is a Single Page Application (SPA) for managing orders, developed using React and TypeScript. The application allows users to view, create, update, filter, search, and delete orders. It leverages an external web API for order management and includes testing using Vitest.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
  - [Build](#build)
  - [Deploy](#deploy)

## Features

- View orders in table
- Create new order entities
- Search for orders by ID
- Filter orders by type
- Delete one or multiple orders
- Save new order draft
- Switch theme

## Technologies Used

- React
- TypeScript
- Material UI
- Redux
- React Table
- React Query
- Vitest

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/bodibileg/order-manager.git
   cd order-manager
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Application

1. Create a `.env` file in the root directory and add the following environment variables:

    ```sh
    touch .env
    ```

    ```env
    VITE_BASE_API_URL=https://red-candidate-web.azurewebsites.net/api
    VITE_API_KEY=<api-key>
    ```

2. Start the development server:

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:5173/order-manager/`.

### Running Tests

To run the tests using Vitest, use the following command:

```sh
npm test
```

### Build

To build the project, use the following command:

```sh
npm run build
```

### Deploy

To deploy to `https://bodibileg.github.io/order-manager/`, use the following command:

```sh
npm run deploy
```

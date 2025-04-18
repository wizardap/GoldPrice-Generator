# PNJ Gold Price Generator

This project is a Node.js application that scrapes gold prices from a specified source and sends them to a designated API endpoint. It is designed to run in a Docker container.

## Project Structure

- `src/index.ts`: Entry point of the application. Orchestrates fetching and sending gold prices.
- `src/scraper.ts`: Contains the logic to scrape gold prices from a source.
- `src/api.ts`: Manages the API interaction to send gold prices.
- `src/models/goldPrice.ts`: Defines the structure of gold price data.
- `src/utils/logger.ts`: Provides logging functionality for information and errors.

## Getting Started

### Prerequisites

- Node.js
- Docker

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd PNJGenerator
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To run the application using Docker, build the Docker image and run the container:

1. Build the Docker image:
   ```
   docker build -t pnj-generator .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 pnj-generator
   ```

### Usage

The application will scrape gold prices and send them to the endpoint `http://localhost:8080/add`. Ensure that the server at this endpoint is running and ready to accept POST requests.

### Logging

Logs will be printed to the console. You can modify the logging behavior in `src/utils/logger.ts`.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License

This project is licensed under the MIT License.
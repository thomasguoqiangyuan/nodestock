# Stock Monitoring Application

This is a stock monitoring application built with Electron, which can monitor the prices and fluctuations of selected stocks in real-time.

## Features

- Display the list of selected stocks
- Real-time update of stock prices and fluctuations
- Add, delete, and move selected stocks
- Right-click menu operations (move up, move down, delete)


## Installation

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/thomasguoqiangyuan/nodestock
    cd nodestock
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Running

1. Start the application:

    ```sh
    npm start
    ```

2. The application will start and open a window displaying the stock monitoring interface.

## File Structure

- `index.html`: The main HTML file of the application, defining the structure of the interface.
- `main.js`: The main process file of Electron, responsible for creating the application window.
- `renderer.js`: The renderer process file, containing the main logic and functionality of the application.
- `package.json`: The project configuration file, defining the dependencies and startup scripts.
- `.gitignore`: The Git ignore file, defining the files and directories that do not need to be committed to version control.

## Usage

1. After starting the application, the list of selected stocks will be displayed by default.
2. You can enter the stock code and name in the input box on the left panel, and click the "Add" button to add the stock to the selected stock list.
3. Click on the stock name to view the real-time price and fluctuations of the stock.
4. Right-click on the stock name to choose to move up, move down, or delete the stock.

## Dependencies

- [Electron](https://www.electronjs.org/): Used to build cross-platform desktop applications.
- [Axios](https://axios-http.com/): Used to send HTTP requests to fetch stock data.

## Development

1. Clone the repository and install dependencies:

    ```sh
    git clone https://github.com/thomasguoqiangyuan/nodestock
    cd nodestock
    npm install
    ```

2. Start the application for development:

    ```sh
    npm start
    ```

3. After modifying the code, the application will automatically reload.

## Contribution

We welcome issues and pull requests to improve this project. Please ensure that all tests have been run and the code conforms to the project's coding standards before submitting.

## License

This project is licensed under the MIT License. For details, please refer to the [LICENSE](LICENSE) file.

# 股票监控应用

这是一个使用 Electron 构建的股票监控应用，可以实时监控自选股的价格和涨跌幅。

## 功能

- 显示自选股列表
- 实时更新股票价格和涨跌幅
- 添加、删除和移动自选股
- 右键菜单操作（上移、下移、删除）

## 安装

1. 克隆仓库到本地：

    ```sh
    git clone https://github.com/thomasguoqiangyuan/nodestock
    cd nodestock
    ```

2. 安装依赖：

    ```sh
    npm install
    ```

## 运行

1. 启动应用：

    ```sh
    npm start
    ```

2. 应用将会启动并打开一个窗口，显示股票监控界面。

## 文件结构

- `index.html`：应用的主 HTML 文件，定义了应用的界面结构。
- `main.js`：Electron 主进程文件，负责创建应用窗口。
- `renderer.js`：渲染进程文件，包含了应用的主要逻辑和功能。
- `package.json`：项目配置文件，定义了项目的依赖和启动脚本。
- `.gitignore`：Git 忽略文件，定义了不需要提交到版本控制的文件和目录。

## 使用方法

1. 启动应用后，默认会显示自选股列表。
2. 可以在左侧面板的输入框中输入股票代码和名称，点击“添加”按钮将股票添加到自选股列表中。
3. 点击股票名称可以查看该股票的实时价格和涨跌幅。
4. 右键点击股票名称，可以选择上移、下移或删除该股票。

## 依赖

- [Electron](https://www.electronjs.org/)：用于构建跨平台桌面应用。
- [Axios](https://axios-http.com/)：用于发送 HTTP 请求获取股票数据。

## 开发

1. 克隆仓库并安装依赖：

    ```sh
    git clone https://github.com/thomasguoqiangyuan/nodestock
    cd nodestock
    npm install
    ```

2. 启动应用进行开发：

    ```sh
    npm start
    ```

3. 修改代码后，应用会自动重新加载。

## 贡献

欢迎提交问题和拉取请求来改进这个项目。请确保在提交之前已经运行了所有测试并且代码符合项目的编码规范。

## 许可证

此项目使用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
const axios = require('axios');

let currentStock = null;
let updateInterval = null;
let contextMenuTarget = null;

// 自选股列表数据
let stockList = [
    { code: 'sh000001', name: '上证指数' },
    { code: 'sz002459', name: '晶澳科技' },
    { code: 'sz002681', name: '奋达科技' },
    { code: 'sh603063', name: '禾望电气' }
];

// 初始化函数
function init() {
    renderStockList();
    setupContextMenu();
    // 默认选中第一只股票
    if (stockList.length > 0) {
        selectStock(stockList[0].code);
    }
}

// 设置右键菜单
function setupContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    const stockList = document.getElementById('stockList');

    // 禁用默认右键菜单
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 点击其他地方关闭右键菜单
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // 显示右键菜单
    stockList.addEventListener('contextmenu', (e) => {
        const stockItem = e.target.closest('.stock-item');
        if (stockItem) {
            e.preventDefault();
            contextMenuTarget = stockItem;
            const index = Array.from(stockList.children).indexOf(stockItem);
            
            // 根据位置启用/禁用上下移动选项
            document.getElementById('menuMoveUp').style.display = index > 0 ? 'block' : 'none';
            document.getElementById('menuMoveDown').style.display = 
                index < stockList.children.length - 1 ? 'block' : 'none';

            contextMenu.style.display = 'block';
            contextMenu.style.left = e.pageX + 'px';
            contextMenu.style.top = e.pageY + 'px';
        }
    });

    // 处理菜单项点击
    document.getElementById('menuMoveUp').addEventListener('click', () => {
        const index = getStockIndex(contextMenuTarget);
        if (index > 0) moveStock(index, -1);
        contextMenu.style.display = 'none';
    });

    document.getElementById('menuMoveDown').addEventListener('click', () => {
        const index = getStockIndex(contextMenuTarget);
        if (index < stockList.length - 1) moveStock(index, 1);
        contextMenu.style.display = 'none';
    });

    document.getElementById('menuDelete').addEventListener('click', () => {
        const index = getStockIndex(contextMenuTarget);
        removeStock(index);
        contextMenu.style.display = 'none';
    });
}

function getStockIndex(element) {
    return Array.from(document.getElementById('stockList').children).indexOf(element);
}

// 渲染股票列表
function renderStockList() {
    const stockListElement = document.getElementById('stockList');
    stockListElement.innerHTML = stockList.map((stock) => `
        <div class="stock-item ${currentStock === stock.code ? 'active' : ''}" 
             data-code="${stock.code}" 
             onclick="selectStock('${stock.code}')">
            <span class="stock-item-name">${stock.name}</span>
        </div>
    `).join('');
}

// 添加新股票
function addStock() {
    const codeInput = document.getElementById('stockCode');
    const nameInput = document.getElementById('stockName');
    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    
    if (code && name) {
        stockList.push({ code, name });
        renderStockList();
        codeInput.value = '';
        nameInput.value = '';
    }
}

// 删除股票
function removeStock(index) {
    event.stopPropagation(); // 阻止事件冒泡
    stockList.splice(index, 1);
    renderStockList();
    if (stockList.length > 0) {
        selectStock(stockList[0].code);
    } else {
        document.getElementById('stockInfo').innerHTML = '<h2>请添加股票</h2>';
    }
}

// 移动股票位置
function moveStock(index, direction) {
    event.stopPropagation(); // 阻止事件冒泡
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < stockList.length) {
        const temp = stockList[index];
        stockList[index] = stockList[newIndex];
        stockList[newIndex] = temp;
        renderStockList();
    }
}

// 选择股票
function selectStock(code) {
    currentStock = code;
    renderStockList();
    fetchStockData(code).then(data => {
        updateStockDisplay(data);
        startRealtimeUpdate(code);
    });
}

async function fetchStockData(code) {
    try {
        const response = await axios.get(`http://qt.gtimg.cn/q=${code}`);
        const data = response.data;
        return parseStockData(data);
    } catch (error) {
        console.error('获取股票数据失败:', error);
        return null;
    }
}

function parseStockData(data) {
    const fields = data.split('~');
    return {
        name: fields[1],
        code: fields[2],
        price: parseFloat(fields[3]),
        change: parseFloat(fields[32]),
    };
}

function updateStockDisplay(stockData) {
    const stockInfo = document.getElementById('stockInfo');
    if (!stockData) {
        stockInfo.innerHTML = '<h2>获取数据失败</h2>';
        return;
    }

    const changeClass = stockData.change >= 0 ? 'up' : 'down';
    const changeSymbol = stockData.change >= 0 ? '+' : '';

    stockInfo.innerHTML = `
        <h2>${stockData.name} (${stockData.code})</h2>
        <p>当前价: <span class="${changeClass}">${stockData.price}</span></p>
        <p>涨跌幅: <span class="${changeClass}">${changeSymbol}${stockData.change}%</span></p>
    `;
}

function startRealtimeUpdate(code) {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    
    updateInterval = setInterval(async () => {
        const data = await fetchStockData(code);
        updateStockDisplay(data);
    }, 3000);
}

// 初始化应用
init(); 
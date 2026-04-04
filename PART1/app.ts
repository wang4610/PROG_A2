// 定义商品数据接口（强类型，符合TypeScript要求）
interface Item {
    itemId: string;
    itemName: string;
    category: string;
    quantity: number;
    price: number;
}

// 初始化库存数据
let inventory: Item[] = [
    {
        itemId: "1001",
        itemName: "Laptop",
        category: "Electronics",
        quantity: 15,
        price: 1200.00
    }
];

// ==================== 工具方法 ====================
// 显示提示消息
function showMessage(msg: string, isError: boolean = false): void {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = msg;
    msgDiv.style.color = isError ? "red" : "green";
    msgDiv.style.margin = "8px 0";
    document.querySelector(".form-container")?.after(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
}

// ==================== 初始化方法（用老师要求的select.add()） ====================
// 初始化分类下拉框（严格使用select.add()方法，符合W3Schools资源要求）
function initCategorySelect(): void {
    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;
    const categories = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];
    
    // 清空默认选项
    categorySelect.innerHTML = "";
    
    // 用select.add()添加选项，严格符合老师给的资源要求
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.add(option);
    });
}

// ==================== 表格渲染方法（用老师要求的insertRow()） ====================
// 渲染库存表格（严格使用insertRow()方法，符合W3Schools资源要求）
function renderTable(items: Item[] = inventory): void {
    const tableBody = document.querySelector("#inventoryTable tbody") as HTMLTableSectionElement;
    // 清空现有行（保留表头）
    tableBody.innerHTML = "";

    items.forEach(item => {
        // 用insertRow()创建新行，严格符合老师给的资源要求
        const row = tableBody.insertRow();

        // 用insertCell()创建单元格
        row.insertCell(0).textContent = item.itemId;
        row.insertCell(1).textContent = item.itemName;
        row.insertCell(2).textContent = item.category;
        row.insertCell(3).textContent = item.quantity.toString();
        row.insertCell(4).textContent = `$${item.price.toFixed(2)}`;

        // 操作列：删除按钮
        const actionCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteItem(item.itemId);
        actionCell.appendChild(deleteBtn);
    });
}

// ==================== 核心业务方法 ====================
// 添加商品
function addItem(): void {
    // 获取表单输入
    const itemId = (document.getElementById("itemId") as HTMLInputElement).value.trim();
    const itemName = (document.getElementById("itemName") as HTMLInputElement).value.trim();
    const category = (document.getElementById("categorySelect") as HTMLSelectElement).value;
    const quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);

    // 输入验证
    if (!itemId || !itemName) {
        showMessage("Please fill in Item ID and Item Name", true);
        return;
    }
    if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
        showMessage("Quantity and Price must be non-negative numbers", true);
        return;
    }
    if (inventory.some(i => i.itemId === itemId)) {
        showMessage("Item ID already exists", true);
        return;
    }

    // 创建新商品并添加到库存
    const newItem: Item = {
        itemId,
        itemName,
        category,
        quantity,
        price
    };
    inventory.push(newItem);

    // 重新渲染表格、清空表单
    renderTable();
    clearForm();
    showMessage(`Item ${itemName} added successfully`);
}

// 清空表单
function clearForm(): void {
    const form = document.querySelector(".form-container") as HTMLFormElement;
    form.reset();
}

// 删除商品
function deleteItem(itemId: string): void {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const itemName = inventory.find(i => i.itemId === itemId)?.itemName;
    inventory = inventory.filter(i => i.itemId !== itemId);
    renderTable();
    showMessage(`Item ${itemName} deleted successfully`);
}

// 搜索商品
function searchItems(): void {
    const searchTerm = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
    const filteredItems = inventory.filter(i => 
        i.itemName.toLowerCase().includes(searchTerm) || 
        i.itemId.includes(searchTerm) ||
        i.category.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredItems);
}

// 显示全部商品
function showAllItems(): void {
    (document.getElementById("searchInput") as HTMLInputElement).value = "";
    renderTable();
}

// ==================== 页面初始化 ====================
window.onload = () => {
    initCategorySelect();
    renderTable();
};

// 暴露全局方法给HTML调用（必须写，否则按钮点击无效）
window.addItem = addItem;
window.searchItems = searchItems;
window.showAllItems = showAllItems;
window.deleteItem = deleteItem;
"use strict";
// 初始化库存数据
let inventory = [
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
function showMessage(msg, isError = false) {
    var _a;
    const msgDiv = document.createElement("div");
    msgDiv.textContent = msg;
    msgDiv.style.color = isError ? "red" : "green";
    msgDiv.style.margin = "8px 0";
    (_a = document.querySelector(".form-container")) === null || _a === void 0 ? void 0 : _a.after(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
}
// ==================== 初始化方法（用老师要求的select.add()） ====================
// 初始化分类下拉框（严格使用select.add()方法，符合W3Schools资源要求）
function initCategorySelect() {
    const categorySelect = document.getElementById("categorySelect");
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
function renderTable(items = inventory) {
    const tableBody = document.querySelector("#inventoryTable tbody");
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
function addItem() {
    // 获取表单输入
    const itemId = document.getElementById("itemId").value.trim();
    const itemName = document.getElementById("itemName").value.trim();
    const category = document.getElementById("categorySelect").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
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
    const newItem = {
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
function clearForm() {
    const form = document.querySelector(".form-container");
    form.reset();
}
// 删除商品
function deleteItem(itemId) {
    var _a;
    if (!confirm("Are you sure you want to delete this item?"))
        return;
    const itemName = (_a = inventory.find(i => i.itemId === itemId)) === null || _a === void 0 ? void 0 : _a.itemName;
    inventory = inventory.filter(i => i.itemId !== itemId);
    renderTable();
    showMessage(`Item ${itemName} deleted successfully`);
}
// 搜索商品
function searchItems() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredItems = inventory.filter(i => i.itemName.toLowerCase().includes(searchTerm) ||
        i.itemId.includes(searchTerm) ||
        i.category.toLowerCase().includes(searchTerm));
    renderTable(filteredItems);
}
// 显示全部商品
function showAllItems() {
    document.getElementById("searchInput").value = "";
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

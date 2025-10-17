//package com.shopcafe.backend.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import java.time.LocalDate;
//import java.util.List;
//
//@Document(collection = "orders")
//public class Order {
//    @Id
//    private String id;
//
//    private String tableId;
//    private String userId;
//    private List<OrderItem> items;
//    private String status; // ĐANG PHỤC VỤ / ĐÃ THANH TOÁN
//    private double totalPrice;
//    private LocalDate businessDate = LocalDate.now();
//    private String createdAt;
//
//    // --- Getters & Setters ---
//    public String getId() { return id; }
//    public void setId(String id) { this.id = id; }
//
//    public String getTableId() { return tableId; }
//    public void setTableId(String tableId) { this.tableId = tableId; }
//
//    public String getUserId() { return userId; }
//    public void setUserId(String userId) { this.userId = userId; }
//
//    public List<OrderItem> getItems() { return items; }
//    public void setItems(List<OrderItem> items) { this.items = items; }
//
//    public String getStatus() { return status; }
//    public void setStatus(String status) { this.status = status; }
//
//    public double getTotalPrice() { return totalPrice; }
//    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
//
//    public LocalDate getBusinessDate() { return businessDate; }
//    public void setBusinessDate(LocalDate businessDate) { this.businessDate = businessDate; }
//
//    public String getCreatedAt() { return createdAt; }
//    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
//}
package com.shopcafe.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    private String tableId;     // vẫn giữ để tương thích
    private String tableName;   // ✅ thêm để hiển thị tên bàn
    private String userId;
    private List<OrderItem> items;
    private String status; // ĐANG PHỤC VỤ / ĐÃ THANH TOÁN
    private double totalPrice;
    private LocalDate businessDate = LocalDate.now();
    private String createdAt;

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTableId() { return tableId; }
    public void setTableId(String tableId) { this.tableId = tableId; }

    public String getTableName() { return tableName; }   // ✅
    public void setTableName(String tableName) { this.tableName = tableName; }   // ✅

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDate getBusinessDate() { return businessDate; }
    public void setBusinessDate(LocalDate businessDate) { this.businessDate = businessDate; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}

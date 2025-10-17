package com.shopcafe.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tables")
public class CafeTable {
    @Id
    private String id;

    private String name;      // tên bàn
    private String status;    // trạng thái: "Trống", "Đang dùng", "Đã đặt"
    private int capacity;     // số chỗ ngồi

    public CafeTable() {}

    public CafeTable(String id, String name, String status, int capacity) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.capacity = capacity;
    }

    // ✅ Getter & Setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}

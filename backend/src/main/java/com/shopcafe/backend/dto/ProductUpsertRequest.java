package com.shopcafe.backend.dto;

import lombok.Data;

@Data
public class ProductUpsertRequest {
    private String name;
    private double price;
    private String category;
    private String image;
    private Boolean active;   // ✅ thêm field active (dùng Boolean để null-safe)
}

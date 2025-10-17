package com.shopcafe.backend.dto;

import lombok.Data;
import java.util.List;
import com.shopcafe.backend.model.OrderItem;

@Data
public class CreateOrderRequest {
    private String tableId;
    private List<OrderItem> items;
}

//package com.shopcafe.backend.controller;
//
//import com.shopcafe.backend.model.Order;
//import com.shopcafe.backend.repo.OrderRepository;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/report")
//public class ReportController {
//
//    private final OrderRepository orderRepo;
//
//    public ReportController(OrderRepository orderRepo) { this.orderRepo = orderRepo; }
//
//    @GetMapping("/daily")
//    public ResponseEntity<List<Order>> daily(
//            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
//    ) {
//        return ResponseEntity.ok(orderRepo.findByBusinessDate(date));
//    }
//}
package com.shopcafe.backend.controller;

import com.shopcafe.backend.model.Order;
import com.shopcafe.backend.model.OrderItem;
import com.shopcafe.backend.repo.OrderRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final OrderRepository orderRepo;

    public ReportController(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @GetMapping("/daily")
    public ResponseEntity<List<Map<String, Object>>> daily(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        // 🔹 Lấy toàn bộ order theo ngày
        List<Order> orders = orderRepo.findByBusinessDate(date);

        // 🔹 Tạo danh sách JSON trả về có trường total
        List<Map<String, Object>> result = orders.stream().map(order -> {
            double total = 0.0;
            if (order.getItems() != null) {
                total = order.getItems().stream()
                        .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                        .sum();
            }

            Map<String, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("tableId", order.getTableId());
            map.put("businessDate", order.getBusinessDate());
            map.put("items", order.getItems());
            map.put("status", order.getStatus());
            map.put("total", total);
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
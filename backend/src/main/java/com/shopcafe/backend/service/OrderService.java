//package com.shopcafe.backend.service;
//
//import com.shopcafe.backend.model.Order;
//import com.shopcafe.backend.model.OrderItem;
//import com.shopcafe.backend.model.Table;
//import com.shopcafe.backend.repo.OrderRepository;
//import com.shopcafe.backend.repo.TableRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class OrderService {
//
//    private final OrderRepository orderRepo;
//    private final TableRepository tableRepo;
//
//    public OrderService(OrderRepository orderRepo, TableRepository tableRepo) {
//        this.orderRepo = orderRepo;
//        this.tableRepo = tableRepo;
//    }
//
//    public List<Order> all() {
//        return orderRepo.findAll();
//    }
//
//    public Optional<Order> findById(String id) {
//        return orderRepo.findById(id);
//    }
//
//    public List<Order> findByUser(String userId) {
//        return orderRepo.findByUserId(userId);
//    }
//
//    // ✅ Tạo đơn hàng mới (khi user đặt)
//    public Order create(Order o) {
//        if (o.getTableId() == null) throw new RuntimeException("Thiếu thông tin bàn!");
//        if (o.getItems() == null || o.getItems().isEmpty()) throw new RuntimeException("Chưa chọn món!");
//
//        o.setStatus("Đang phục vụ");
//
//        double total = 0.0;
//        for (OrderItem it : o.getItems()) {
//            total += it.getUnitPrice() * it.getQuantity();
//        }
//        o.setTotalPrice(total);
//
//        // ✅ Cập nhật bàn sang "CÓ KHÁCH"
//        Table table = tableRepo.findById(o.getTableId())
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn!"));
//        table.setStatus("CÓ KHÁCH");
//        tableRepo.save(table);
//
//        return orderRepo.save(o);
//    }
//
//    // ✅ Cập nhật trạng thái đơn (Admin)
//    public Optional<Order> updateStatus(String id, String status) {
//        return orderRepo.findById(id).map(order -> {
//            order.setStatus(status);
//            orderRepo.save(order);
//
//            // ✅ Nếu thanh toán xong → bàn trở lại "TRỐNG"
//            if ("Đã thanh toán".equalsIgnoreCase(status)) {
//                Table table = tableRepo.findById(order.getTableId())
//                        .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn!"));
//                table.setStatus("TRỐNG");
//                tableRepo.save(table);
//            }
//
//            return order;
//        });
//    }
//
//    public boolean delete(String id) {
//        if (orderRepo.existsById(id)) {
//            orderRepo.deleteById(id);
//            return true;
//        }
//        return false;
//    }
//}
package com.shopcafe.backend.service;

import com.shopcafe.backend.model.Order;
import com.shopcafe.backend.model.OrderItem;
import com.shopcafe.backend.model.Table;
import com.shopcafe.backend.repo.OrderRepository;
import com.shopcafe.backend.repo.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final TableRepository tableRepo;

    public OrderService(OrderRepository orderRepo, TableRepository tableRepo) {
        this.orderRepo = orderRepo;
        this.tableRepo = tableRepo;
    }

    public List<Order> all() {
        return orderRepo.findAll();
    }

    public Optional<Order> findById(String id) {
        return orderRepo.findById(id);
    }

    public List<Order> findByUser(String userId) {
        return orderRepo.findByUserId(userId);
    }

    public Order save(Order o) {
        return orderRepo.save(o);
    }

    // ✅ Tạo đơn hàng mới (khi user đặt)
    public Order create(Order o) {
        if (o.getTableId() == null) throw new RuntimeException("Thiếu thông tin bàn!");
        if (o.getItems() == null || o.getItems().isEmpty())
            throw new RuntimeException("Chưa chọn món!");

        // 🟤 Lấy thông tin bàn
        Table table = tableRepo.findById(o.getTableId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn!"));

        // ✅ Nếu frontend gửi tableName rỗng thì tự lấy từ table
        if (o.getTableName() == null || o.getTableName().isBlank()) {
            o.setTableName(table.getName());
        }

        // ✅ Cập nhật trạng thái bàn
        table.setStatus("CÓ KHÁCH");
        tableRepo.save(table);

        // ✅ Tính tổng tiền từ danh sách món
        double total = 0.0;
        for (OrderItem it : o.getItems()) {
            total += it.getUnitPrice() * it.getQuantity();
        }
        o.setTotalPrice(total);

        // ✅ Gán trạng thái và ngày giờ
        o.setStatus("Đang phục vụ");
        o.setBusinessDate(LocalDate.now());
        o.setCreatedAt(LocalDateTime.now().toString());

        return orderRepo.save(o);
    }

    // ✅ Cập nhật trạng thái đơn (Admin)
    public Optional<Order> updateStatus(String id, String status) {
        return orderRepo.findById(id).map(order -> {
            order.setStatus(status);
            orderRepo.save(order);

            // ✅ Nếu thanh toán xong → bàn trở lại "TRỐNG"
            if (status != null && status.toLowerCase().contains("đã thanh toán")) {

                Table table = tableRepo.findById(order.getTableId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn!"));
                table.setStatus("TRỐNG");
                tableRepo.save(table);
            }

            return order;
        });
    }

    public boolean delete(String id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
            return true;
        }
        return false;
    }
}

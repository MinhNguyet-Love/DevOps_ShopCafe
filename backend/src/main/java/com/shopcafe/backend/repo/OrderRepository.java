package com.shopcafe.backend.repo;

import com.shopcafe.backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    // ✅ Tìm đơn theo ngày kinh doanh
    List<Order> findByBusinessDate(LocalDate businessDate);

    // ✅ Tìm đơn theo người dùng
    List<Order> findByUserId(String userId);
}

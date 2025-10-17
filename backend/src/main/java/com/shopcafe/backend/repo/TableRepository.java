package com.shopcafe.backend.repo;

import com.shopcafe.backend.model.Table;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TableRepository extends MongoRepository<Table, String> {
    // ✅ Lọc bàn theo trạng thái
    List<Table> findByStatus(String status);
}

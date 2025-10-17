package com.shopcafe.backend.controller;

import com.shopcafe.backend.model.Table;
import com.shopcafe.backend.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:5176")
public class TableController {

    private final TableService service;

    public TableController(TableService service) {
        this.service = service;
    }

    // ✅ Lấy danh sách bàn
    // Nếu user truyền ?status=TRỐNG thì chỉ lấy bàn trống
    // Nếu không truyền thì trả về TẤT CẢ bàn (cho admin)
    @GetMapping
    public ResponseEntity<List<Table>> getAll(@RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(service.findByStatus(status));
        }
        return ResponseEntity.ok(service.all()); // ✅ Sửa chỗ này
    }

    // ✅ Lấy bàn theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Table> getById(@PathVariable String id) {
        Optional<Table> table = service.findById(id);
        return table.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Thêm bàn mới (chỉ admin)
    @PostMapping
    public ResponseEntity<Table> create(@RequestBody Table t) {
        return ResponseEntity.ok(service.create(t));
    }

    // ✅ Cập nhật bàn
    @PutMapping("/{id}")
    public ResponseEntity<Table> update(@PathVariable String id, @RequestBody Table updated) {
        Optional<Table> table = service.update(id, updated);
        return table.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Xóa bàn
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (service.delete(id)) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }
}

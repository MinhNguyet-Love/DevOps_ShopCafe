package com.shopcafe.backend.service;

import com.shopcafe.backend.model.Table;
import com.shopcafe.backend.repo.TableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    private final TableRepository repo;

    public TableService(TableRepository repo) {
        this.repo = repo;
    }

    // ✅ Lấy tất cả bàn
    public List<Table> all() {
        return repo.findAll();
    }

    // ✅ Lấy bàn theo trạng thái (VD: TRỐNG, CÓ KHÁCH, ĐÃ THANH TOÁN)
    public List<Table> findByStatus(String status) {
        return repo.findByStatus(status);
    }

    public Optional<Table> findById(String id) {
        return repo.findById(id);
    }

    // ✅ Tạo bàn mới (mặc định TRỐNG)
    public Table create(Table t) {
        if (t.getStatus() == null || t.getStatus().isBlank()) {
            t.setStatus("TRỐNG");
        }
        return repo.save(t);
    }

    // ✅ Cập nhật thông tin bàn
    public Optional<Table> update(String id, Table updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setStatus(updated.getStatus());
            existing.setCapacity(updated.getCapacity());
            return repo.save(existing);
        });
    }

    // ✅ Xóa bàn
    public boolean delete(String id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    // ✅ Cập nhật trạng thái bàn nhanh (dùng trong service khác)
    public void updateStatus(String id, String status) {
        repo.findById(id).ifPresent(table -> {
            table.setStatus(status);
            repo.save(table);
        });
    }
}

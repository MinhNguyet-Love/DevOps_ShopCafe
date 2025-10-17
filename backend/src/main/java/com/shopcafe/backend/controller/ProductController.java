////package com.shopcafe.backend.controller;
////
////import com.shopcafe.backend.model.Product;
////import com.shopcafe.backend.repo.ProductRepository;
////import org.springframework.http.MediaType;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////import org.springframework.web.multipart.MultipartFile;
////
////import java.io.File;
////import java.io.IOException;
////import java.util.List;
////import java.util.Optional;
////import java.util.UUID;
////
////@RestController
////@RequestMapping("/api/products")
////public class ProductController {
////
////    private final ProductRepository repo;
////
////    public ProductController(ProductRepository repo) {
////        this.repo = repo;
////    }
////
////    // ✅ Lấy tất cả sản phẩm
////    @GetMapping
////    public List<Product> all() {
////        return repo.findAll();
////    }
////
////    // ✅ Lấy sản phẩm theo ID
////    @GetMapping("/{id}")
////    public ResponseEntity<Product> get(@PathVariable String id) {
////        return repo.findById(id)
////                .map(ResponseEntity::ok)
////                .orElse(ResponseEntity.notFound().build());
////    }
////
////    // ✅ Thêm sản phẩm (cho phép có hoặc không ảnh)
////    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////    public ResponseEntity<Product> create(
////            @RequestPart("product") Product product,
////            @RequestPart(value = "image", required = false) MultipartFile image
////    ) throws IOException {
////
////        if (image != null && !image.isEmpty()) {
////            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
////            String uploadDir = "uploads/";
////            File dir = new File(uploadDir);
////            if (!dir.exists()) dir.mkdirs();
////
////            image.transferTo(new File(uploadDir + fileName));
////            product.setImageUrl("/uploads/" + fileName);
////        } else {
////            product.setImageUrl("/uploads/default_food.jpg");
////        }
////
////        Product saved = repo.save(product);
////        return ResponseEntity.ok(saved);
////    }
////
////    // ✅ Cập nhật sản phẩm
////    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////    public ResponseEntity<Product> update(
////            @PathVariable String id,
////            @RequestPart("product") Product updated,
////            @RequestPart(value = "image", required = false) MultipartFile image
////    ) throws IOException {
////
////        Optional<Product> existingOpt = repo.findById(id);
////        if (existingOpt.isEmpty()) return ResponseEntity.notFound().build();
////
////        Product existing = existingOpt.get();
////        existing.setName(updated.getName());
////        existing.setPrice(updated.getPrice());
////        existing.setCategory(updated.getCategory());
////        existing.setDescription(updated.getDescription());
////
////        if (image != null && !image.isEmpty()) {
////            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
////            String uploadDir = "uploads/";
////            File dir = new File(uploadDir);
////            if (!dir.exists()) dir.mkdirs();
////
////            image.transferTo(new File(uploadDir + fileName));
////            existing.setImageUrl("/uploads/" + fileName);
////        }
////
////        Product saved = repo.save(existing);
////        return ResponseEntity.ok(saved);
////    }
////
////    // ✅ Xóa sản phẩm
////    @DeleteMapping("/{id}")
////    public ResponseEntity<Void> delete(@PathVariable String id) {
////        if (repo.existsById(id)) {
////            repo.deleteById(id);
////            return ResponseEntity.noContent().build();
////        }
////        return ResponseEntity.notFound().build();
////    }
////}
//package com.shopcafe.backend.controller;
//
//import com.shopcafe.backend.model.Product;
//import com.shopcafe.backend.repo.ProductRepository;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/products")
//public class ProductController {
//
//    private final ProductRepository repo;
//
//    public ProductController(ProductRepository repo) {
//        this.repo = repo;
//    }
//
//    @GetMapping
//    public List<Product> all() {
//        return repo.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Product> get(@PathVariable String id) {
//        return repo.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // ✅ Thêm sản phẩm (có hoặc không ảnh)
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Product> create(
//            @RequestPart("product") Product product,
//            @RequestPart(value = "image", required = false) MultipartFile image
//    ) throws IOException {
//
//        // ✅ Đảm bảo thư mục uploads tồn tại
//        String uploadDir = "backend/uploads";
//        Path uploadPath = Paths.get(uploadDir);
//        if (!Files.exists(uploadPath)) {
//            Files.createDirectories(uploadPath);
//        }
//
//        if (image != null && !image.isEmpty()) {
//            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
//            Path filePath = uploadPath.resolve(fileName);
//            Files.copy(image.getInputStream(), filePath);
//            product.setImageUrl("/uploads/" + fileName);
//        } else {
//            product.setImageUrl("/uploads/default_food.jpg");
//        }
//
//        return ResponseEntity.ok(repo.save(product));
//    }
//
//    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Product> update(
//            @PathVariable String id,
//            @RequestPart("product") Product updated,
//            @RequestPart(value = "image", required = false) MultipartFile image
//    ) throws IOException {
//
//        Optional<Product> opt = repo.findById(id);
//        if (opt.isEmpty()) return ResponseEntity.notFound().build();
//
//        Product existing = opt.get();
//        existing.setName(updated.getName());
//        existing.setPrice(updated.getPrice());
//        existing.setCategory(updated.getCategory());
//        existing.setDescription(updated.getDescription());
//
//        String uploadDir = "backend/uploads";
//        Path uploadPath = Paths.get(uploadDir);
//        if (!Files.exists(uploadPath)) {
//            Files.createDirectories(uploadPath);
//        }
//
//        if (image != null && !image.isEmpty()) {
//            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
//            Path filePath = uploadPath.resolve(fileName);
//            Files.copy(image.getInputStream(), filePath);
//            existing.setImageUrl("/uploads/" + fileName);
//        }
//
//        return ResponseEntity.ok(repo.save(existing));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> delete(@PathVariable String id) {
//        if (repo.existsById(id)) {
//            repo.deleteById(id);
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
//}
package com.shopcafe.backend.controller;

import com.shopcafe.backend.model.Product;
import com.shopcafe.backend.repo.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {


    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    // ✅ Lấy tất cả sản phẩm
    @GetMapping
    public List<Product> all() {
        return repo.findAll();
    }

    // ✅ Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable String id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Thêm sản phẩm (chỉ cần link ảnh, hoặc không có cũng được)
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        if (product.getImageUrl() == null || product.getImageUrl().isBlank()) {
            product.setImageUrl("https://via.placeholder.com/150"); // ảnh mặc định
        }
        return ResponseEntity.ok(repo.save(product));
    }

    // ✅ Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable String id, @RequestBody Product updated) {
        Optional<Product> opt = repo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Product existing = opt.get();
        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setCategory(updated.getCategory());
        existing.setDescription(updated.getDescription());

        if (updated.getImageUrl() != null && !updated.getImageUrl().isBlank()) {
            existing.setImageUrl(updated.getImageUrl());
        }

        return ResponseEntity.ok(repo.save(existing));
    }

    // ✅ Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

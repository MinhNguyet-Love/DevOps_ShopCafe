//package com.shopcafe.backend.service;
//
//import com.shopcafe.backend.dto.AuthResponse;
//import com.shopcafe.backend.dto.LoginRequest;
//import com.shopcafe.backend.dto.RegisterRequest;
//import com.shopcafe.backend.model.User;
//import com.shopcafe.backend.repo.UserRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class UserService {
//
//    private final UserRepository repo;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//
//    public UserService(UserRepository repo, PasswordEncoder passwordEncoder, JwtService jwtService) {
//        this.repo = repo;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtService = jwtService;
//    }
//
//    // ✅ Đăng ký
//    public AuthResponse register(RegisterRequest req) {
//        if (repo.findByEmail(req.getEmail()).isPresent()) {
//            throw new RuntimeException("Email đã tồn tại!");
//        }
//
//        User u = new User();
//        u.setUsername(req.getUsername());
//        u.setEmail(req.getEmail());
//        u.setPassword(passwordEncoder.encode(req.getPassword()));
//        u.setRole("USER");
//
//        repo.save(u);
//
//        String token = jwtService.generateToken(u.getEmail(), u.getRole());
//        return new AuthResponse(token, u.getRole());
//    }
//
//    // ✅ Đăng nhập
//    public AuthResponse login(LoginRequest req) {
//        User u = repo.findByEmail(req.getEmail())
//                .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));
//
//        if (!passwordEncoder.matches(req.getPassword(), u.getPassword())) {
//            throw new RuntimeException("Sai mật khẩu!");
//        }
//
//        String token = jwtService.generateToken(u.getEmail(), u.getRole());
//        return new AuthResponse(token, u.getRole());
//    }
//
//    // ✅ Lấy danh sách tất cả user
//    public List<User> getAll() {
//        return repo.findAll();
//    }
//
//    // ✅ Tìm user theo ID
//    public Optional<User> findById(String id) {
//        return repo.findById(id);
//    }
//}
package com.shopcafe.backend.service;

import com.shopcafe.backend.dto.AuthResponse;
import com.shopcafe.backend.dto.LoginRequest;
import com.shopcafe.backend.dto.RegisterRequest;
import com.shopcafe.backend.model.User;
import com.shopcafe.backend.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // 🟢 Đăng ký
    public AuthResponse register(RegisterRequest req) {
        if (repo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại!");
        }

        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setRole("USER");

        repo.save(u);

        String token = jwtService.generateToken(u.getEmail(), u.getRole());
        // ✅ Trả về token + username + role
        return new AuthResponse(token, u.getUsername(), u.getRole());
    }

    // 🟢 Đăng nhập
    public AuthResponse login(LoginRequest req) {
        User u = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));

        if (!passwordEncoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Sai mật khẩu!");
        }

        String token = jwtService.generateToken(u.getEmail(), u.getRole());
        // ✅ Trả về token + username + role
        return new AuthResponse(token, u.getUsername(), u.getRole());
    }

    // 🟢 Lấy danh sách tất cả user
    public List<User> getAll() {
        return repo.findAll();
    }

    // 🟢 Tìm user theo ID
    public Optional<User> findById(String id) {
        return repo.findById(id);
    }
}

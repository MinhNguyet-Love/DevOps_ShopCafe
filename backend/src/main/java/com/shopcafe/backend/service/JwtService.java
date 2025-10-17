package com.shopcafe.backend.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

/**
 * ✅ Dịch vụ tạo và xác thực JWT (JSON Web Token)
 * - Thêm quyền (role) vào token
 * - Token có thời hạn 24h
 */
@Service
public class JwtService {

    // 🔑 Khoá bí mật (phải dài tối thiểu 32 ký tự)
    private static final String SECRET_KEY = "supersecretkey123456789supersecretkey123456789";

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /**
     * ✅ Sinh token chứa email và quyền (role)
     * @param email email của user
     * @param role quyền (ADMIN / USER)
     * @return JWT token
     */
    public String generateToken(String email, String role) {
        // 🟢 Thêm tiền tố ROLE_ nếu chưa có (để đồng bộ với Spring Security)
        String fixedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;

        return Jwts.builder()
                .setSubject(email)
                .addClaims(Map.of("role", fixedRole))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * ✅ Trích xuất email (subject) từ token
     */
    public String extractEmail(String token) {
        try {
            return extractAllClaims(token).getSubject();
        } catch (JwtException e) {
            return null;
        }
    }

    /**
     * ✅ Kiểm tra token hợp lệ (đúng email và chưa hết hạn)
     */
    public boolean isValid(String token, String email) {
        String extractedEmail = extractEmail(token);
        return extractedEmail != null && extractedEmail.equals(email) && !isExpired(token);
    }

    /**
     * ✅ Kiểm tra token hết hạn chưa
     */
    private boolean isExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    /**
     * ✅ Giải mã toàn bộ claims từ token
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

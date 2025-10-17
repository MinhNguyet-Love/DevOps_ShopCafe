//package com.shopcafe.backend.dto;
//
//public class AuthResponse {
//    private String token;
//    private String role;
//
//    public AuthResponse() {}
//
//    public AuthResponse(String token, String role) {
//        this.token = token;
//        this.role = role;
//    }
//
//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//}
package com.shopcafe.backend.dto;

public class AuthResponse {
    private String token;
    private String username; // ✅ thêm tên người dùng
    private String role;

    public AuthResponse() {}

    public AuthResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    // --- Getter & Setter ---
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

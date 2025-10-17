package com.shopcafe.backend;

import com.shopcafe.backend.model.User;
import com.shopcafe.backend.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopcafeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopcafeApplication.class, args);
	}

	// ✅ Mỗi lần chạy lại: XÓA tất cả user và tạo sẵn 2 tài khoản (admin + user)
	@Bean
	CommandLineRunner initAccounts(UserRepository userRepo, PasswordEncoder encoder) {
		return args -> {
			System.out.println("🧹 Đang reset collection 'users'...");

			// 🔥 Xóa toàn bộ user cũ
			userRepo.deleteAll();

			// ✅ Tạo admin mặc định
			User admin = new User();
			admin.setUsername("Admin");
			admin.setEmail("admin@gmail.com");
			admin.setPassword(encoder.encode("123456"));
			admin.setRole("ROLE_ADMIN");
			userRepo.save(admin);

			// ✅ Tạo user mặc định
			User user = new User();
			user.setUsername("User");
			user.setEmail("user@gmail.com");
			user.setPassword(encoder.encode("123456"));
			user.setRole("ROLE_USER");
			userRepo.save(user);

			System.out.println("✅ Admin mặc định: admin@gmail.com / 123456");
			System.out.println("✅ User mặc định: user@gmail.com / 123456");
		};
	}
}

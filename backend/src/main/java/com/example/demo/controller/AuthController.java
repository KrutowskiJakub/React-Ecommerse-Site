package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, String> body) {
        String mail = body.get("mail");
        String password = body.get("password");
        Optional<User> user = userService.loginUser(mail, password);
        if (user.isPresent()) {
            // If login is successful, generate JWT token
            return jwtService.generateToken(mail);
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    @GetMapping("/isLoggedIn")
    public boolean isLoggedIn(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Remove "Bearer "
            return jwtService.validateToken(token);
        }
        return false; // If no token or invalid token
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> getAuthStatus(@RequestHeader("Authorization") String authHeader) {
        boolean isAuthenticated = isLoggedIn(authHeader);
        return ResponseEntity.ok(isAuthenticated);
    }
}
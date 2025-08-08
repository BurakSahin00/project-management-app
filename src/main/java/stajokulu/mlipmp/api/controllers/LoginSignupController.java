package stajokulu.mlipmp.api.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import stajokulu.mlipmp.entities.dto.user.LoginDto;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stajokulu.mlipmp.business.abstracts.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class LoginSignupController {

    // Burak (Değişiklik)
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginDto loginDto) {
    Map<String, Object> response = new HashMap<>();
    try {
        var user = userService.getUserByEmail(loginDto);
        response.put("message", "Login Successful");
        response.put("id", user.getId()); // userId'yi ekleyin
        return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        response.put("message", "Login Failed");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}

}

package com.skillswap.controller;

import com.skillswap.model.User;
import com.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Test API
    @GetMapping("/test")
    public String test() {
        return "Welcome to SkillSwap!";
    }
    @PostMapping("/login")
public User login(@RequestBody User loginUser) {

    User user = userRepository.findAll()
            .stream()
            .filter(u -> u.getEmail().equals(loginUser.getEmail())
                    && u.getPassword().equals(loginUser.getPassword()))
            .findFirst()
            .orElse(null);

    return user;
}

    // Create User
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Update User
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setSkillsOffered(updatedUser.getSkillsOffered());
            user.setSkillsWanted(updatedUser.getSkillsWanted());

            return userRepository.save(user);
        }

        return null;
    }
}
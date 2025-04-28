package com.stockit.app.User;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

    @Service
    @RequiredArgsConstructor
    public class UserService {
        private final UserRepository userRepository; 

        @Transactional
        public UserResponse updateUser(UserRequest userRequest) {
        
            User user = User.builder()
            .id(userRequest.id)
            .username(userRequest.username)
            .email(userRequest.email)
            .firstName(userRequest.firstName)
            .lastname(userRequest.lastname)
            .contact(userRequest.contact)
            .address(userRequest.address)
            .role(Role.USER)
            .build();
            
            userRepository.updateUser(user.id, user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastname(), user.getContact(), user.getAddress());


            return new UserResponse("El usuario se registró satisfactoriamente");
        }

        public UserDTO getUser(Integer id) {
            User user= userRepository.findById(id).orElse(null);
        
            if (user!=null)
            {
                UserDTO userDTO = UserDTO.builder()
                .id(user.id)
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastname(user.getLastname())
                .contact(user.getContact())
                .address(user.getAddress())
                .build();
                return userDTO;
            }
            return null;
        }
    }
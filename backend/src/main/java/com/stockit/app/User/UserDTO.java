package com.stockit.app.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    Integer id;
    String username;
    String firstName;
    String lastname;
    String email;
    String contact;
    String address;
}

package com.stockit.app.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("update User u set u.username=:username, u.email=:email, u.firstName=:firstName, u.lastname=:lastname, u.contact=:contact, u.address=:address where u.id = :id")
    void updateUser(@Param(value = "id") Integer id,   
                    @Param(value = "username") String username,
                    @Param(value = "email") String email,
                    @Param(value = "firstName") String firstName, 
                    @Param(value = "lastname") String lastname,
                    @Param(value = "contact") String contact,
                    @Param(value = "address") String address);
}

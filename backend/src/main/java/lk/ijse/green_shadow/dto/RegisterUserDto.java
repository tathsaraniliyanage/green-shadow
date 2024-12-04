package lk.ijse.green_shadow.dto;

import lk.ijse.green_shadow.entity.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author Sasindu Malshan
 * @project green_shadow
 * @date 11/17/2024
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterUserDto {
    private String email;
    private String password;
    private UserRole role;
}

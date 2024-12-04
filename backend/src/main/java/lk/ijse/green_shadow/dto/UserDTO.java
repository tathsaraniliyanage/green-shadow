package lk.ijse.green_shadow.dto;

import lk.ijse.green_shadow.dto.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO implements Serializable {
    private String email;
    private String password;
    private UserRole role;

}

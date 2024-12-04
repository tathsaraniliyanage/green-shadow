package lk.ijse.green_shadow.util;

import lombok.*;

/**
 * @author Sasindu Malshan
 * @project green_shadow
 * @date 11/17/2024
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginResponse {
    private String token;

    private long expiresIn;

    public String getToken() {
        return token;
    }
}

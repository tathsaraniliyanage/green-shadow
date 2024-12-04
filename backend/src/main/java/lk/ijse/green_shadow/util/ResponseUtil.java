package lk.ijse.green_shadow.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ResponseUtil {
    private int code;
    private String message;
    private Object data;
}

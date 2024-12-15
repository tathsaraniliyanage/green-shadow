package lk.ijse.green_shadow.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class FieldDTO implements Serializable {
    private String fieldCode;
    private String fieldName;
    private String fieldLocation;
    private Double extentSize;
    private String fieldImage1;
    private String fieldImage2;
    private List<CropDTO> cropList;
    private List<StaffDTO> staffList;

}

package lk.ijse.green_shadow.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

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
public class CropDTO {
    private String cropCode;
    private String cropCommonName;
    private String cropScientificName;
    private String cropImage;
    private String category;
    private String cropSeason;
    private FieldDTO field;

//    cropCode: dff
//    cropCommonName: fdf
//    cropScientificName: fdf
//    cropImage: (binary)
//    category: df
//    crop-season: fdf
//    equipment-staff-id: F001
}

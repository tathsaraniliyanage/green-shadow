package lk.ijse.green_shadow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class MonitoringLogDTO implements Serializable {
    private String logCode;
    private Date logDate;
    private String logDetails;
    private String observedImage;
    private List<FieldDTO> fields;
    private List<CropDTO> crops;
    private List<StaffDTO> staff;

}

package lk.ijse.green_shadow.dto;

import lk.ijse.green_shadow.dto.type.EquipmentType;
import lk.ijse.green_shadow.dto.type.Status;
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
public class EquipmentDTO implements Serializable {
    private String equipmentId;
    private String name;
    private EquipmentType type;
    private Status status;
    private StaffDTO staff;
    private FieldDTO field;


}

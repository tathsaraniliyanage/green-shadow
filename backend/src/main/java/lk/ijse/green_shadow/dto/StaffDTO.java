package lk.ijse.green_shadow.dto;

import jakarta.persistence.*;
import lk.ijse.green_shadow.dto.type.Gender;
import lk.ijse.green_shadow.dto.type.Role;
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
public class StaffDTO implements Serializable {
    private String id;
    private String firstName;
    private String lastName;
    private String designation;
    private Gender gender;
    private Date joinedDate;
    private Date dob;
    private String addressLine01;
    private String addressLine02;
    private String addressLine03;
    private String addressLine04;
    private String addressLine05;
    private String contactNo;
    private String email;
    private Role role;
    private List<VehicleDTO> assignedVehicles;
    private List<FieldDTO> fields;


}

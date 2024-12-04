package lk.ijse.green_shadow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lk.ijse.green_shadow.entity.type.Gender;
import lk.ijse.green_shadow.entity.type.Role;
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
@Entity
public class Staff implements Serializable {
    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String designation;

    @Enumerated(EnumType.STRING)
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

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "staff",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Vehicle> assignedVehicles;

    @ManyToMany
    private List<Field> fields;


}

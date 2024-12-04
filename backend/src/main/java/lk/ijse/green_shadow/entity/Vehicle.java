package lk.ijse.green_shadow.entity;

import jakarta.persistence.*;
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
@Entity
public class Vehicle implements Serializable {
    @Id
    private String vehicleCode;

    private String licensePlateNumber;
    private String vehicleCategory;
    private String fuelType;
    private String status;
    private String remarks;

    @ManyToOne
    private Staff staff;

}

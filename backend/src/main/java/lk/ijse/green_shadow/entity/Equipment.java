package lk.ijse.green_shadow.entity;

import jakarta.persistence.*;
import lk.ijse.green_shadow.entity.type.EquipmentType;
import lk.ijse.green_shadow.entity.type.Status;
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
public class Equipment implements Serializable {
    @Id
    private String equipmentId;

    private String name;

    @Enumerated(EnumType.STRING)
    private EquipmentType type;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "field_code")
    private Field field;


}

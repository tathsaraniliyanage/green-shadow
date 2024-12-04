package lk.ijse.green_shadow.entity;

import jakarta.persistence.*;
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
public class MonitoringLog implements Serializable {
    @Id
    private String logCode;

    private Date logDate;
    private String logDetails;

    @Lob
    private String observedImage;

    @OneToMany
    private List<Field> fields;

    @OneToMany
    private List<Crop> crops;

    @OneToMany
    private List<Staff> staff;

}

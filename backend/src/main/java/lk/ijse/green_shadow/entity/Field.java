package lk.ijse.green_shadow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@ToString
@Builder
@Entity
public class Field implements Serializable {
    @Id
    private String fieldCode;

    private String fieldName;

    private String fieldLocation;

    private Double extentSize;

    @Lob
    private String fieldImage1;

    @Lob
    private String fieldImage2;

    @OneToMany(mappedBy = "field", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Crop> cropList;

    @ManyToMany
    private List<Staff> staffList;

}

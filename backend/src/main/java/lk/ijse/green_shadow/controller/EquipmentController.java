package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.Equipment;
import lk.ijse.green_shadow.service.impl.EquipmentServiceImpl;
import lk.ijse.green_shadow.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/equipment")
@RequiredArgsConstructor
@CrossOrigin
public class EquipmentController {

    private final EquipmentServiceImpl equipmentService;

    @PostMapping
    public ResponseEntity<ResponseUtil> saveEquipment(@RequestBody Equipment equipment) {
        try {
            Equipment savedEquipment = equipmentService.saveEquipment(equipment);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedEquipment)
                            .message("Equipment saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save equipment: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{equipmentId}")
    public ResponseEntity<ResponseUtil> updateEquipment(@PathVariable String equipmentId, @RequestBody Equipment equipment) {
        try {
            Equipment updatedEquipment = equipmentService.updateEquipment(equipmentId, equipment);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedEquipment)
                            .message("Equipment updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update equipment: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllEquipments() {
        try {
            List<Equipment> equipments = equipmentService.getAllEquipments();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(equipments)
                            .message("Equipments retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve equipments: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{equipmentId}")
    public ResponseEntity<ResponseUtil> getEquipmentById(@PathVariable String equipmentId) {
        try {
            Equipment equipment = equipmentService.getEquipmentById(equipmentId);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(equipment)
                            .message("Equipment retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve equipment: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{equipmentId}")
    public ResponseEntity<ResponseUtil> deleteEquipment(@PathVariable String equipmentId) {
        try {
            equipmentService.deleteEquipment(equipmentId);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Equipment deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete equipment: " + e.getMessage())
                            .build()
            );
        }
    }
}

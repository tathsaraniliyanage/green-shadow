package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.Field;
import lk.ijse.green_shadow.service.FieldService;
import lk.ijse.green_shadow.service.impl.FieldServiceImpl;
import lk.ijse.green_shadow.util.ResponseUtil;
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
@RequestMapping("/fields")
public class FieldController {

    @Autowired
    private  FieldService fieldService;

    @PostMapping
    public ResponseEntity<ResponseUtil> saveField(@RequestBody Field field) {
        try {
            Field savedField = fieldService.saveField(field);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedField)
                            .message("Field saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save field: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{fieldCode}")
    public ResponseEntity<ResponseUtil> updateField(@PathVariable String fieldCode, @RequestBody Field field) {
        try {
            Field updatedField = fieldService.updateField(fieldCode, field);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedField)
                            .message("Field updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update field: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllFields() {
        try {
            List<Field> fields = fieldService.getAllFields();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(fields)
                            .message("Fields retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve fields: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{fieldCode}")
    public ResponseEntity<ResponseUtil> getFieldById(@PathVariable String fieldCode) {
        try {
            return fieldService.getFieldById(fieldCode)
                    .map(field -> ResponseEntity.ok(
                            ResponseUtil.builder()
                                    .code(200)
                                    .data(field)
                                    .message("Field retrieved successfully.")
                                    .build()
                    ))
                    .orElse(ResponseEntity.status(404).body(
                            ResponseUtil.builder()
                                    .code(404)
                                    .message("Field not found.")
                                    .build()
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve field: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{fieldCode}")
    public ResponseEntity<ResponseUtil> deleteField(@PathVariable String fieldCode) {
        try {
            fieldService.deleteField(fieldCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Field deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete field: " + e.getMessage())
                            .build()
            );
        }
    }
}

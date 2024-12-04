package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.Crop;
import lk.ijse.green_shadow.service.CropService;
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
@RequestMapping("/crops")
@RequiredArgsConstructor
public class CropController {

    private final CropService cropService;

    @PostMapping
    public ResponseEntity<ResponseUtil> saveCrop(@RequestBody Crop crop) {
        try {
            Crop savedCrop = cropService.saveCrop(crop);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedCrop)
                            .message("Crop saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save crop: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{cropCode}")
    public ResponseEntity<ResponseUtil> updateCrop(@PathVariable String cropCode, @RequestBody Crop crop) {
        try {
            Crop updatedCrop = cropService.updateCrop(cropCode, crop);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedCrop)
                            .message("Crop updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update crop: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllCrops() {
        try {
            List<Crop> crops = cropService.getAllCrops();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(crops)
                            .message("Crops retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve crops: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{cropCode}")
    public ResponseEntity<ResponseUtil> getCropByCode(@PathVariable String cropCode) {
        try {
            Crop crop = cropService.getCrop(cropCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(crop)
                            .message("Crop retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve crop: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{cropCode}")
    public ResponseEntity<ResponseUtil> deleteCrop(@PathVariable String cropCode) {
        try {
            cropService.deleteCrop(cropCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Crop deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete crop: " + e.getMessage())
                            .build()
            );
        }
    }
}

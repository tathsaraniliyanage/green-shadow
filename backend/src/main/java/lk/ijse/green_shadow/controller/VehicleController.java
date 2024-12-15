package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.Vehicle;
import lk.ijse.green_shadow.service.VehicleService;
import lk.ijse.green_shadow.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/vehicle")
@CrossOrigin
public class VehicleController {

    private final VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public ResponseEntity<ResponseUtil> saveVehicle(@RequestBody Vehicle vehicle) {
        try {
            Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedVehicle)
                            .message("Vehicle saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save vehicle: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{vehicleCode}")
    public ResponseEntity<ResponseUtil> updateVehicle(@PathVariable String vehicleCode, @RequestBody Vehicle vehicle) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicle(vehicleCode, vehicle);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedVehicle)
                            .message("Vehicle updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update vehicle: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllVehicle() {
        try {
            List<Vehicle> vehicles = vehicleService.getAllVehicle();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(vehicles)
                            .message("Vehicles retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve vehicles: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{vehicleCode}")
    public ResponseEntity<ResponseUtil> getVehicle(@PathVariable String vehicleCode) {
        try {
            Vehicle vehicles = vehicleService.getVehicle(vehicleCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(vehicles)
                            .message("Vehicles retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve vehicles: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{vehicleCode}")
    public ResponseEntity<ResponseUtil> deleteVehicle(@PathVariable String vehicleCode) {
        try {
            vehicleService.deleteVehicle(vehicleCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Vehicle deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete vehicle: " + e.getMessage())
                            .build()
            );
        }
    }
}

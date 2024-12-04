package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.advices.GlobalExceptionHandler;
import lk.ijse.green_shadow.entity.Staff;
import lk.ijse.green_shadow.service.StaffService;
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
@RequestMapping("/staff")
@RequiredArgsConstructor
@CrossOrigin
public class StaffController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private GlobalExceptionHandler exceptionHandler;

    @PostMapping
    public ResponseEntity<ResponseUtil> saveStaff(@RequestBody Staff staff) {
        try {
            Staff savedStaff = staffService.saveStaff(staff);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedStaff)
                            .message("Staff member successfully saved.")
                            .build()
            );
        } catch (Exception e) {
            return exceptionHandler.error(e);
        }
    }

    @PutMapping("/{staffCode}")
    public ResponseEntity<ResponseUtil> updateStaff(@PathVariable String staffCode, @RequestBody Staff staff) {
        try {
            Staff updatedStaff = staffService.updateStaff(staffCode, staff);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedStaff)
                            .message("Staff member successfully updated.")
                            .build()
            );
        } catch (Exception e) {
            return exceptionHandler.error(e);
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllStaff() {
        try {
            List<Staff> staffList = staffService.getAllStaff();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(staffList)
                            .message("Staff members retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return exceptionHandler.error(e);
        }
    }

    @GetMapping("/{staffCode}")
    public ResponseEntity<ResponseUtil> getStaffById(@PathVariable String staffCode) {
        try {
            Staff staff = staffService.getStaff(staffCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(staff)
                            .message("Staff member retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return exceptionHandler.error(e);
        }
    }

    @DeleteMapping("/{staffCode}")
    public ResponseEntity<ResponseUtil> deleteStaff(@PathVariable String staffCode) {
        try {
            staffService.deleteStaff(staffCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Staff member successfully deleted.")
                            .build()
            );
        } catch (Exception e) {
            return exceptionHandler.error(e);
        }
    }
}

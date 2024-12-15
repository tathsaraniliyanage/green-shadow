package lk.ijse.green_shadow.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.green_shadow.entity.Staff;
import lk.ijse.green_shadow.repo.StaffRepository;
import lk.ijse.green_shadow.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Service
@Transactional
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository repository;


    @Override
    public Staff saveStaff(Staff staff) {
        try {
            Staff savedStaff = repository.save(staff);
            if (repository.existsById(savedStaff.getId())) {
                return savedStaff;
            }
            throw new RuntimeException("Failed to save staff.");
        } catch (Exception exception) {
            throw new RuntimeException("Error while saving staff: " + exception.getMessage(), exception);
        }
    }

    @Override
    public Staff updateStaff(String staffCode, Staff staff) {
        try {
            if (repository.existsById(staffCode)) {
                Staff updatedStaff = repository.save(staff);
                if (repository.existsById(updatedStaff.getId())) {
                    return updatedStaff;
                }
                throw new RuntimeException("Failed to update staff.");
            }
            throw new RuntimeException("Staff with code " + staffCode + " does not exist.");
        } catch (Exception exception) {
            throw new RuntimeException("Error while updating staff: " + exception.getMessage(), exception);
        }
    }

    @Override
    public List<Staff> getAllStaff() {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            throw new RuntimeException("Error while retrieving all staff: " + exception.getMessage(), exception);
        }
    }

    @Override
    public Staff getStaff(String id) {
        try {
            if (repository.existsById(id)) {
                return repository.findById(id).get();
            }
            throw new RuntimeException("Staff with code " + id + " does not exist.");
        } catch (Exception exception) {
            throw new RuntimeException("Error while retrieving staff with ID " + id + ": " + exception.getMessage(), exception);
        }
    }

    @Override
    public void deleteStaff(String staffCode) {
        try {
            if (repository.existsById(staffCode)) {
                repository.deleteById(staffCode);
            } else {
                throw new RuntimeException("Staff with code " + staffCode + " does not exist.");
            }
        } catch (Exception exception) {
            throw new RuntimeException("Error while deleting staff: " + exception.getMessage(), exception);
        }
    }
}

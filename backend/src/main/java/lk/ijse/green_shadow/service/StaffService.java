package lk.ijse.green_shadow.service;

import lk.ijse.green_shadow.entity.Staff;

import java.util.List;

public interface StaffService {
    Staff saveStaff(Staff staff);

    Staff updateStaff(String staffCode, Staff staff);

    List<Staff> getAllStaff();

    Staff getStaff(String id);

    void deleteStaff(String staffCode);
}

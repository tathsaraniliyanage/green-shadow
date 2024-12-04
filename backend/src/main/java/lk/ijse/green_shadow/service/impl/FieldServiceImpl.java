package lk.ijse.green_shadow.service.impl;

import lk.ijse.green_shadow.entity.Field;
import lk.ijse.green_shadow.repo.FieldRepository;
import lk.ijse.green_shadow.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Service
@Transactional
public class FieldServiceImpl implements FieldService {

    @Autowired
    private  FieldRepository fieldRepository;


    public Field saveField(Field field) {
        return fieldRepository.save(field);
    }

    public Field updateField(String fieldCode, Field updatedField) {
        updatedField.setFieldCode(fieldCode);
        return fieldRepository.save(updatedField);
    }

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public Optional<Field> getFieldById(String fieldCode) {
        return fieldRepository.findById(fieldCode);
    }

    public void deleteField(String fieldCode) {
        fieldRepository.deleteById(fieldCode);
    }
}




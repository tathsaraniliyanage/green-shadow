package lk.ijse.green_shadow.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.green_shadow.entity.Crop;
import lk.ijse.green_shadow.repo.CropRepository;
import lk.ijse.green_shadow.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Service
@Transactional
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    @Override
    public Crop saveCrop(Crop crop) {
        try {
            Crop savedCrop = cropRepository.save(crop);
            if (cropRepository.existsById(savedCrop.getCropCode())) {
                return savedCrop;
            }
            throw new RuntimeException("Crop could not be saved.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the crop: " + e.getMessage());
        }
    }

    @Override
    public Crop updateCrop(String cropCode, Crop crop) {
        try {
            if (cropRepository.existsById(cropCode)) {
                return cropRepository.save(crop);
            }
            throw new RuntimeException("Crop with code " + cropCode + " does not exist.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the crop: " + e.getMessage());
        }
    }

    @Override
    public List<Crop> getAllCrops() {
        try {
            return cropRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving crops: " + e.getMessage());
        }
    }

    @Override
    public Crop getCrop(String cropCode) {
        try {
            if (cropRepository.existsById(cropCode)) {
                return cropRepository.findById(cropCode).get();
            }
            throw new RuntimeException("Crop with code " + cropCode + " does not exist.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving crops: " + e.getMessage());
        }
    }

    @Override
    public void deleteCrop(String cropCode) {
        try {
            if (cropRepository.existsById(cropCode)) {
                cropRepository.deleteById(cropCode);
            } else {
                throw new RuntimeException("Crop with code " + cropCode + " does not exist.");
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the crop: " + e.getMessage());
        }
    }
}

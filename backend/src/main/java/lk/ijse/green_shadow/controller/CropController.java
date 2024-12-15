package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.dto.CropDTO;
import lk.ijse.green_shadow.dto.FieldDTO;
import lk.ijse.green_shadow.entity.Crop;
import lk.ijse.green_shadow.service.CropService;
import lk.ijse.green_shadow.service.ImageService;
import lk.ijse.green_shadow.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * @author
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/crops")
@RequiredArgsConstructor
@CrossOrigin
public class CropController {

    @Autowired
    private final CropService cropService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseUtil> saveCrop(
            @RequestParam("cropCode") String cropCode,
            @RequestParam("cropCommonName") String cropCommonName,
            @RequestParam("cropScientificName") String cropScientificName,
            @RequestPart("cropImage") MultipartFile cropImage,
            @RequestParam("category") String category,
            @RequestParam("crop-season") String cropSeason,
            @RequestParam("equipment-staff-id") String equipmentStaffId
    ) {
        try {
            String uploadDirectory = "src/main/resources/static/images";
            String savedImage = imageService.saveImageToStorage(uploadDirectory, cropImage, cropCode);

            CropDTO cropDTO = CropDTO.builder().
                    cropCode(cropCode).
                    cropCommonName(cropCommonName).
                    cropScientificName(cropScientificName).
                    cropImage(savedImage).
                    category(category).
                    cropSeason(cropSeason).
                    field(FieldDTO.builder().fieldCode(equipmentStaffId).build()).build();

            Crop savedCrop = cropService.saveCrop(modelMapper.map(cropDTO, Crop.class));


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

    @PutMapping
    public ResponseEntity<ResponseUtil> updateCrop(
            @RequestParam("cropCode") String cropCode,
            @RequestParam("cropCommonName") String cropCommonName,
            @RequestParam("cropScientificName") String cropScientificName,
            @RequestPart("cropImage") MultipartFile cropImage,
            @RequestParam("category") String category,
            @RequestParam("crop-season") String cropSeason
    ) {
        try {
            Crop crop = cropService.getCrop(cropCode);
            CropDTO cropDTO;
            if (cropImage.isEmpty()) {
                cropDTO = CropDTO.builder().
                        cropCode(cropCode).
                        cropCommonName(cropCommonName).
                        cropScientificName(cropScientificName).
                        category(category).
                        cropSeason(cropSeason).
                        cropImage(crop.getCropImage()).
                        field(FieldDTO.builder().fieldCode(crop.getField().getFieldCode()).build()).build();

            } else {
                String uploadDirectory = "src/main/resources/static/images";
                String savedImage = imageService.saveImageToStorage(uploadDirectory, cropImage, cropCode);

                cropDTO = CropDTO.builder().
                        cropCode(cropCode).
                        cropCommonName(cropCommonName).
                        cropScientificName(cropScientificName).
                        cropImage(savedImage).
                        category(category).
                        cropSeason(cropSeason).
                        field(FieldDTO.builder().fieldCode(crop.getField().getFieldCode()).build()).build();
            }

            Crop updatedCrop = cropService.updateCrop(cropCode, modelMapper.map(cropDTO, Crop.class));

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
            List<Crop> newList = new ArrayList<>();


            for (Crop crop : crops) {
                crop.setCropImage("data:image/jpeg;base64," + imageService.getImageAsBase64("src/main/resources/static/images/", crop.getCropImage()));
                newList.add(crop);
            }

            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(newList)
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

            crop.setCropImage("data:image/jpeg;base64," + imageService.getImageAsBase64("src/main/resources/static/images/", crop.getCropImage()));
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

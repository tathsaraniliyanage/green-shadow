function showCropAddFromOnClick() {
  $("#cropAddForm").toggle();
  $("#crop-button-done-text").text("Done");
  setInialFromDataForCrop();
}

const setInialFromDataForCrop = async () => {
  $("#crops-staff-id").children().remove();
  const staff = await getAllField();
  if (staff) {
    staff.map((item) => {
      $("#crops-staff-id").append(
        `<option value="${item.fieldCode}">${item.fieldName}</option>`
      );
    });
  }
};

function cropUpdateImagePreview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("crop-previewImage");
      console.log(previewImage);
      console.log(e.target.result);
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function submitCropForm(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const form = document.getElementById("cropForm");
  const formData = new FormData(form);

  // You can access form fields and files here
  console.log("Crop Code:", formData.get("cropCode"));
  console.log("Common Name:", formData.get("cropCommonName"));
  console.log("Scientific Name:", formData.get("cropScientificName"));
  console.log("Category:", formData.get("category"));
  console.log("Crop Season:", formData.get("crop-season"));
  console.log("Uploaded File:", formData.get("cropImage")); // File object

  // Example: Sending form data via Fetch API

  if ($("#crop-button-done-text").text() === "Update") {
    let isUpdate = updateCrop(formData);
    if (isUpdate) {
      alert("successfully update crop");
      $("#cropAddForm").toggle();
      loadAllCrop();
    }
  } else {
    const isSave = saveCrop(formData);

    if (isSave) {
      alert("successfully save crop");
      $("#cropAddForm").toggle();
      loadAllCrop();
    }
  }
}

const editInCrop = async (event) => {
  try {
    const cropId = $(event.target).data("id");
    if (!cropId) {
      console.error("No crop ID found in the event target");
      return;
    }

    const crop = await findCropById(cropId);
    if (crop) {
      $("#cropAddForm").toggle();
      $("#crop-button-done-text").text("Update");

      $("#cropCode").val(crop.cropCode);
      $("#cropCommonName").val(crop.cropCommonName);
      $("#cropScientificName").val(crop.cropScientificName);
      $("#crop-season").val(crop.cropSeason);
      $("#category").val(crop.category);
      $("#crop-previewImage").attr("src", crop.cropImage);
      
    }
  } catch (error) {
    console.error("Error editing crop:", error);
  }
};

const removeInCrop = async (event) => {
  const del = confirm(
    `you want to delete this crop  ${$(event.target).data("id")}`
  );
  if (del) {
    const cropId = $(event.target).data("id");
    const isDelete = await deleteCrop(cropId);
    if (isDelete) {
      alert("successfully delete crop");
      loadAllCrop();
    }
  }
};

const loadAllCrop = async () => {
  $("#cropTbody").children().remove();
  const crops = await getAllCrop();
  if (crops) {
    crops.map((item) => {
      $("#cropTbody").append(
        `<tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <img  class="hover:h-[300px] rounded-md h-[50px] z-10 relative " src=${item.cropImage} alt="">
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.cropCommonName}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.cropScientificName}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.cropSeason}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.category}
                      </a>
                    </td>
                     <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 " data-id="${item.cropCode}" onclick="editInCrop(event)"> <img width="12" height="12" data-id="${item.cropCode}" src="./acessst/image/icon/icons8-pencil-24.png" alt=""></button>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-red-100" data-id="${item.cropCode}" onclick="removeInCrop(event)"> <img width="14" height="14" data-id="${item.cropCode}" src="./acessst/image/icon/icons8-remove-30 (2).png" alt=""></button>
                    </td>
                  </tr>`
      );
    });
  }
};

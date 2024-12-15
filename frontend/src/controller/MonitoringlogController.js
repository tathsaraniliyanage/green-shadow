function showMonitoringLogAddFromOnClick() {
  $("#monitoringLogAddForm").toggle();
  $("#Monitoringlog-button-done-text").text("Done");
  setInialFromDataForCropLog();
}

function MonitoringlogSave() {
  $("#monitoringLogAddForm").toggle();
}

function MonitoringlogClose() {
  $("#monitoringLogAddForm").toggle();
}

let dropdownToggleCrop = document.getElementById("dropdownToggleCrop");
let dropdownMenuCrop = document.getElementById("dropdownMenuCrop");

function handleClickCrop() {
  if (dropdownMenuCrop.className.includes("block")) {
    dropdownMenuCrop.classList.add("hidden");
    dropdownMenuCrop.classList.remove("block");
  } else {
    dropdownMenuCrop.classList.add("block");
    dropdownMenuCrop.classList.remove("hidden");
  }
}

dropdownToggleCrop.addEventListener("click", handleClickCrop);

let dropdownToggleField = document.getElementById("dropdownToggleField");
let dropdownMenuField = document.getElementById("dropdownMenuField");

function handleClickField() {
  if (dropdownMenuField.className.includes("block")) {
    dropdownMenuField.classList.add("hidden");
    dropdownMenuField.classList.remove("block");
  } else {
    dropdownMenuField.classList.add("block");
    dropdownMenuField.classList.remove("hidden");
  }
}

dropdownToggleField.addEventListener("click", handleClickField);

let dropdownToggleStaff = document.getElementById("dropdownToggleStaff");
let dropdownMenuStaff = document.getElementById("dropdownMenuStaff");

function handleClickStaff() {
  if (dropdownMenuStaff.className.includes("block")) {
    dropdownMenuStaff.classList.add("hidden");
    dropdownMenuStaff.classList.remove("block");
  } else {
    dropdownMenuStaff.classList.add("block");
    dropdownMenuStaff.classList.remove("hidden");
  }
}

dropdownToggleStaff.addEventListener("click", handleClickStaff);

function cropLogUpdateImagePreview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("crop-log-previewImage");
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function setInialFromDataForCropLog() {
  $("#dropdownMenuStaff").children().remove();
  const staff = await getAllStaffMember();
  if (staff) {
    staff.map((item) => {
      $("#dropdownMenuStaff").append(
        `<div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=${item.id}
                        class="w-4 h-4 text-[#22C55E] bg-[#22C55E] border-[#22C55E] rounded focus:ring-[#22C55E]"
                      />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >${item.firstName} ${item.lastName}</label
                      >
                    </div>`
      );
    });
  }

  $("#dropdownMenuCrop").children().remove();
  const crop = await getAllCrop();
  if (crop) {
    crop.map((item) => {
      $("#dropdownMenuCrop").append(
        `<div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=${item.cropCode}
                        class="w-4 h-4 text-[#22C55E] bg-[#22C55E] border-[#22C55E] rounded focus:ring-[#22C55E]"
                      />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >${item.cropCommonName}</label
                      >
                    </div>`
      );
    });
  }

  $("#dropdownMenuField").children().remove();
  const field = await getAllField();
  if (field) {
    field.map((item) => {
      $("#dropdownMenuField").append(
        `<div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=${item.fieldCode}
                        class="w-4 h-4 text-[#22C55E] bg-[#22C55E] border-[#22C55E] rounded focus:ring-[#22C55E]"
                      />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >${item.fieldName}</label
                      >
                    </div>`
      );
    });
  }
}

const submitCropLogForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById("cropLogForm");
  const formData = new FormData(form);

  const jwtToken = localStorage.getItem("token");
  console.log(jwtToken);

  const staffList = getSelectedStaff();
  const cropList = getSelectedCrops();
  const fieldList = getSelectedFields();

  console.log(getSelectedCrops(), ">>>>>>>>>>>>>>>>>>>>>>>>>");

  formData.append("crops", JSON.stringify(cropList));
  formData.append("staff", JSON.stringify(staffList));
  formData.append("fields", JSON.stringify(fieldList));

  console.log("logCode:", formData.get("logCode"));
  console.log("logDate:", formData.get("logDate"));
  console.log("logDetails :", formData.get("logDetails"));
  console.log("staff:", formData.get("staff"));
  console.log("crops:", formData.get("crops"));
  console.log("fields:", formData.get("fields"));
  console.log("observedImage :", formData.get("observedImage"));

  console.log(JSON.stringify(formData));

  const isSave = await saveCropLog(formData);
  if (isSave) {
    alert("successfully save crop log");
    $("#monitoringLogAddForm").toggle();
    loadAllCropLog();
  }
};

function getSelectedFields() {
  let selectedFields = [];

  // Iterate over all checked checkboxes in the dropdown
  $('#dropdownMenuField input[type="checkbox"]:checked').each(function () {
    selectedFields.push({ fieldCode: $(this).val() });
  });

  return selectedFields;
}

function getSelectedCrops() {
  let selectedCrops = [];

  // Assuming crop checkboxes are in a similar structure, use a similar logic
  $('#dropdownMenuCrop input[type="checkbox"]:checked').each(function () {
    selectedCrops.push({ cropCode: $(this).val() });
  });

  return selectedCrops;
}

function getSelectedStaff() {
  let selectedStaff = [];

  // Assuming staff checkboxes are in a similar structure, use a similar logic
  $('#dropdownMenuStaff input[type="checkbox"]:checked').each(function () {
    selectedStaff.push({ id: $(this).val() });
  });

  return selectedStaff;
}

const loadAllCropLog = async () => {
  $("#monitoringLogTbody").children().remove();
  const cropLog = await getAllCropLog();

  cropLog.map((item) => {
    $("#monitoringLogTbody").append(
      `<tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <img  class="hover:h-[300px] rounded-md h-[50px] z-10 relative " src=${item.observedImage} alt="">
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                         ${item.logDate}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                         ${item.logDetails}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <table class="w-full border-collapse border border-blue-gray-50">
                        <tbody id="${item.logCode}FieldTableBody" >
                           
                        </tbody>
                    </table>
                     
                    </td>

                    <td class="p-4 border-b border-blue-gray-50">
                      <table class="w-full border-collapse border border-blue-gray-50">
                        <tbody id="${item.logCode}StaffTableBody" >
                           
                        </tbody>
                    </table>
                     
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <table class="w-full border-collapse border border-blue-gray-50">
                        <tbody id="${item.logCode}CropTableBody" >
                           
                        </tbody>
                    </table>
                     
                    </td>
                  </tr>`
    );

    const field =  item.fields;

    field.map((v) => {
      $(`#${item.logCode}FieldTableBody`).append(
        `
          <tr>
              <td class="p-2 border border-blue-gray-100">${v.fieldName}, ${v.fieldLocation}</td>
          </tr>
          `
      );
    });

    const staff = item.staff;
  staff.map((v) => {
    $(`#${item.logCode}StaffTableBody`).append(
      `
          <tr>
              <td class="p-2 border border-blue-gray-100">${v.firstName} ${v.lastName}</td>
          </tr>
          `
    );
  });   

  const crop = item.crops;
  crop.map((v) => {
    $(`#${item.logCode}CropTableBody`).append(
      `
          <tr>
              <td class="p-2 border border-blue-gray-100">${v.cropCommonName}</td>
          </tr>
          `
    );
  });   

  });
 
};

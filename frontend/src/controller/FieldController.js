function showFieldAddFromOnClick() {
  $("#fieldAddForm").toggle();
  $("#field-button-done-text").text("Done");
}

function fieldSave() {
  // $("#fieldAddForm").toggle();
}

function fieldClose() {
  $("#fieldAddForm").toggle();
}

const submitFieldForm = async (event) => {
  event.preventDefault(); // Prevent form submission from reloading the page

  console.log("sublit");

  const form = document.getElementById("fieldForm");
  const formData = new FormData(form);

  const staffList = [];
  const cropList = [];
  formData.append("cropList", JSON.stringify(cropList));
  formData.append("staffList", JSON.stringify(staffList));

  if ($("#field-button-done-text").text() === "Update") {
    let isUpdate = await updateField(formData);
    if (isUpdate) {
      alert("successfully update Field");
      $("#fieldAddForm").toggle();
      loadAllField();
    }
  } else {
    const isSave = await saveField(formData);
    if (isSave) {
      alert("successfully save Field");
      $("#fieldAddForm").toggle();
      loadAllField();
    }
  }
};

function feildUpdateImage1Preview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("field-img1-previewImage");
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function feildUpdateImage2Preview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("field-img2-previewImage");
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const loadAllField = async () => {
  const field = await getAllField();

  $("#fieldTbody").children().remove();

  field.map((item) => {
    $("#fieldTbody").append(
      ` <tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <img  class="hover:h-[300px] rounded-md h-[50px] z-10 relative " src=${item.fieldImage1} alt="">
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <img  class="hover:h-[300px] rounded-md h-[50px] z-10 relative " src=${item.fieldImage2} alt="">
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                      ${item.fieldName}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                      ${item.fieldLocation}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                      ${item.extentSize}
                      </a>
                    </td>
                     <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 " data-id="${item.fieldCode}" onclick="editInField(event)"> <img width="12" height="12" data-id="${item.fieldCode}" src="./acessst/image/icon/icons8-pencil-24.png" alt=""></button>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-red-100" data-id="${item.fieldCode}" onclick="removeInField(event)"> <img width="14" height="14" data-id="${item.fieldCode}" src="./acessst/image/icon/icons8-remove-30 (2).png" alt=""></button>
                    </td>
                  </tr>`
    );
  });
};

const editInField = async (event) => {
  const fieldCode = event.target.dataset.id;
  
  const field= await getFieldById(fieldCode);
 
  $("#fieldAddForm").toggle();
  $("#field-button-done-text").text("Update");
  $("#fieldCode").val(field.fieldCode);
  $("#fieldName").val(field.fieldName);
  $("#fieldLocation").val(field.fieldLocation);
  $("#extentSize").val(field.extentSize);
  $("#field-img1-previewImage").attr("src", field.fieldImage1);
  $("#field-img2-previewImage").attr("src", field.fieldImage2);
};

const removeInField = (event) => {
  const fieldCode = event.target.dataset.id;

  let del = confirm(`you want to delete this field  ${fieldCode}`);

  if (del) {
    let isDelete = deleteField(fieldCode);
    if (isDelete) {
      alert("successfully delete field");
      loadAllField();
    }
  }
};

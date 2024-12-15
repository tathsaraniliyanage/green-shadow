async function showEquipmentAddFromOnClick() {
  if (await setInialFromData()) {
    $("#equipmentAddForm").toggle();
  }
  $("#equipment-button-done-text").text("Done");
}

function equipmentClose() {
  $("#equipmentAddForm").toggle();
}

async function equipmentSave() {
  const equipment = {
    equipmentId: $("#equipment-id").val(),
    name: $("#equipment-name").val(),
    type: $("#equipment-type").val(),
    status: $("#equipment-status").val(),
    staff: {
      id: $("#equipment-staff-id").val(),
    },
    field: {
      fieldCode: $("#equipment-fieldCode").val(),
    },
  };

  const jsonString = JSON.stringify(equipment);

  if ($("#equipment-button-done-text").text() === "Update") {
    update_equipment(jsonString);
  } else {
    save_equipment(jsonString);
  }
}

const update_equipment = async (jsonString) => {
  let isSave = await updateEquipment(jsonString);
  if (isSave) {
    alert("successfully update equipment");
    $("#equipmentAddForm").toggle();
    loadAllEquipment();
  } else {
    console.log("something wrong");
  }
};  

const save_equipment = async (jsonString) => {
  let isSave = await saveEquipment(jsonString);
  if (isSave) {
    alert("successfully save equipment");
    $("#equipmentAddForm").toggle();
    loadAllEquipment();
  } else {
    console.log("something wrong");
  }
};

const setInialFromData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const staff = await getAllStaffMember();
      if (staff) {
        console.log(staff);
        staff.map((item) => {
          $("#equipment-staff-id").append(
            `<option value="${item.id}">${item.firstName} ${item.lastName}</option>`
          );
        });
      }

      const field = await getAllField();
      if (field) {
        console.log(field);
        field.map((item) => {
          $("#equipment-fieldCode").append(
            `<option value="${item.fieldCode}">${item.fieldName}</option>`
          );
        });
      }

      resolve(true);
    } catch {
      reject(false);
    }
  });
};

function removeInEquipment(event) {
  let del = confirm(
    `you want to delete this equipment member ${$(event.target).data("id")}`
  );
  if (del) {
    let isDelete = deleteEquipment($(event.target).data("id"));
    if (isDelete) {
      alert("successfully delete equipment");
      loadAllEquipment();
    } else {
      console.log("something wrong");
    }
  }
}

async function editInEquipment(event) {
  if (await setInialFromData()) {
    $("#equipment-button-done-text").text("Update");

    const equipment = await findEquipmentById($(event.target).data("id"));
    if (equipment) {
      $("#equipment-id").val(equipment.equipmentId);
      $("#equipment-name").val(equipment.name);
      $("#equipment-type").val(equipment.type);
      $("#equipment-status").val(equipment.status);
      $("#equipment-staff-id").val(equipment.staff.id);
      $("#equipment-fieldCode").val(equipment.field.fieldCode);
      $("#equipmentAddForm").toggle();
    }
  }
}

const loadAllEquipment = async () => {
  $("#equipmentTbody").children().remove();
  const equipment = await getAllEquipment();
  if (equipment) {
    equipment.map((item) => {
      $("#equipmentTbody").append(
        `<tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.equipmentId}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.name}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.type}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.status}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                      ${item.staff.firstName} ${item.staff.lastName}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                      ${item.field.fieldName}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 " data-id="${item.equipmentId}" onclick="editInEquipment(event)"> <img width="12" height="12" data-id="${item.equipmentId}" src="./acessst/image/icon/icons8-pencil-24.png" alt=""></button>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-red-100" data-id="${item.equipmentId}" onclick="removeInEquipment(event)"> <img width="14" height="14" data-id="${item.equipmentId}" src="./acessst/image/icon/icons8-remove-30 (2).png" alt=""></button>
                    </td>
                  </tr>`
      );
    });
  }
};

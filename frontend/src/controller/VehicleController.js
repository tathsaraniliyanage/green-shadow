function showVehicleAddFromOnClick() {
  $("#vehicleAddForm").toggle();

  $("#vehicle-button-done-text").text("Done");

  setDataVehicleFormInitial();
}

function vehicleClose() {
  $("#vehicleAddForm").toggle();
}

const setDataVehicleFormInitial = async () => {
  $("#staff-vehicle").children().remove();

  const staff = await getAllStaffMember();

  if (staff) {
    staff.map((item) => {
      $("#staff-vehicle").append(
        `<option value="${item.id}">${item.firstName} ${item.lastName}</option>`
      );
    });
  }
};

async function vehicleSave() {
  $("#vehicleAddForm").toggle();

  let dto = {
    vehicleCode: $("#vehicleCode").val(),
    licensePlateNumber: $("#licensePlateNumber").val(),
    vehicleCategory: $("#vehicleCategory").val(),
    fuelType: $("#fuelType").val(),
    status: $("#status").val(),
    remarks: $("#remarks").val(),
    staff: {
      id: $("#staff-vehicle").val(),
    },
  };

  if ($("#vehicle-button-done-text").text() === "Update") {
    let isUpdate = await updateVehicle(dto);

    if (isUpdate) {
      alert("successfully update vehicle");
      loadAllVehicle();
    } else {
      console.log("something wrong");
    }
  } else {
    let isSave = await saveVehicle(dto);

    if (isSave) {
      alert("successfully save vehicle");
      loadAllVehicle();
    } else {
      console.log("something wrong");
    }
  }
}

function showDetailsInVehicle(event) {
  $(event.target).data("id");

  console.log($(event.target));
  alert($(event.target).data("id"));
}

function removeInVehicle(event) {
  let del = confirm(`you want to delete this vehicle member ${$(event.target).data("id")}`);
  if (del) {
    let isDelete = deleteVehicle($(event.target).data("id"));
    if (isDelete) {
      alert("successfully delete vehicle");
      loadAllVehicle();
    } else {
      console.log("something wrong");
    }
  }
}

async function editInVehicle(event) {
  $("#vehicleAddForm").toggle();
  $("#vehicle-button-done-text").text("Update");

  setDataVehicleFormInitial();

  const vehicle = await findVehicleById($(event.target).data("id"));
  if (vehicle) {
    $("#vehicleCode").val(vehicle.vehicleCode);
    $("#licensePlateNumber").val(vehicle.licensePlateNumber);
    $("#vehicleCategory").val(vehicle.vehicleCategory);
    $("#fuelType").val(vehicle.fuelType);
    $("#status").val(vehicle.status);
    $("#remarks").val(vehicle.remarks);
    $("#staff-vehicle").val(vehicle.staff.id);
  }
}

function loadAllVehicle() {
  $("#vahicleTbody").children().remove();
  getAllVehicle();
}

function loadData(list) {
  list.map((item) => {
    $("#vahicleTbody").append(
      `<tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.vehicleCode}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                         ${item.licensePlateNumber}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                         ${item.vehicleCategory}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                         ${item.fuelType}
                      </a>
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
                         ${item.remarks}
                      </a>
                    </td>

                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                      ${item.staff.firstName} ${item.staff.lastName}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button
                        data-id="${item.vehicleCode}"
                        onclick="removeInVehicle(event)"
                       class="hover:bg-gray-300 p-2 rounded-full bg-red-100"
                      >
                        <img
                          data-id="${item.vehicleCode}"  width="12" height="12"
                          src="./acessst/image/icon/icons8-remove-30 (2).png"
                          alt=""
                        />
                      </button>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button
                        data-id="${item.vehicleCode}"
                        onclick="editInVehicle(event)"
                        class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 "
                      >
                        <img
                          data-id="${item.vehicleCode}"  width="12" height="12"
                          src="./acessst/image/icon/icons8-pencil-24.png"
                          alt=""
                        />
                      </button>
                    </td>
                  </tr>`
    );
  });
}

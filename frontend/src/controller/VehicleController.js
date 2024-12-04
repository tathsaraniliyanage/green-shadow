function showVehicleAddFromOnClick() {
    $('#vehicleAddForm').toggle();
}


function vehicleClose() {
    $('#vehicleAddForm').toggle();
}


function vehicleSave() {
    $('#vehicleAddForm').toggle();

    let dto = {
        "vehicleCode": $('#vehicle-code').val(),
        "licensePlateNumber": $('#licenseP-plate-number').val(),
        "vehicleCategory": $('#vehicle-category').val(),
        "fuelType": $('#fuel-type').val(),
        "status": $('#status').val(),
        "remarks": $('#remarks').val(),
        "staff": {
            "id": "S02"
        }
    }
    let isSave = saveVehicle(dto);

    if (isSave) {
        alert("successfully save vehicle");
    } else {
        console.log("something wrong")
    }
}

function showDetailsInVehicle(event) {
    $(event.target).data('id')

    console.log($(event.target))
    alert($(event.target).data('id'))
}

function removeInVehicle(event) {
    $(event.target).data('id')

    console.log($(event.target))
    alert($(event.target).data('id'))
}

function editInVehicle(event) {
    $(event.target).data('id')

    console.log($(event.target))
    alert($(event.target).data('id'))
}

function loadAllVehicle() {
    $('#vahicleTbody').children().remove();
    getAllVehicle();
}

function loadData(list) {
    list.map((item) => {
        
        $('#vahicleTbody').append(
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
                    <td class="p-4 border-b border-blue-gray-50">
                      <button
                        data-id="${item.vehicleCode}" 
                        onclick="showDetailsInVehicle(event)"
                       class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 "
                      >
                        <img
                          data-id="${item.vehicleCode}"  width="12" height="12"
                          src="./acessst/image/icon/icons8-details-30.png"
                          alt=""
                        />
                      </button>
                    </td>
                  </tr>`
        )
    })
}
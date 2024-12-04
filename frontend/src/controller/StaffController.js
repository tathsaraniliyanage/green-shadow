function showStaffAddFromOnClick() {
  $("#staffAddForm").toggle();
  $("#staff-button-done-text").text("Done");
}

async function staffSave() {
  $("#staffAddForm").toggle();
  const formData = {};

  const role = document.querySelector("#staff-role").value;
  formData.role = role;

  const gender = document.querySelector("#staff-gender").value;
  formData.gender = gender;

  const formElements = document.querySelectorAll(
    "#staffAddForm input, #staffAddForm textarea"
  );

  formElements.forEach((element) => {
    const name = element.name;
    const value = element.value;
    if (name && value) {
      formData[name] = value;
    }
  });

  const jsonString = JSON.stringify(formData);

  if ($("#staff-button-done-text").text() === "Update") {
    let isSave = await updateStaff(jsonString);

    if (isSave) {
      alert("successfully update staff");
      getAllStaff();
    } else {
      console.log("something wrong");
    }
  } else {
    let isSave = await saveStaff(jsonString);

    if (isSave) {
      alert("successfully save staff");
      getAllStaff();
    } else {
      console.log("something wrong");
    }
  }

}

function fieldClose() {
  $("#staffAddForm").toggle();
}

function removeInStaff(event) {
    let del = confirm(`you want to delete this staff member ${$(event.target).data("id")}`);
    if (del) {
      let isDelete = deleteStaff($(event.target).data("id"));
      if (isDelete) {
        getAllStaff();
        alert("successfully delete staff");
      }else {
        console.log("something wrong");
      }
    }
}

async function editInStaff(event) {
  try {
    const staffId = $(event.target).data("id");
    if (!staffId) {
      console.error("No staff ID found in the event target");
      return;
    }

    const staff = await findStaffById(staffId);
    if (staff) {
      $("#staffAddForm").toggle();
      $("#staff-button-done-text").text("Update");

      $("#staff-id").val(staff.id);
      $("#staff-firstName").val(staff.firstName);
      $("#staff-lastName").val(staff.lastName);
      $("#staff-address-line-01").val(staff.addressLine01);
      $("#staff-address-line-02").val(staff.addressLine02);
      $("#staff-address-line-03").val(staff.addressLine03);
      $("#staff-address-line-04").val(staff.addressLine04);
      $("#staff-address-line-05").val(staff.addressLine05);
      $("#staff-designation").val(staff.designation);
      $("#staff-dob").val(staff.dob);
      $("#staff-joined-date").val(staff.joinedDate);
      $("#staff-gender").val(staff.gender);
      $("#staff-contact-no").val(staff.contactNo);
      $("#staff-role").val(staff.role);
      $("#staff-email").val(staff.email);
    }
  } catch (error) {
    console.error("Error fetching staff:", error);
  }
}

function loadDataSaff(list) {
  $("#staffTbody").children().remove();

  list.map((item) => {
    $("#staffTbody").append(
      `<tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                        ${item.id}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                       ${item.firstName} ${item.lastName}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p
                        class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
                       ${item.addressLine01} ${item.addressLine02} ${item.addressLine03} ${item.addressLine04} ${item.addressLine05}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.designation}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.dob}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.joinedDate}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.gender}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.contactNo}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <a
                        href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      >
                        ${item.role}
                      </a>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-gray-200 " data-id="${item.id}" onclick="editInStaff(event)"> <img width="12" height="12" data-id="${item.id}" src="./acessst/image/icon/icons8-pencil-24.png" alt=""></button>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button class="hover:bg-gray-300 p-2 rounded-full bg-red-100" data-id="${item.id}" onclick="removeInStaff(event)"> <img width="14" height="14" data-id="${item.id}" src="./acessst/image/icon/icons8-remove-30 (2).png" alt=""></button>
                    </td>
                  </tr>`
    );
  });
}

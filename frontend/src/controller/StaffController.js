function showStaffAddFromOnClick() {
  $("#staffAddForm").toggle();
  $("#staff-button-done-text").text("Done");
}

async function staffSave() {
  if (! await validateForm()) {
    return;
  }
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

function validateForm() {
  // Regex patterns
  const patterns = {
    id: /^S\d{3}$/, // S followed by 3 digits
    firstName: /^[A-Za-z]{2,30}$/, // 2-30 letters
    lastName: /^[A-Za-z]{2,30}$/, // 2-30 letters
    designation: /^[A-Za-z\s]{2,50}$/, // 2-50 letters and spaces
    contactNo: /^(?:\+94|0)[1-9][0-9]{8}$/, // Sri Lankan phone number format
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Email format
  };

  // Error messages
  const errorMessages = {
    id: "Staff ID must start with 'S' followed by 3 digits (e.g., S001)",
    firstName: "First name must be 2-30 letters only",
    lastName: "Last name must be 2-30 letters only",
    designation: "Designation must be 2-50 letters and spaces only",
    contactNo: "Contact number must be in Sri Lankan format (e.g., +94771234567 or 0771234567)",
    email: "Please enter a valid email address"
  };

  // Fields to validate with regex
  const fieldsToValidate = [
    { id: 'staff-id', pattern: patterns.id, message: errorMessages.id },
    { id: 'staff-firstName', pattern: patterns.firstName, message: errorMessages.firstName },
    { id: 'staff-lastName', pattern: patterns.lastName, message: errorMessages.lastName },
    { id: 'staff-designation', pattern: patterns.designation, message: errorMessages.designation },
    { id: 'staff-contact-no', pattern: patterns.contactNo, message: errorMessages.contactNo },
    { id: 'staff-email', pattern: patterns.email, message: errorMessages.email }
  ];

  // Check all required fields are filled
  const requiredFields = document.querySelectorAll('#staffAddForm input[required], #staffAddForm select[required]');
  for (let field of requiredFields) {
    if (!field.value.trim()) {
      alert('Please fill out all required fields.');
      field.focus();
      return false;
    }
  }

  // Validate fields with regex
  for (let field of fieldsToValidate) {
    const element = document.getElementById(field.id);
    if (element && !field.pattern.test(element.value)) {
      alert(field.message);
      element.focus();
      return false;
    }
  }

  // Date validations
  const joinedDate = new Date(document.getElementById('staff-joined-date').value);
  const dob = new Date(document.getElementById('staff-dob').value);
  const today = new Date();
  const minAge = 18;
  const maxAge = 60;

  // Validate DOB
  const age = today.getFullYear() - dob.getFullYear();
  if (age < minAge || age > maxAge) {
    alert(`Age must be between ${minAge} and ${maxAge} years.`);
    document.getElementById('staff-dob').focus();
    return false;
  }

  // Validate Joined Date
  if (joinedDate > today) {
    alert("Joined date cannot be in the future.");
    document.getElementById('staff-joined-date').focus();
    return false;
  }

  if (joinedDate < dob) {
    alert("Joined date cannot be before date of birth.");
    document.getElementById('staff-joined-date').focus();
    return false;
  }

  return true;
}
function showFieldAddFromOnClick() {
  $("#fieldAddForm").toggle();
}

function fieldSave() {
  $("#fieldAddForm").toggle();
  const formData = {};

  const role = document.querySelector("#role").value;
  formData.role = role;

  const gender = document.querySelector("#gender").value;
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

  let isSave = saveStaff(jsonString);

    if (isSave) {
        alert("successfully save vehicle");
    } else {
        console.log("something wrong")
    }
}

function fieldClose() {
  $("#fieldAddForm").toggle();
}

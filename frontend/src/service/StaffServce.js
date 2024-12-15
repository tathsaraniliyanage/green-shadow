function saveStaff(dto) {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/staff",
      data: dto,
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (msg) {
        console.log("Staff saved successfully:", msg);
        resolve(true); // Return     true;
      },
      error: function (errormsg) {
        console.error("Error saving staff:", errormsg);
        resolve(false); // Return false;
      },
    });
  });
}

function updateStaff(dto) {
  console.log("update staff");
  const jwtToken = localStorage.getItem("token");

  console.log(jwtToken);

  const data = JSON.parse(dto);

  // Access the 'id' value
  const id = data.id;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/staff/${id}`,
      data: dto,
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Staff fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch staff:", errormsg);
        reject(errormsg);
      },
    });
  });
}

getAllStaff = () => {
  const jwtToken = localStorage.getItem("token");

  $.ajax({
    type: "GET",
    url: "http://localhost:8080/staff",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    },
    success: function (data) {
      console.log("Staff fetch successfully:", data.message);
      loadDataSaff(data.data);
      return data.data;
    },
    error: function (errormsg) {
      console.error("Error fetch staff:", errormsg);
      return false;
    },
  });
};

function findStaffById(id) {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/staff/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Staff fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch staff:", errormsg);
        reject(errormsg);
      },
    });
  });
}

deleteStaff = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/staff/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Staff deleted successfully:", data.message);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error deleting staff:", errormsg);
        resolve(false);
      },
    });
  });
};

getAllStaffMember = () => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/staff",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Staff fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch staff:", errormsg);
        reject(errormsg);
      },
    });
  });
};

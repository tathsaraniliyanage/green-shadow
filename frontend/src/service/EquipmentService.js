function saveEquipment(dto) {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/equipment",
      data: dto,
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (msg) {
        console.log("Equipment saved successfully:", msg);
        resolve(true); // Return     true;
      },
      error: function (errormsg) {
        console.error("Error saving equipment:", errormsg);
        reject(false); // Return false;
      },
    });
  });
}

deleteEquipment = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/equipment/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Equipment deleted successfully:", data.message);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error deleting equipment:", errormsg);
        reject(false);
      },
    });
  });
};

getAllEquipment = () => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/equipment",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Equipment fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch equipment:", errormsg);
        reject(errormsg);
      },
    });
  });
};

findEquipmentById = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/equipment/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Equipment fetch successfully:", data.message);
        console.log(data);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch equipment:", errormsg);
        reject(errormsg);
      },
    });
  });
};

updateEquipment = (dto) => {
  const jwtToken = localStorage.getItem("token");

  const data = JSON.parse(dto);

  // Access the 'id' value
  const id = data.equipmentId;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/equipment/${id}`,
      data: dto,
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Equipment fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch equipment:", errormsg);
        reject(errormsg);
      },
    });
  });
};

const getAllCrop = () => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/crops",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Crop fetch successfully:", data.message);
        console.log(data.data);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch crop:", errormsg);
        reject(errormsg);
      },
    });
  });
};

const findCropById = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/crops/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Crop fetch successfully:", data.message);
        console.log(data.data);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch crop:", errormsg);
        reject(errormsg);
      },
    });
  });
};

const deleteCrop = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/crops/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Crop deleted successfully:", data.message);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error deleting crop:", errormsg);
        reject(false);
      },
    });
  });
};

const saveCrop = (dto) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/crops",
      data: dto,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Crop saved successfully:", data);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error saving crop:", errormsg);
        reject(false);
      },
    });
  });
};

const updateCrop = (dto) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "PUT",
      url: "http://localhost:8080/crops",
      data: dto,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Form submitted successfully:", data);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error saving crop:", errormsg);
        reject(false);
      },
    });
  });
};

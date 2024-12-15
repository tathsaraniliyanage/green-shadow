getAllField = () => {

  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/fields",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch field:", errormsg);
        reject(errormsg);
      },
    });
  });
};


const saveField = (dto) => {
  const jwtToken = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/fields",
      data: dto,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Field saved successfully:", data);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error saving field:", errormsg);
        reject(false);
      },
    });
  });
};

const deleteField = (id) => {
  const jwtToken = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/fields/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Field deleted successfully:", data.message);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error deleting field:", errormsg);
        reject(false);
      },
    });
  });
};  

const updateField = (dto) => {
  const jwtToken = localStorage.getItem("token"); 

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "PUT",
      url: "http://localhost:8080/fields",
      data: dto,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Field updated successfully:", data);
        resolve(true);
      },
      error: function (errormsg) {
        console.error("Error updating field:", errormsg);
        reject(false);
      },
    });
  });
};

const getFieldById = (id) => {
  const jwtToken = localStorage.getItem("token"); 

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/fields/${id}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
      },
      success: function (data) {
        console.log("Field fetch successfully:", data.message);
        resolve(data.data);
      },
      error: function (errormsg) {
        console.error("Error fetch field:", errormsg);
        reject(errormsg);
      },
    });
  });
};  
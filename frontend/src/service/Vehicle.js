saveVehicle = (dto) => {
    const jwtToken = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/vehicle",
        data:JSON.stringify(dto),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: function (msg) {
            console.log("Vehicle saved successfully:", msg);
            resolve(true);
        },
        error: function (errormsg) {
            console.error("Error saving vehicle:", errormsg);
            resolve(false);
        }
    });
    });
}


getAllVehicle = () => {
    const jwtToken = localStorage.getItem("token"); 

    console.log(jwtToken)

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/vehicle",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: function (data) {
            console.log("Vehicle fetch successfully:", data.message);
            loadData(data.data)
            return data.data;
        },
        error: function (errormsg) {
            console.error("Error fetch vehicle:", errormsg);
            return false;
        }
    });
}

const updateVehicle=(dto) => { 
    const jwtToken = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/vehicle/"+dto.vehicleCode,    
            data:JSON.stringify(dto),
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
            },
            success: function (msg) {
                console.log("Vehicle updated successfully:", msg);
                resolve(true);
            },
            error: function (errormsg) {
                console.error("Error updating vehicle:", errormsg);
                reject(false);
            }
        });
    });
}

const deleteVehicle = (id) => {
    const jwtToken = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/vehicle/${id}`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
            },
            success: function (data) {
                console.log("Vehicle deleted successfully:", data.message);
                resolve(true);
            },
            error: function (errormsg) {
                console.error("Error deleting vehicle:", errormsg);
                reject(false);
            }
        });
    });
}

const findVehicleById = (id) => {
    const jwtToken = localStorage.getItem("token");

    return new Promise((resolve, reject) => {    
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/vehicle/${id}`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
            },
            success: function (data) {
                console.log("Vehicle fetch successfully:", data.message);
                resolve(data.data);
            },
            error: function (errormsg) {
                console.error("Error fetch vehicle:", errormsg);
                reject(errormsg);
            }
        });
    });
}
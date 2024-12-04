saveVehicle = (dto) => {
    const jwtToken = localStorage.getItem("token"); // Replace with your actual token

    console.log(jwtToken)

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
            return true;
        },
        error: function (errormsg) {
            console.error("Error saving vehicle:", errormsg);
            return false;
        }
    });
}


getAllVehicle = () => {
    const jwtToken = localStorage.getItem("token"); // Replace with your actual token

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
const saveCropLog = (data) => {
    let jwtToken = localStorage.getItem("token");

    const obj = {
        logCode: data.get("logCode"),
        logDate: data.get("logDate"),
        logDetails: data.get("logDetails"),
        crops: JSON.parse(data.get("crops")),
        staff: JSON.parse(data.get("staff")),
        fields: JSON.parse(data.get("fields"))
    }

    console.log("Sending data:", obj);

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/monitoringLog",
            data: data,
            contentType: false,
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
            },
            success: function (imageResponse) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/monitoringLog/list",
                    data: JSON.stringify(obj),
                    contentType: "application/json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
                    },
                    success: function (response) {
                        console.log("Crop log saved successfully:", response);
                        resolve(true);
                    },
                    error: function (errormsg) {
                        console.error("Error saving crop log:", errormsg);
                        reject(false);
                    },
                });
            },
            error: function (errormsg) {
                console.error("Error uploading image:", errormsg);
                reject(false);
            },
        });
    });
};


const getAllCropLog = () => {
    const jwtToken = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/monitoringLog",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
            },
            success: function (data) {
                console.log("Crop log fetch successfully:", data.message);
                resolve(data.data);
            },
            error: function (errormsg) {
                console.error("Error fetch crop log:", errormsg);
                reject(errormsg);
            },
        });
    });
};
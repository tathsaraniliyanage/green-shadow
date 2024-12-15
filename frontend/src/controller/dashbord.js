function dashboardFieldOnclick(event) {
    rout('mainFieldSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
    loadAllField();
}

function dashboardCropOnclick() {
    rout('mainCropSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });

    loadAllCrop();
}

function dashboardVehicleOnclick() {
    rout('mainVehicleSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });

    loadAllVehicle();
}

function dashboardStaffOnclick() {
    rout('mainStaffSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
    getAllStaff();
}

function dashboardEquipmentOnclick() {
    rout('mainEquipmentSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
    loadAllEquipment();
}

function dashboardMonitoringLogOnclick() {
    rout('mainMonitoringLogSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });

    loadAllCropLog();
}

function dashboardHomeOnclick() {
    rout('dashbord');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
}

function rout(page) {
    const buttons = $('#buttonSet').children();
    for (let index = 0; index < buttons.length; index++) {
        $(buttons[index]).css({
            'background-image': 'none',
            'border-left': 'solid 0px'
        });
    }


    const pages = ['mainVehicleSection', 'mainCropSection', 'mainFieldSection', 'mainStaffSection', 'mainEquipmentSection', 'mainMonitoringLogSection','dashbord']
    for (const key of pages) {
        if (key == page) {
            $('#' + key).css({ 'display': 'block' });
        }
        else {
            $('#' + key).css({ 'display': 'none' });
        }
    }
}


function updateDateTime() {
    const now = new Date();

    // Format the date as "24/7"
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based
    const formattedDate = `${day}/${month}`;

    // Format the time as "9:20 AM"
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isAM = hours < 12;
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes} ${isAM ? 'AM' : 'PM'}`;

    // Set the values in the HTML
    document.getElementById('date').textContent = formattedDate;
    document.getElementById('time').textContent = formattedTime;
  }

  // Update the date and time every second
  setInterval(updateDateTime, 1000);

  // Call the function initially to set the date and time immediately
  updateDateTime();


  document.addEventListener("DOMContentLoaded", () => {
      // Set values dynamically
      const now = new Date();

      // Format the date as "24/7"
      const day = now.getDate();
      const month = now.getMonth() + 1; // Months are zero-based
      const formattedDate = `${day}/${month}`;

      // Format the time as "9:20 AM"
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const isAM = hours < 12;
      hours = hours % 12 || 12; // Convert to 12-hour format
      const formattedTime = `${hours}:${minutes} ${isAM ? 'AM' : 'PM'}`;

      // Update the HTML
      document.getElementById("date").textContent = formattedDate;
      document.getElementById("time").textContent = formattedTime;
    });

    document.addEventListener("DOMContentLoaded", async () => {
        $('#user1').text(localStorage.getItem("user"));
        $('#user2').text(localStorage.getItem("user"));

        let staffCount = await getAllStaffMember();
        $('#staffCount').text(staffCount.length);

        let cropCount= await getAllCrop();
        $('#cropCount').text(cropCount.length);
        
        let vehicleCount= await getAllVehicle();

        let un=0;
        let a=0;
        
        
                      
        for (let index = 0; index < vehicleCount.length; index++) {
            if (vehicleCount[index].status == "UNAVAILABLE") {
                un++;
            } else {
                a++;
            }
        }
        $('#vehicleCountAvalable').text(a);
        $('#vehicleCountUnavailable').text(un);
      });
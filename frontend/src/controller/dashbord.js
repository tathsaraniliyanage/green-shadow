function dashboardFieldOnclick(event) {
    rout('mainFieldSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
}

function dashboardCropOnclick() {
    rout('mainCropSection');
    $(event.target).css({
        'background-image': 'linear-gradient(to right, #0e836c1b, white)',
        'border-left': 'solid 4px'
    });
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
}

function dashboardMonitoringLogOnclick() {
    rout('mainMonitoringLogSection');
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


    const pages = ['mainVehicleSection', 'mainCropSection', 'mainFieldSection', 'mainStaffSection', 'mainEquipmentSection', 'mainMonitoringLogSection']
    for (const key of pages) {
        if (key == page) {
            $('#' + key).css({ 'display': 'block' });
        }
        else {
            $('#' + key).css({ 'display': 'none' });
        }
    }
}
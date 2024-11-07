$('#dashboard-section').css({display:'block'});
$('#staff-section').css({display: 'none'});
$('#field-section').css({display: 'none'});
$('#crop-section').css({display: 'none'});
$('#vehicle-section').css({display: 'none'});
$('#equipment-section').css({display: 'none'});
$('#logs-section').css({display: 'none'});

$('#dashboard').on('click' ,()=>{
    $('#dashboard-section').css({display:'block'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'none'});
})
$('#staff').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'block'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'none'});
})
$('#field').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'block'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'none'});
});

$('#crop').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'block'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'none'});
});

$('#vehicle').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'block'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'none'});
});

$('#equipment').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'block'});
    $('#logs-section').css({display: 'none'});
});

$('#logs').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $('#crop-section').css({display: 'none'});
    $('#vehicle-section').css({display: 'none'});
    $('#equipment-section').css({display: 'none'});
    $('#logs-section').css({display: 'block'});
})

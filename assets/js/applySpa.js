$('#dashboard-section').css({display:'block'});
$('#staff-section').css({display: 'none'});
$('#field-section').css({display: 'none'});

$('#dashboard').on('click' ,()=>{
    $('#dashboard-section').css({display:'block'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
})
$('#staff').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'block'});
    $('#field-section').css({display: 'none'});
})
$('#field').on('click' ,()=>{
    $('#dashboard-section').css({display:'none'});
    $('#staff-section').css({display: 'none'});
    $('#field-section').css({display: 'block'});
})
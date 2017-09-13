console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: '',
      age: '',
      gender: '',
      readyForTransfer: '',
      notes: ''
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#viewKoalas').empty();
      for (var i = 0; i < data.length; i++) {
        console.log('In for loop.');
        var $trow = $('<tr>');
        $trow.append('<td>' + data[i].name + '</td>');
        $trow.append('<td>' + data[i].age + '</td>');
        $trow.append('<td>' + data[i].gender + '</td>');
        $trow.append('<td>' + data[i].ready_for_transfer + '</td>');
        $trow.append('<td>' + data[i].notes + '</td>');        
        $('#viewKoalas').append($trow);
        

      }// end for loop
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
}
/*
function addKoala() {
  var incomingKoala = {
    name: $('#nameIn'),

  }
} // end addKoala
*/
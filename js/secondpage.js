$(function() {


    //setup crossroads
    crossroads.addRoute('foo');
    crossroads.routed.add(console.log, console); //log all routes
    
    //setup hasher
    function parseHash(newHash, oldHash){
        crossroads.parse(newHash);
    }
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change

    query = window.location.search;
    urlParam = new URLSearchParams(query);
    var id = urlParam.get('id');

    console.log(id);

    $.ajax({ 
        type: "GET", 
        url: "https://kerbau.odaje.biz/getstaff.php", 
        data: "",
        cache: false, 
        success: function(datareceived){ 
         //instructions to execute when the ajax call is succeeds 
            var newData = JSON.parse(datareceived);
            var textOutput = "";

            for (let i = 1; i < newData.length; i++) {
                if (i == id) { //jika sama dengan id yang diminta, set info jadi seperti dibawah:
                    //dapatkan setiap element dalam newData
                    
                    const element = newData[i];
                // console.log(element +" aaaaaa");

                    //dapatkan setiap data daripada getstaff.php
                    var empno = JSON.parse(element).employeeNumber;
                    var firstName = JSON.parse(element).firstName;
                    var lastName = JSON.parse(element).lastName;
                    var officeCode = JSON.parse(element).officeCode;
                    var extension = JSON.parse(element).extension;
                    var email = JSON.parse(element).email;
                    var jobTitle = JSON.parse(element).jobTitle;
                    var reportsTo = JSON.parse(element).reportsTo;

                    //masukkan dalam output
                    textOutput = "<tr><td>Employee Number</td> <td>"+empno+"</td></tr>"
                                +"<tr><td>Firstname</td> <td>"+firstName+"</td></tr>"
                                +"<tr><td>Lastname</td> <td>"+lastName+"</td></tr>"
                                +"<tr><td>OfficeCode</td> <td>"+officeCode+"</td></tr>"
                                +"<tr><td>Phone Extension</td> <td>"+extension+"</td></tr>"
                                +"<tr><td>Email Address</td> <td>"+email+"</td></tr>"
                                +"<tr><td>Job Title</td> <td>"+jobTitle+"</td></tr>"
                                +"<tr><td>Reports To</td> <td>"+reportsTo+"</td></tr>";
                }
            }

            //set html tbody berdasarkan output
            $('#maintable tbody').html(textOutput);
        }, 
        error: function(error){ 
        //instructions to execute when the ajax call is failed 
            console.log(`Error ${error}`);
            //error code untuk bagitahu ada error
            alert("ERROR TRYING TO ACCESS GETSTAFF.PHP")
           
        } 
        });
})
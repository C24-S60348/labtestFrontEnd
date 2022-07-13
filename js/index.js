$(function(){
        
        

    //setup crossroads
    crossroads.addRoute('foo');
    crossroads.addRoute('lorem/ipsum');
    crossroads.routed.add(console.log, console); //log all routes
    
    //setup hasher
    function parseHash(newHash, oldHash){
        crossroads.parse(newHash);
    }
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change
    
    //update URL fragment generating new history record
    //  hasher.setHash('lorem/ipsum');

    //var myID = "";
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
                //dapatkan setiap element dalam newData
                const element = newData[i];

                //JANGAN LUPA COMMENTTTTTTTTTTT
                //dapatkan email attribute dalam element.
                var email = JSON.parse(element).email;

                textOutput = textOutput + "<tr><td>"+i+"</td> <td>"+
                                "<a href='secondpage.html?id="+i+"'>"+ email +"</a></td> </tr>"
                
            }

            $('#maintable tbody').html(textOutput);
        }, 
        error: function(error){ 
        //instructions to execute when the ajax call is failed 
            console.log(`Error ${error}`);
            //error code untuk bagitahu ada error
            alert("ERROR TRYING TO ACCESS GETSTAFF.PHP")
        } 
        });

        //send data
        //localStorage.setItem("myID", myID);
})
"use strict";

 var registration = {
     
     allMembers : [], 
     allId : [],
     counter : 0,
     textModalCounter : 0,
     counterNoMember : 0,
     vailidId : 0,
     
     
     init:function(e){
        e.preventDefault();
        
        var allMembersList = document.getElementById("allMembers");
        
        allMembersList.onclick = function(){
            
               if(registration.textModalCounter === 1){
                registration.deleteContent();
                }
                
            var modal = document.getElementById("modal");
        
            var div= document.createElement("div");
            div.id ="modalcontent";
        
            modal.appendChild(div);
        
            var modalcontent = document.getElementById("modalcontent");
                
            var h2 = document.createElement("h2");
            
            var texth2 = document.createTextNode("Medlemslista");
            h2.appendChild(texth2);
    
            modalcontent.appendChild(h2);
            
           
            for( var i = 0; i < registration.allMembers.length; i += 1){
                
                if(registration.allMembers.length > 1 || registration.allMembers[i].firstName !== ""){   
                    
                    registration.AllmembersContent(registration.allMembers[i].firstName,registration.allMembers[i].lastName,registration.allMembers[i].phoneNumber,i,modalcontent);
                }
            }
            
            if(registration.allMembers.length <=1){}
            var ok = document.createElement("button");
            ok.id ="ok";
            var oktext =document.createTextNode("OK");
        
            ok.appendChild(oktext);
            modalcontent.appendChild(ok);
        
            modal.style.visibility = "visible";
         
            var okclick = document.getElementById("ok");
            if(registration.allMembers.length <= 1){
                
                okclick.style.bottom = "0";
            }
         
            okclick.onclick=function(){
                
                modal.style.visibility = "hidden";
                
            };
            registration.textModalCounter = 1;
        }; 
        
        
        var name = document.getElementById("name");
        var lastname = document.getElementById("lastname");
        var phoneNumber = document.getElementById("number");
            
        phoneNumber.onblur = function(){
                
            var replace = phoneNumber.value.replace(/-/g," ");
        
            var phoneNumberCorrect =  replace.split(" ").join("");
                
            phoneNumber.value = phoneNumberCorrect;
                
        }; 
        
        var newMember = document.getElementById("newMember");
         
        newMember.onclick = function(){
           
           if(name.value.trim() === "" || lastname.value.trim() === "" || phoneNumber.value.trim() === ""){
               
                alert("Alla fält måste vara ifyllda innan registrering kan ske!");
                
           }else{
           
                registration.allMembers.push({firstName: name.value, lastName: lastname.value, phoneNumber: phoneNumber.value}); 
            
                registration.allId[registration.counter] = registration.allMembers.length - 1;
           
                registration.memberContent(name.value, lastname.value,phoneNumber.value, registration.allId[registration.counter]);
            
            
                registration.counter += 1;
                name.value = "";
                lastname.value = "";
                phoneNumber.value = "";
           }
        };
         
        var search= document.getElementById("search");
         
        search.onblur = function(){
            
            var content = search.value;
            
            if(content !== ""){
                
                if(content < registration.allId.length){
                  
                    if(registration.allMembers[content].firstName === ""){
                        
                        registration.noMember();
             
                    }else{
               
                        registration.validId = 1;
                    }
                    
                }else{
                    
                   registration.noMember();
                }
                
            }else{
                
                    if(registration.counterNoMember === 1){
                        
                        registration.deletenoMember();
                    }
                }
        };
        
        var searchButton = document.getElementById("searchButton");
        searchButton.onclick = function(){
            
            if(registration.validId === 1){
                
                var content = search.value;
                registration.memberContent(registration.allMembers[content].firstName,registration.allMembers[content].lastName,registration.allMembers[content].phoneNumber,content); 
                search.value = "";
                
                registration.validId = 0;
                
                if(registration.counterNoMember === 1){
                     registration.deletenoMember();
                }
            }
          
        };
    },

    memberContent:function(name, lastname, phonenumber, id){
        
        if(registration.textModalCounter === 1){
            registration.deleteContent();
        }
        
        var modal = document.getElementById("modal");
        
        var div= document.createElement("div");
        div.id ="modalcontent";
        
        modal.appendChild(div);
        
        var modalcontent = document.getElementById("modalcontent");
        
        var h2 = document.createElement("h2");
            
        var texth2 = document.createTextNode("Medlem");
        h2.appendChild(texth2);
    
        modalcontent.appendChild(h2);
        
        var h31= document.createElement("h3");
        var h3text1 =document.createTextNode("Förnamn");
        
        var h32 = document.createElement("h3");
        var h3text2 =document.createTextNode("Efternamn");
        
        var h33 = document.createElement("h3");
        var h3text3 =document.createTextNode("Telefonnummer");
        
        var h34 = document.createElement("h3");
        var h3text4 =document.createTextNode("Id-nummer");
        
        var p1 = document.createElement("p");
        var ptext1 =document.createTextNode(name);
        
        var p2 = document.createElement("p");
        var ptext2 =document.createTextNode(lastname);
        
        var p3 = document.createElement("p");
        var ptext3 =document.createTextNode(phonenumber);
        
        var p4 = document.createElement("p");
        var ptext4 =document.createTextNode(id);
        
        h31.appendChild(h3text1);
        h32.appendChild(h3text2);
        h33.appendChild(h3text3);
        h34.appendChild(h3text4);
        
        p1.appendChild(ptext1);
        p2.appendChild(ptext2);
        p3.appendChild(ptext3);
        p4.appendChild(ptext4);
        
        modalcontent.appendChild(h31);
        modalcontent.appendChild(p1);
        modalcontent.appendChild(h32);
        modalcontent.appendChild(p2);
        modalcontent.appendChild(h33);
        modalcontent.appendChild(p3);
        modalcontent.appendChild(h34);
        modalcontent.appendChild(p4);
        
        var ok = document.createElement("button");
        ok.id ="ok";
        var oktext =document.createTextNode("OK");
        
        ok.appendChild(oktext);
        modalcontent.appendChild(ok);
        
        modal.style.visibility = "visible";
         
        var okclick = document.getElementById("ok");
         
        okclick.onclick=function(){
             modal.style.visibility = "hidden";
         
        };
        
        registration.textModalCounter = 1;
    },
    
    deleteContent:function(){
        
        var modalcontent = document.getElementById("modalcontent");
        modalcontent.parentNode.removeChild(modalcontent);
        
        registration.textModalCounter = 0;
    },
    
    noMember:function(){
        
        if(registration.counterNoMember === 1){
            
                registration.deletenoMember();
        }
        
        var div = document.createElement("div");
        div.id = "noMember";
        
        var p = document.createElement("p");
        var text =document.createTextNode("Ingen medlem finns med detta Id!");
        
        p.appendChild(text);
        div.appendChild(p);
        
        var search = document.getElementById("search");
      
        search.parentNode.insertBefore(div,search.nextSibling);
        registration.counterNoMember = 1;
    },
    
    deletenoMember: function(){
        
        var noMemberContent = document.getElementById("noMember");
        
        noMemberContent.parentNode.removeChild(noMemberContent);
        registration.counterNoMember = 0;
    },
    
    AllmembersContent:function(name, lastname, phonenumber, id, modalcontent){
        
        var h3 = document.createElement("h3");
        var h3text =document.createTextNode("Medlem nummer - " + (id + 1));
        h3.appendChild(h3text);
        h3.setAttribute('class', 'medlemnr');
        modalcontent.appendChild(h3);
        
        var p1 = document.createElement("p");
        var p1text = document.createTextNode("Förnamn: " + name);
        p1.appendChild(p1text);
        
        var p2 = document.createElement("p");
        var p2text = document.createTextNode("Efternamn: " + lastname);
        p2.appendChild(p2text);
        
        var p3 = document.createElement("p");
        var p3text = document.createTextNode("Telfonnummer: " + phonenumber);
        p3.appendChild(p3text);
        
        var p4 = document.createElement("p");
        var p4text = document.createTextNode("Id-nummer: " + id);
        p4.appendChild(p4text);
        
        modalcontent.appendChild(p1);
        modalcontent.appendChild(p2);
        modalcontent.appendChild(p3);
        modalcontent.appendChild(p4);
              
    },
    
 };
 
window.onload = registration.init;

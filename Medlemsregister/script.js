"use strict";

 var registration = {
     
    allMembers : [], 
    allId : [],
    counter : 0,
    textModalCounter : 0,
    counterNoMember : 0,
    vailidId : 0,
    memberNumber : 1,
     
    init:function(e){
        e.preventDefault();
        
        var allMembersList = document.getElementById("allMembers");
        
        allMembersList.onclick = function(){
            
            if(registration.textModalCounter === 1){
                registration.deleteContent();
            }
                
            registration.memberNumber = 1;
            var modal = document.getElementById("modal");
            
            var div= document.createElement("div");
            div.id ="modalcontent";
            modal.appendChild(div);
                    
            var h2 = document.createElement("h2");
            var texth2 = document.createTextNode("Medlemslista");
            h2.appendChild(texth2);
            
            var modalcontent = document.getElementById("modalcontent");
            modalcontent.appendChild(h2);
                
                for( var i = 0; i < registration.allMembers.length; i += 1){
                    
                    if(registration.allMembers.length > 0 && registration.allMembers[i].firstName !== ""){   
                        
                        registration.AllmembersContent(registration.allMembers[i].firstName,registration.allMembers[i].lastName,registration.allMembers[i].phoneNumber,i,modalcontent);
                    }
                }
                
           
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
                         registration.validId = 0;
             
                    }else{
               
                        registration.validId = 1;
                    }
                    
                }else{
                    
                   registration.noMember();
                   registration.validId = 0;
                }
                
            }else{
                
                if(registration.counterNoMember === 1){
                        
                    registration.deletenoMember();
                    registration.validId = 0;
                }
            }
        };
        
        var searchButton = document.getElementById("searchButton");
        searchButton.onclick = function(){
            
            if(registration.validId === 1){
                
                var content = search.value;
                registration.memberContent(registration.allMembers[content].firstName,registration.allMembers[content].lastName,registration.allMembers[content].phoneNumber,content); 
                
                if(registration.counterNoMember === 1){
                     registration.deletenoMember();
                }
                
                search.value = "";
            }
            
        };
          
        var changeButton = document.getElementById("changeButton");
        changeButton.onclick = function(){
            
            if(registration.validId === 1){
                
                var content = search.value;
                registration.changeMembersContent(registration.allMembers[content].firstName,registration.allMembers[content].lastName,registration.allMembers[content].phoneNumber,content);
                
                if(registration.counterNoMember === 1){
                     registration.deletenoMember();
                }
                
                search.value = "";
            }
            
        };
        
        var deleteButton = document.getElementById("deleteButton");
        
          deleteButton.onclick = function(){
            
            if(registration.validId === 1){
                
                var content = search.value;
                registration.deleteMember(registration.allMembers[content].firstName,registration.allMembers[content].lastName,registration.allMembers[content].phoneNumber,content);
                
                if(registration.counterNoMember === 1){
                     registration.deletenoMember();
                }
                
                search.value = "";
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
        
        var h2 = document.createElement("h2");
        var texth2 = document.createTextNode("Medlem");
        h2.appendChild(texth2);
        
        var modalcontent = document.getElementById("modalcontent");
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
        var h3text =document.createTextNode("Medlem nummer - " + registration.memberNumber);
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
        
        registration.memberNumber += 1;
              
    },
    
    changeMembersContent:function(firstname, lastname, phonenumber, id){
        if(registration.textModalCounter === 1){
            registration.deleteContent();
        }
        
        var modal = document.getElementById("modal");
        
        var div= document.createElement("div");
        div.id ="modalcontent";
        
        modal.appendChild(div);
        
        var modalcontent = document.getElementById("modalcontent");
        
        var h2 = document.createElement("h2");
        var h2text =document.createTextNode("Medlem - id: " + id);
        h2.appendChild(h2text);
        modalcontent.appendChild(h2);
        
        var h31 = document.createElement("h3");
        var h31text = document.createTextNode("Förnamn");
        var t1 = document.createElement("textarea");
        t1.id = "t1";
        t1.setAttribute('rows', 1);
        t1.value = firstname; 
        h31.appendChild(h31text);
        
        var h32 = document.createElement("h3");
        var h32text = document.createTextNode("Efternamn");
        var t2 = document.createElement("textarea");
        t2.id = "t2";
        t2.setAttribute('rows', 1);
        t2.value = lastname; 
        h32.appendChild(h32text);
        
        var h33 = document.createElement("h3");
        var h33text = document.createTextNode("Telfonnummer");
        var t3 = document.createElement("textarea");
        t3.id = "t3";
        t3.setAttribute('rows', 1);
        t3.value = phonenumber; 
        h33.appendChild(h33text);
        
        modalcontent.appendChild(h31);
        modalcontent.appendChild(t1);
        modalcontent.appendChild(h32);
        modalcontent.appendChild(t2);
        modalcontent.appendChild(h33);
        modalcontent.appendChild(t3);
         
        var ok = document.createElement("button");
        ok.id ="ok";
        var oktext =document.createTextNode("Spara ändringar");
        
        ok.appendChild(oktext);
        modalcontent.appendChild(ok);
        
         var no = document.createElement("button");
        no.id ="no";
        var notext =document.createTextNode("Avbryt");
        
        no.appendChild(notext);
        modalcontent.appendChild(no);
        
        modal.style.visibility = "visible";
        
        var okclick = document.getElementById("ok");
        okclick.style.bottom = "0";
        
        var t1content = document.getElementById("t1");
        var t2content = document.getElementById("t2");
        var t3content = document.getElementById("t3");
         
        okclick.onclick=function(){
                if(t1content.value.trim() === "" || t2content.value.trim() === "" || t3content.value.trim() === ""){
               
                alert("Alla fält måste vara ifyllda!");
                
           }else{
           
                var replace = t3content.value.replace(/-/g," ");
        
                var phoneNumberCorrect =  replace.split(" ").join("");
                t3content.value = phoneNumberCorrect;
                
                registration.allMembers[id].firstName = t1content.value;
                registration.allMembers[id].lastName = t2content.value;
                registration.allMembers[id].phoneNumber = t3content.value;
            
                modal.style.visibility = "hidden";
           }
        };
        
        var noclick = document.getElementById("no");
        noclick.style.bottom = "0";
         
        noclick.onclick=function(){
             modal.style.visibility = "hidden";
         
        };
        
        registration.textModalCounter = 1;
    },
    
    deleteMember:function(name, lastname, phonenumber, id){
        
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
        var oktext =document.createTextNode("Ta bort medlem");
        
        ok.appendChild(oktext);
        modalcontent.appendChild(ok);
        
        var no = document.createElement("button");
        no.id ="no";
        var notext =document.createTextNode("Avbryt");
        
        no.appendChild(notext);
        modalcontent.appendChild(no);
        
        modal.style.visibility = "visible";
         
        var okclick = document.getElementById("ok");
         
        okclick.onclick=function(){
            
            registration.allMembers[id].firstName = "";
            registration.allMembers[id].lastName = "";
            registration.allMembers[id].phoneNumber = "";
            modal.style.visibility = "hidden";
         
        };
        
        var noclick = document.getElementById("no");
         
        noclick.onclick=function(){
             modal.style.visibility = "hidden";
         
        };
        
        registration.textModalCounter = 1;
    }
    
 };
 
window.onload = registration.init;

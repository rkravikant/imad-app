
/*var button=document.getElementById('counter');


button.onclick = function() {      
                             
                             var request = new XMLHttpRequest();
                                 
                                  request.onreadystatechange = function(){
                                    
                                       if(request.readyState===XMLHttpRequest.DONE){
                                        
                                            if(request.status===200){
                                        
                                              var counter = request.responseText; 
                                             
                                             var span = document.getElementById('count');
                                              span.innerHTML = counter.toString();
                                            }
                                        }
                                    };
                        request.open('GET', 'http://ravikantvermahbti.imad.hasura-app.io/counter', true);
                        request.send(null);
};

*/



/*
var submit = document.getElementById('submit');
submit.onclick = function() {      
                             
                             var request = new XMLHttpRequest();
                                 
                                  request.onreadystatechange = function(){
                                    
                                       if(request.readyState===XMLHttpRequest.DONE){
                                        
                                            if(request.status===200){
                                        
                                              var names = request.responseText;
                                              names=JSON.parse(names);
                                              var list='';
                                              
                                              for(var i=0;i<names.length;i++)
                                              list+='<li>' +names[i]+ '</li>';
                                             
                                             var ul = document.getElementById('namelist');
                                              ul.innerHTML = list;
                                            }
                                        }
                                    };
                                    
                                    var nameinput = document.getElementById('name');
                                             var name=nameinput.value;
                        request.open('GET', 'http://ravikantvermahbti.imad.hasura-app.io/submit-name?name='+name, true);
                        request.send(null);
};

*/
/*
var submit1 = document.getElementById('submit-btn1');
submit1.onclick = function(){      
                             
                             var request = new XMLHttpRequest();
                                 
                                  request.onreadystatechange = function(){
                                    
                                       if(request.readyState===XMLHttpRequest.DONE){
                                        
                                            if(request.status===200){
                                        alert('signup succes');
                                            }
                                            else 
                                                 if(request.status===500){
                                        alert('some thing wrong on server side');
                                            }
                                        }
                                    };
                                    
                                    var username = document.getElementById('username').value;
                                    var password = document.getElementById('password').value;
                                    
                                    console.log(username);
                                    console.log(password);
                                             
                        request.open('POST', 'http://ravikantvermahbti.imad.hasura-app.io/signup', true);
                        request.setRequestHeader('Content-Type','application/json');
                        request.send(JSON.stringify({username: username,password: password}));
};

*/

var submit2 = document.getElementById('submit-btn2');
submit2.onclick = function() {      
                             
                             var request = new XMLHttpRequest();
                                 
                                  request.onreadystatechange = function(){
                                    
                                       if(request.readyState===XMLHttpRequest.DONE){
                                        
                                            if(request.status===200){
                                        alert('login succes');
                                            }
                                            else 
                                                 if(request.status===403){
                                        alert('un/p not matched');
                                            }
                                            else 
                                                 if(request.status===500){
                                        alert('some thing wrong on server side');
                                            }
                                        }
                                    };
                                    
                                    var username = document.getElementById('username').value;
                                    var password = document.getElementById('password').value;
                                    
                                    console.log(username);
                                    console.log(password);
                                             
                        request.open('POST', 'http://ravikantvermahbti.imad.hasura-app.io/login', true);
                        request.setRequestHeader('Content-Type','application/json');
                        request.send(JSON.stringify({username: username,password: password}));
};


var button=document.getElementById('counter');

button.onclick = function()
{
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function()
                                    {
                                        if(request.readystate===XMLHttpRequest.DONE)
                                        {
                                            if(request.status===200)
                                            {
                                             counter = request.responseText;
                                             var span = document.getElementById('span');
                                              span.innerHTML = counter.toString();
                                            }
                                        }
                                    };

request.open('GET','http://ravikantvermahbti.imad.hasura-app.io/counter',true);
request.send(null);

};

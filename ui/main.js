var button=document.getElementById(button);

var counter=0;

button.onclick = function()
{
    

counter=counter+1;
var span = document.getElementById(span);
span.innerHTML = counter.toString();
};

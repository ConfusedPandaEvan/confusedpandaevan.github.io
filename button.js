
// When the user scrolls down 20px from the top of the document, show the button This has been implemented from W3School
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let mybutton = document.getElementById("myBtn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}

// When the mouse goes over the Up Button, the color changes
window.onload = function(){
    element = document.getElementById('myBtn');
element.addEventListener("mouseover",function(){
    let red = document.getElementById("Up1");
    red.style.display="none";
    let orange = document.getElementById("Up2")
    orange.style.display="block";
});
// When the mouse goes out of the Up Button, the color changes back to normal
element.addEventListener("mouseout",function(){
    let red = document.getElementById("Up1");
    red.style.display="block";
    let orange = document.getElementById("Up2")
    orange.style.display="none"
})
}

// When the user clicks on the button, scroll to the top of the document This has been implemented from W3School
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
dictionary = {
    sandwich: "ساندویچ",
    burger: "برگر",
    pizza: "پیتزا",
    kebab: "کباب",
    salad: "سالاد",
    iranian: "ایرانی",
    pasta: "پاستا",
    fish: "ماهی",
    breakfast: "صبحانه",
    juice: "آبمیوه طبیعی",
    steak: "استیک",
    soup: "سوپ"
};

loadXMLDocAsynch("http://demo2469824.mockable.io/foods");

function loadXMLDocAsynch(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processXML;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

var moreFoodDiv = document.getElementById("more-food-div");

function processXML() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var xmlDoc = this.responseXML.documentElement;
            var foods = xmlDoc.children;
            moreFoodDiv.innerHTML = "";
            for (var i = 0; i < foods.length; i++) {
                var countNode = foods[i].getElementsByTagName("count")[0];
                var countNum = countNode.childNodes[0].nodeValue;
                var nameNode = foods[i].getElementsByTagName("name")[0];
                var name = nameNode.childNodes[0].nodeValue;
                if (i < 4) {
                    var imgURLNode = foods[i].getElementsByTagName("imgUrl")[0];
                    var imgURL = imgURLNode.childNodes[0].nodeValue;

                    var foodPhotoItem = document.getElementById("food-photo-items-" + (i + 1));
                    foodPhotoItem.style.backgroundImage = "url('" + imgURL + "')";
                    foodPhotoItem.getElementsByTagName("h3")[0].innerHTML = dictionary[name];
                    foodPhotoItem.getElementsByTagName("h6")[0].innerHTML = countNum + " رستوران فعال";
                } else {
                    imgURL = "";
                    createFoodElement(name);
                }
                // console.log("count: " + countNum + " ,url: " + imgURL + " ,name:" + dictionary[name] + "/n")
            }
        } else {
            window.alert("Error " + xmlhttp.statusText);
        }
    }
}

function createFoodElement(name) {
    var element = document.createElement("a");
    var divElement = document.createElement("div");
    divElement.innerHTML = dictionary[name];
    divElement.classList.add("more-food-items")
    element.appendChild(divElement);
    moreFoodDiv.appendChild(element);
}
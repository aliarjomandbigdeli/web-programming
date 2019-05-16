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
    soup: "سوپ",
    fastfood: "فست فود"
};

loadTextDocAsynch("http://demo2469824.mockable.io/best-restaurants");

function loadTextDocAsynch(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = process;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

bestRestGrid = document.getElementById("best-rest-grid");

function process() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var jsonObjStr = this.responseText;
            var jsonObj = JSON.parse(jsonObjStr);
            var restaurants = jsonObj.restaurants;
            bestRestGrid.innerHTML = "";
            for (var i = 0; i < restaurants.length; i++) {
                if (i < 3) {
                    modifyElement(i, restaurants[i].name, restaurants[i].rate, restaurants[i].numOfRates,
                        restaurants[i].address, restaurants[i].foods, restaurants[i].imgUrl);
                    // console.log("name: " + restaurants[i].name + " ,rate: " + restaurants[i].rate + " ,num of rates: " + restaurants[i].numOfRates + "/n");
                } else {
                    createRestElement(restaurants[i].name, restaurants[i].imgUrl);
                    // console.log("name: " + restaurants[i].name + " ,imgUrl: " + restaurants[i].imgUrl + "/n");
                }
            }
        } else {
            window.alert("Error " + xmlhttp.statusText);
        }
    }
}

function modifyElement(index, name, rate, numOfRates, address, foods, imgUrl) {
    var bestMonthItem = document.getElementById("best-month-item-" + (index + 1));
    var imgEle = bestMonthItem.getElementsByTagName("img")[0];
    imgEle.src = imgUrl;
    imgEle.height = 82;
    imgEle.width = 82;
    bestMonthItem.getElementsByTagName("h2")[0].innerHTML = name;
    bestMonthItem.getElementsByClassName("rate-participant")[0].innerHTML = numOfRates;
    bestMonthItem.getElementsByClassName("rate-number")[0].innerHTML = rate;
    bestMonthItem.getElementsByClassName("address")[0].innerHTML = address;
    var foodsStr = "";
    for (var i = 0; i < foods.length; i++) {
        if (i === foods.length - 1) {
            foodsStr += dictionary[foods[i]];
        } else {
            foodsStr += dictionary[foods[i]] + " &#9679;";
        }
    }
    bestMonthItem.getElementsByClassName("foods")[0].innerHTML = foodsStr;


}

function createRestElement(name, imgUrl) {
    var element = document.createElement("a");
    var divElement = document.createElement("div");
    divElement.classList.add("grid-item");
    var imgDiv = document.createElement("div");
    var imgEle = document.createElement("img");
    imgEle.src = imgUrl;
    imgEle.height = 82;
    imgEle.width = 82;
    var txtDiv = document.createElement("div");
    txtDiv.innerHTML = name;
    imgDiv.appendChild(imgEle);
    divElement.appendChild(imgDiv);
    divElement.appendChild(txtDiv);
    element.appendChild(divElement);
    bestRestGrid.appendChild(element);
}

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
    divElement.classList.add("more-food-items");
    element.appendChild(divElement);
    moreFoodDiv.appendChild(element);
}
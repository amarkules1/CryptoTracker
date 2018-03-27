import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor() { }

}
var coins = new Array();
var coinNames = new Array();
var prices = new Array();
window.onload = function(){

var username = document.getElementById("getUserFrom").innerHTML.split('(')[1];
username = username.split(')')[0];
var xhr1 = new XMLHttpRequest();
var json;
xhr1.onreadystatechange = function() {
	if(xhr1.readyState === 4 && xhr1.status === 200) {
		json = JSON.parse(xhr1.responseText);
		combine(json);
	}
};
xhr1.open('GET', '/api/cats/'+username, true);
xhr1.send();

}
var combine = function(json){
	var i = 0;
	for(i=0;i<json.length;i++){
		var thisCoin = json[i]["coin"];
		if(coins[thisCoin]!=undefined){
			if(json[i]["type"]==="Sell"){
				coins[thisCoin] -=json[i]["amount"];
			}
			else{
				coins[thisCoin] +=json[i]["amount"];
			}
			getPrice(thisCoin);
		}else{
			coinNames.push(thisCoin);
			coins[thisCoin] =json[i]["amount"];
			getPrice(thisCoin);
		}
	}
};
var getPrice = function(thisCoin){
	var xhr2=new XMLHttpRequest();
	var respond;
	xhr2.onreadystatechange = function() {
		if(xhr2.readyState === 4 && xhr2.status === 200) {
			respond = JSON.parse(xhr2.responseText);
			prices[thisCoin] = respond["USD"];
			setTable();
		}
	};
	xhr2.open('GET', 'https://min-api.cryptocompare.com/data/price?fsym='+ thisCoin +'&tsyms=USD',true);
	xhr2.send()
};
var setTable = function(){
	var tb = document.getElementById('tb');
	tb.innerHTML = "";
	coinNames.forEach(function(coin){
		var worth = coins[coin] * prices[coin];
		tb.innerHTML+="<tr><td>"+coin+"</td><td>"+coins[coin]+"</td><td>"+ worth +"</td></tr>";
	});
};
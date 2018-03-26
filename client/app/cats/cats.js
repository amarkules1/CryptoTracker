var coins;
var listedCoins;
window.onload = function{
	var table = document.getElementById('tableBody').childNodes;
	table.forEach(function(row){
		var cName = row.firstChild.innerHTML;
		if(coins[cName]){
			if(row.childNodes[3].innerHTML=="Buy"){
				coins[cName]+=row.childNodes[1].innerHTML.parseFloat
			}
			else{
				coins[cName]-=row.childNodes[1].innerHTML.parseFloat
			}
		}
		else{coins[cName]=row.childNodes[1].innerHTML.parseFloat}
	});
}
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
	listedCoins = xmlhttp.responseText
	}}
xmlhttp.open('GET', 'https://www.cryptocompare.com/api/data/coinlist/', true);
xmlhttp.send();

var coinExists = function(){
	var abbr = document.getElementById('coinName').value;
	if(listedCoins[abbr]){
		document.getElementById('coinName').style="background-color:black";
	}else{
		document.getElementById('coinName').style="background-color:red";
	}
}
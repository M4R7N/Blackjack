var kartyak = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"];

function disableButtons() {
	document.getElementById("hit").disabled = true;
	document.getElementById("stand").disabled = true;	
}
setTimeout(disableButtons, 1);

//2-10 J-Q-K-A
//C D H S
//var item = items[Math.floor(Math.random() * items.length)];

function iterifyArr(arr) {
    var cur = 0;
    arr.next = (function () { return (++cur >= this.length) ? false : this[cur]; });
    arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
    return arr;
}

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

function kartya(arr, oldal) {
	//background-image: url("PNG/red_back.png");
	//kartyak[Math.floor(Math.random() * kartyak.length)]
	
	let generalt = arr.next();
	if(generalt[0]=="1" || generalt[0] == "J" || generalt[0] == "Q" || generalt[0] == "K")
	{
		pontszamol(10, oldal);
	}
	else if(generalt[0]=="A") 
	{
		if(oldal.pont + 11 > 21) //új hozzáadáskor megnézzük, hogy mennyi pont lenne
		{ 
			oldal.pont += 1; //Ha 1-ként adjuk hozzá, akkor "nincs ász" (nincs 11 értékű ász)
		} 
		else 
		{ 
			oldal.pont += 11; //A pont kisebb mint 21, hozzáadhatjuk 11-ként
			oldal.asz++;      //És "van ász" (van 11-értékű ász), tehát növelem 1-gyel
		}
	}
	else 
	{
		let temp = generalt[0] * 1;
		pontszamol(temp, oldal);
	}
	
	var kar = 'url("PNG/' + generalt + '.png")';
	return kar;
}

function pontszamol(pluszpont, oldal) {
	if(pluszpont + oldal.pont > 21 && oldal.asz > 0) //van ászunk már, de azzal még nem haladtuk meg 21-et
	{												 //az új ponttal viszont meghaladnánk,
		oldal.pont = oldal.pont + pluszpont - 10;	 //az ászt 1 pontnak vesszük (-10)
		oldal.asz--; //(hogy ne menjen mindig át az if-en)
	}
	else //ha nincs ász, simán plusz
	{
		oldal.pont += pluszpont;
	}
}

function nullaz() {
	for(let i = 0; i < geprajz.length; i++)
	{
		geprajz[i].style.backgroundImage = "none";
		geprajz[i].style.backgroundColor = basecolor;
		emrajz[i].style.backgroundImage = "none";
		emrajz[i].style.backgroundColor = basecolor;
	}
}

//Pontszamol-t meghívjuk mindig, amikor pontot adunk hozzá.
//Megjegyezzük, hogy van-e ász.
//Ha van ász és a pont meghaladná 21-et, az ászt 1-nek számítjuk
//Meg kell nézni, hogy van-e már ász, és mindig újra kell számolni a pontokat

var randomKartyak = undefined;
var geprajz = undefined;
var emrajz  = undefined;
var gep = undefined;
var hum = undefined;
var i = undefined;
var osztokor = undefined;
var basecolor = "rgb(20,70,20)";
var savecard = undefined;
var money = undefined;
var tet = undefined;
var games = 0;
var wins = 0;
var ties = 0;

function setMoney0()
{
	money = document.getElementById("money").value = 100;
}
setTimeout(setMoney0);

function disableHand(){
	document.getElementById("hand").style.pointerEvents = "none"; 		//Ne lehessen új játékot indítani amíg tart egy
}
function enableHand(){
	document.getElementById("hand").style.pointerEvents = "auto";
}
function savemoney(){
	money = document.getElementById("money");	//Pénz
	money.value = money.value * 1; 				//Szám legyen
	tet = document.getElementById("tet");		//Tét
	tet.max = money.value;						//A max csak annyi lehessen amennyi pénzünk van
	if(tet.value * 1 > money.value * 1)			// Ha esetleg több lenne a jelenlegi tét, mint amennyink van	
	{
		tet.value = tet.max * 1;				//Actually ez csak kényelmi funckió
	}
	
	if(money.value == 0)
	{
		game_end();								
	}
}
setTimeout(savemoney, 1);


function setTet()
{
	if(tet.value*1 > tet.max *1) //Kiszűröm ha esetleg túl nagy érték jönne be
	{
		tet.value = tet.max;
	}
	else if(tet.value*1 < tet.min*1) //Vagy túl kicsi (negatív)
	{
		tet.value = tet.min;
	}
	money.value = money.value * 1 - tet.value;
}

function winpenz(mennyi)
{
	money.value = money.value * 1 + tet.value * mennyi;
}

function game_end() //Kiírjuk, hogy nincs több pénzed, letiltunk minden bevitelt, kiírjuk a statisztikákat is!
{
	disableHand();
	tet.disabled = true;
	document.getElementById("eredmeny").innerHTML += "<br>Elfogyott a pénzed!<br>Játékok száma: " + games + ". Győzelmek száma: " + wins + ". Döntetlenek száma: " + ties + ".";
	document.getElementById("eredmeny").innerHTML += "<br>Győzelmi arány: " + Math.floor(wins/games*100) +"%";
	document.getElementById("resetszoveg").innerHTML = "Új játékhoz frissítsd az oldalt!";
}

function uj_jatek()
{
	games++;
	tet.disabled = true;								//Indítás után ne változtathassuk
	setTet();											//A tétet elmentem
	disableHand();										//Új játék (pakli) letiltása
	document.getElementById("eredmeny").innerHTML = "";	//Kiürítem az eredményt (hogy nyertünk-e vagy nem)
	document.getElementById("pontszam").innerHTML = "";	//Kiürítem a pontszámot
	document.getElementById("hit").disabled = false;	//"Ütés" gomb engedélyezése
	document.getElementById("stand").disabled = false;	//"Állj" gomb engedélyezése
	randomKartyak = iterifyArr(shuffle(kartyak));		//Keverés
	geprajz = [document.getElementById("gep1"), document.getElementById("gep2"), document.getElementById("gep3"), document.getElementById("gep4"), document.getElementById("gep5"), document.getElementById("gep6"), document.getElementById("gep7")];
	emrajz  = [document.getElementById("em1"), document.getElementById("em2"), document.getElementById("em3"), document.getElementById("em4"), document.getElementById("em5"), document.getElementById("em6"), document.getElementById("em7")];
	
	nullaz(); //nullázás
	
	//objektumok, így tudjuk referenciaként továbbadni őket
	gep = {pont:0, asz:0};
	hum = {pont:0, asz:0};
	
	//
	//console.log(money);
	//
	
	i = 0;
	while(i<2)
	{
		if(i==1)
		{
			savecard = "" + kartya(randomKartyak,gep);
			geprajz[i].style.backgroundImage = 'url("PNG/red_back.png")';
			geprajz[i].style.backgroundColor = "transparent";
		}
		else 
		{
			geprajz[i].style.backgroundImage = "" + kartya(randomKartyak,gep);
			geprajz[i].style.backgroundColor = "transparent";
		}
		emrajz[i].style.backgroundImage = "" + kartya(randomKartyak,hum);
		emrajz[i].style.backgroundColor = "transparent";
		i++;
	}
	osztokor = 2;
	document.getElementById("pontszam").innerHTML = "Pontjaid: " + hum.pont;
	if(hum.pont == 21 || gep.pont == 21)
	{
		blackjack();
	}
}

function reveal()
{
	geprajz[1].style.backgroundImage = savecard;
}

function hit() //=új kártyát kérek
{
	if(i<7) {
		emrajz[i].style.backgroundImage = "" + kartya(randomKartyak,hum);
		emrajz[i].style.backgroundColor = "transparent";
		i++;
	}
	document.getElementById("pontszam").innerHTML = "Pontjaid: " + hum.pont;
	
	if(hum.pont > 21)
	{
		lose("Besokalltál!");
	}
	else if(hum.pont == 21 && gep.pont != 21)
	{
		winpenz(2);
		win("21!");
	}
	else if(hum.pont == 21 && gep.pont == 21)
	{
		winpenz(1);
		tied("Mindketten 21!");
		reveal();
	}
}

function gepHit()
{
	while(gep.pont < 17 && osztokor < 7)
	{
		geprajz[osztokor].style.backgroundImage = "" + kartya(randomKartyak,gep);
		osztokor++;
	}
}

function stand() //=nem kérek új kártyát, a gép felfedi a kártyáját, ha <17 akkor oszt magának
{
	disableButtons();
	reveal();
	
	gepHit();
	
	if(gep.pont > 21)
	{
		winpenz(2);
		win("Az ellenfél besokallt!");
	}
	else if(gep.pont == 21)
	{
		lose("Az ellenfélnek 21 pontja van!");
	}
	else if(hum.pont > gep.pont)
	{
		winpenz(2);
		win("Több pontod van!");
	}
	else if(hum.pont < gep.pont)
	{
		lose("Az ellenfélnek több pontja van!");
	}
	else 
	{
		winpenz(1);
		tied("Egyenlő pontok!");
	}
}

function win(why) 
{
	wins++;
	disableButtons();
	tet.disabled = false;
	enableHand();
	document.getElementById("eredmeny").innerHTML = "Nyertél! " + why;
	document.getElementById("pontszam").innerHTML = "Pontjaid: " + hum.pont + "<br>Ellenfél: " + gep.pont;
	savemoney();
}

function lose(why)
{
	disableButtons();
	tet.disabled = false;
	enableHand();
	document.getElementById("eredmeny").innerHTML = "Vesztettél! " + why;
	document.getElementById("pontszam").innerHTML = "Pontjaid: " + hum.pont + "<br>Ellenfél: " + gep.pont;
	savemoney();
}

function tied(why)
{
	ties++;
	disableButtons();
	tet.disabled = false;
	enableHand();
	document.getElementById("eredmeny").innerHTML = "Döntetlen! " + why;
	document.getElementById("pontszam").innerHTML = "Pontjaid: " + hum.pont + "<br>Ellenfél: " + gep.pont;
	savemoney();
}

function blackjack()
{
	if(gep.pont!=21)
	{
		winpenz(1.5);
		win("Blackjack!");
	}
	else if(hum.pont!=21)
	{
		reveal();
		lose("Ellenfél Blackjack!")
	}
	else
	{
		reveal();
		winpenz(1);
		tied("Mindketten Blackjack!");
	}
}

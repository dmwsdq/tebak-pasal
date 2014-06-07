/* this file requires uud1945.js**/

// menampilkan info dari bab

function getBab(myBab){
	return bab["info"][bab["bab"].indexOf(myBab)];
};

// menampilkan list dari sebuah key
function getListOf(myField){
	return uud[myField];
};


// menampilkan list untuk setiap key dari suatu ID
function getByID(myID){
	return {'bab':uud["bab"][myID],'pasal':uud["pasal"][myID],'ayat':uud["ayat"][myID],'amandemen':uud["amandemen"][myID],'bunyi':uud["bunyi"][myID]};
	//return [uud["bab"][myID],uud["pasal"][myID],uud["ayat"][myID],uud["amandemen"][myID],uud["bunyi"][myID]];
};

	
// true jika ayat hanya satu
function isOnlyAyat(myID){
    var dicari = uud['pasal'][myID];
    var caripada = uud['pasal'];
    var hitung = 0;
    for (var i = 0; i < caripada.length; i++){
    	if (caripada[i] === dicari){
    		hitung++;
    	};
    };
    return hitung === 1;
};


// menampilkan judul
function getJudul(myID){
	switch (uud['bab'][myID]){
		case 'PB':
			return 'Pembukaan UUD 1945 Alinea ke-'+uud['pasal'][myID];
			break;
		case 'AP':
			return 'Aturan Peralihan Pasal '+uud['pasal'][myID];
			break;
		case 'AT':
			return 'Aturan Tambahan Pasal '+uud['pasal'][myID];
			break;
	};
	if (isOnlyAyat(myID)){
		return "Pasal "+uud['pasal'][myID];
	} else {
		return "Pasal "+uud['pasal'][myID]+" ayat "+uud['ayat'][myID];
	}; 
};



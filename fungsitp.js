// GENERAL FUNCTIONS

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// to start the timer -> do startTimer(howmanysecs)
// taken from anonymous - stackoverflow
function startTimer(secs){
	count=secs;
	counter=setInterval(timer, 1000);
	return;
}
function timer(){
  count=count-1;
  if (count <= 0){
     clearInterval(counter);
     //counter ended, do something here
     $("#timer").html("0");
   	 $("#container").append("<div class='tombol' id='lanjut' onclick='displayBoard()'>LANJUT</div>"); // displayskor diganti display board
     $("#displayScreenPenalti_timer").html("");
     return;
  }
  //Do code for showing the number of seconds here
  document.getElementById("timer").innerHTML=count; 
}

// INITIALIZATION

// tanyakan nama, dan merandom soal, jawaban
function inisialisasi(){
	toastr.info('Hai! Mari main!');
	$("#container").html("");
	$("#highscores").html("");
	$("#container").append("<span align='center'> NAMA  </span> <input type='text' placeholder='Nama Kamu' id='getName_input'> <br /> <br /> <div><span class='getName_teks'>AUDIO : <span id='audio_on'></span></span>   <span class='tombol' id='getName_audiotgl'>TOGGLE</span></div> <br /> <br /> <span class='tombol' id='getName_submit'>MULAI</span>");
	$("#container").append("<br /> <br /> <div id='TEKS_INTRO'>"+TEKS_INTRO+"</div>");
	
	
	//to enable toggling between AUDIO_ON / AUDIO_OFF
	var audio_dsp;
	if(AUDIO_ON){audio_dsp = "ON";} else {audio_dsp = "OFF";}
	$('#audio_on').html(audio_dsp);
	$('#getName_audiotgl').click(function(){
		toastr.info('Dengan memilih Audio ON kamu bisa mendengarkan sebuah suara :D <br /> OFF cocok jika internetmu sangat lambat.');
		AUDIO_ON = !AUDIO_ON;
		if(AUDIO_ON){audio_dsp = "ON";} else {audio_dsp = "OFF";}
		$('#audio_on').html(audio_dsp);
	});
	
	$('#getName_submit').click(function(){
		var nama = $('#getName_input').val();
		var valid = false;
		for(i in nama){
			if('abcdefghijklmnopqrstuvwxyz'.indexOf(nama[i].toLowerCase()) > -1){
				valid = true;
				break;
			}
		}
		if(valid){
			question = makeQuestion();
    		solution = makeSolution();
			standing = makeStanding();
    		standing['nama'] = nama;
    		displayBoard();
 		} else {
			toastr.error('Nama harus mengandung huruf.');
		}
  	});
	return null;
}

// menghasilkan "lembar soal"
function makeQuestion(){
	var hasil = [];
    var temp = getListOf('id');
    shuffle(temp);
    var i = 0;
    for(var s = 0; s < N_SOAL; s++){
        hasil[s] = [];
        for(var o = 0; o < N_OPSI; o++){
            hasil[s].push(parseInt(temp[i]));
            i += 1;
        }
    }
    return hasil;
};

// menghasilkan "kunci jawaban" berupa position index
function makeSolution(){
	var hasil = [];
	for(var i = 0; i < N_SOAL; i++){
        hasil.push(Math.floor(Math.random() * N_OPSI));
    }
    return hasil;
};

// menghasilkan standing (keadaan permainan)
function makeStanding(){
	hasil = {'nama':'','urutan':0,'dijawab':[],'penalti':[],'stawar':N_OPSI*BOBOT_SKOR,'speroleh':0};
    return hasil;
};

// ANSWERING
// to clear : $(#container).html("");

// wrapper for ANSWERING display functions
function displayBoard(){
	$("#container").html("");
	displaySoal();
	displayOpsi();
	displayListPenalti();
	displaySkor();
	return null;
}

// tampilkan soal
function displaySoal(){
    var urutan = standing['urutan'];
    var correctPos = solution[urutan];
    var correctID = question[urutan][correctPos];
    var bunyi = getByID(correctID)['bunyi'];
    $("#container").append("<div id='displaySoal_judul'>Soal ke-"+(urutan+1)+"</div>");
    $("#container").append("<div id='displaySoal_bunyi'><q>"+bunyi+"</q></div>");
    $("#container").append("<div id='displaySoal_TEKS_TANYA'>"+TEKS_TANYA+"</div> <br />");
    return null;
}

//tampilkan opsi
function displayOpsi(){
	var urutan = standing['urutan'];
    var opsiOpsi = question[urutan];
    for (var pos in opsiOpsi){
    	pos = parseInt(pos);
    	if(standing['dijawab'].indexOf(pos) < 0){
    		$("#container").append("<span class='opsi' id='"+pos+"' onclick='evaluateAnswer(this.id)'>"+getJudul(opsiOpsi[pos])+"</span> <br/><br/>");
    	}
    }
    return null;
}

//tampilkan koleksi penaliti 
function displayListPenalti(){
    var penalties = standing['penalti'];
    if(penalties === []){
    	$("#container").append("<div id='displayListPenalti_empty'></div>");
    } 
    else {
    	penalties.reverse();
    	$("#container").append("<br/><div id='displayListPenalti_title'>Pilihan Sebelumnya</div>");
    	for (var i = 0; i < penalties.length; i++){
	        var uuditem = getByID(parseInt(penalties[i]));
	        $("#container").append("<span class='bab'> <span class='penaltylabel'>BAB</span><br /><span class='penaltyinfo'>"+ uuditem['bab'] +"</span></span>");
	        $("#container").append("<span class='pasal'> <span class='penaltylabel'>PASAL</span><br /><span class='penaltyinfo'>"+ uuditem['pasal'] +"</span></span>");
	        $("#container").append("<span class='ayat'> <span class='penaltylabel'>AYAT</span><br /><span class='penaltyinfo'>"+ uuditem['ayat'] +"</span></span>");
	        $("#container").append("<span class='amandemen'> <span class='penaltylabel'>AMAND.</span><br /><span class='penaltyinfo'>"+ uuditem['amandemen'] +"</span></span>");
	        $("#container").append("<div class='bunyi'> "+ uuditem['bunyi'] +"</div> <br />");
	        if((i+1) === MAX_DISPLAY_PENALTI){
	        	break;
	        }
    	}
    	penalties.reverse();
    }
    $("#container").append("<br/>");
    return null;
}

// tampilkan skor
function displaySkor(){
	$("#container").append("<div class='skor1'> <span class='skorlabel'>KESEMPATAN SKOR</span><br /><span class='skorinfo'>"+ standing['stawar'] +"</span></div>");
	$("#container").append("<div class='skor2'> <span class='skorlabel'>SKOR DIPEROLEH</span><br /><span class='skorinfo'>"+ standing['speroleh'] +"</span></div>");
	return null;
}

// EVALUATE ANSWER

// tampilkan layar kena pinalti
function displayScreenPenalti(myID){
	$("#container").html("");
	var uuditem = getByID(parseInt(myID));
	if(AUDIO_ON){
		$("#audio").html("<audio autoplay> <source src='http://tts-api.com/tts.mp3?q="+encodeURI(getJudul(myID)+" "+uuditem['bunyi'])+" type='audio/mpeg'></audio>");
    	$("#container").append("Baca dan dengarkan <br/>");
    } else {
   		$("#container").append("Baca <br/>");
    }
    $("#container").append("<div class='bab'> <span class='penaltylabel'>BAB</span><br /><span class='penaltyinfo'>"+ uuditem['bab'] +"</span></div>");
	$("#container").append("<div class='pasal'> <span class='penaltylabel'>PASAL</span><br /><span class='penaltyinfo'>"+ uuditem['pasal'] +"</span></div>");
	$("#container").append("<div class='ayat'> <span class='penaltylabel'>AYAT</span><br /><span class='penaltyinfo'>"+ uuditem['ayat'] +"</span></div>");
	$("#container").append("<div class='amandemen'> <span class='penaltylabel'>AMAND.</span><br /><span class='penaltyinfo'>"+ uuditem['amandemen'] +"</span></div>");
	$("#container").append("<div class='bunyi'> "+ uuditem['bunyi'] +"</div>");
	$("#container").append("<div id='displayScreenPenalti_timer'>Mohon tunggu <span id='timer'></span> detik...</div>");        
    startTimer(MASA_PENALTI+1);
    return null;
}

// mengevaluasi jawaban
function evaluateAnswer(answerPos){
	answerPos = parseInt(answerPos);
	var correctPos = solution[standing['urutan']];
	if (correctPos === answerPos){
		temp = standing['stawar'];
		toastr.success('BENAR! Skor sebesar '+ temp +' ditambahkan!');
		standing['speroleh'] += temp;
        standing['stawar'] = N_OPSI*BOBOT_SKOR;
        standing['penalti'] = [];
        standing['dijawab'] = [];
        standing['urutan'] += 1;
        if(isGameOver()){
        	return null;
        } else {
        displayBoard();
        }
	} else {
		toastr.error('SALAH! Tetap semangat ya! :D');
		answerID = question[standing['urutan']][answerPos];
		standing['stawar'] -= BOBOT_SKOR;
        standing['penalti'].push(answerID);
        standing['dijawab'].push(answerPos);
		displayScreenPenalti(answerID);
	}
	return null;
}

// TERMINATION

// delete for offline, you may want to change 'http://localhost/xxxx/xx.php' to your own server address :)
function xx(){
		$.ajax({
	    	type: 'POST',
	    	url: 'http://localhost/xxxx/xx.php',
	    	data: {'n':standing['nama'],'s':standing['speroleh']},
	    	success: function(msg){
	    				toastr.success('Pesan dari Server:' + msg);
	    				highScores();
	    			}
		});
		return null;
}

// delete for offline, you may want to change 'http://localhost/xxxx/highscores.php' to your own server address :)
function highScores(){
		$.ajax({
        	type: "GET",
        	data: "",
        	url: "http://localhost/xxxx/highscores.php"
    	}).done(function(data){
    		var hs = eval(data);
    		$("#highscores").append('<br/><br/>HIGHSCORES <br/><br/><table>');
			$("#highscores").append('<tr><td>   #   </td>  <td>   Nama   </td>  <td>   Timestamp   </td>  <td>   Skor   </td></tr>');
    		for (var i = 0; i < hs.length; i++){
    			$("#highscores").append('<tr>');
    			$("#highscores").append('<td>  '+(i+1)+'  </td>  <td>  '+hs[i]['n']+'  </td>  <td>  '+hs[i]['t']+'  </td>  <td>  '+hs[i]['s']+'  </td>');
    			$("#highscores").append('</tr>');
    		}
    		$("#highscores").append('</table>');
		});
        return null;
}

// apabila game over
function isGameOver(){
	if(standing['urutan'] === question.length){
		$("#container").html('');
		$("#container").append("<br/><div>SELESAI. <br/>Skor Anda: <br/>"+standing['speroleh']+" poin.</div><br/>");
		toastr.success('Wah akhirnya selesai!');
		// make unavailable at offline
		xx();
		$("#container").append("<br/><br/><span class='tombol' id='isGameOver_lagi' onclick='inisialisasi()'>LAGI</span><br/><br/>");
		return true;
	} else {
		return false;
	}
}

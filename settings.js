// edit nilai di bawah ini untuk mengubah perilaku script
var N_SOAL = 10;
var N_OPSI = 10;
var BOBOT_SKOR = 1;
var TEKS_TANYA = 'Di manakah teks di atas ditemukan dalam UUD 1945?'; 
var MAX_DISPLAY_PENALTI = N_OPSI ;
var MASA_PENALTI = 10;
var TEKS_INTRO = 'Tebak Pasal adalah permainan edukasi yang menguji hafalan anda terhadap pasal-pasal UUD 1945. <br />Anda akan dihadapkan pada '+N_SOAL+' soal. Tiap soal memiliki '+N_OPSI+' pilihan, masing-masing bernilai '+ BOBOT_SKOR +' poin. Di tiap soal, anda bisa terus memilih hingga mendapat jawaban yang benar. Namun jika salah menjawab, anda harus menunggu sambil membaca/dibacakan pasal tersebut selama '+ MASA_PENALTI +' detik sebelum bisa menjawab lagi. Enjoy! :D <br />Info: Jangan merefresh halaman ini apabila tidak ingin permainan berulang. :) <br />Kontak: dar.web.id @dmwsdq ';
var AUDIO_ON = true;

// jangan diedit
var standing;
var question;
var solution;
var count;
var counter;

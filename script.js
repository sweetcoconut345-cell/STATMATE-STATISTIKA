let currentQuestion = 0;
let score = 0;
let answered = false;
let timerInterval;
let timeLeft;
let musicStarted = false;

const questions = [

{
mission:"📊 Misi 1 - Menghitung Mean",
type:"mcq",
question:"Seorang guru mencatat nilai ujian matematika dari 5 siswa: 70, 80, 75, 90, dan 85. Nilai rata-rata (mean) yang tepat adalah...",
options:["75","80","82","85"],
answer:"80",
point:10,
time:30,
feedback:"Hebat! Mean diperoleh dengan menjumlahkan seluruh data lalu dibagi banyaknya data."
},

{
mission:"🎯 Misi 2 - Menemukan Modus",
type:"mcq",
question:"Diberikan data: 4, 7, 5, 6, 9, 7, 8, 5, 7, 10. Modus dari data tersebut adalah...",
options:["5","6","7","9"],
answer:"7",
point:10,
time:30
},

{
mission:"📏 Misi 3 - Menentukan Median",
type:"mcq",
question:"Data tinggi badan siswa: 150, 155, 148, 152, 160. Median dari data tersebut adalah...",
options:["148 cm","150 cm","152 cm","155 cm"],
answer:"152 cm",
point:10,
time:45
},

{
mission:"📈 Misi 4 - Analisis Tabel Frekuensi",
type:"mcq",
question:`
<table border="1" style="border-collapse:collapse;width:100%;text-align:center">
<tr>
<th>Nilai</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>9</th>
<th>10</th>
</tr>
<tr>
<th>Frekuensi</th>
<td>3</td>
<td>5</td>
<td>6</td>
<td>4</td>
<td>2</td>
</tr>
</table>
<br>
Berdasarkan tabel di atas, banyak siswa yang mendapatkan nilai kurang dari rata-rata adalah...
`,
options:["3 siswa","5 siswa","8 siswa","14 siswa"],
answer:"8 siswa",
point:10,
time:60
},

{
mission:"🏪 Misi 5 - Data Penjualan Toko",
type:"mcq",
question:"Penjualan kemeja selama 5 hari berturut-turut adalah 12, 15, 18, 20, dan 25 helai. Jangkauan (range) data tersebut adalah...",
options:["12 helai","13 helai","18 helai","25 helai"],
answer:"13 helai",
point:10,
time:45
},

{
mission:"🧠 Misi 6 - HOTS Challenge",
type:"mcq",
question:"Di suatu kelas yang terdiri dari 20 siswa, rata-rata nilai ujian matematika adalah 75. Jika ditambah 2 siswa baru dan rata-ratanya menjadi 76, maka rata-rata nilai kedua siswa baru tersebut adalah...",
options:["76","80","85","86"],
answer:"86",
point:15,
time:90,
feedback:"Luar biasa! Kamu berhasil menganalisis perubahan rata-rata menggunakan total nilai seluruh siswa."
},

{
mission:"✔ Misi 7 - Benar atau Salah",
type:"tf",
question:"Jika diketahui Q1 = 12 dan Q3 = 20, maka Jangkauan Interkuartil (IQR) = 8.",
answer:"Benar",
point:10,
time:30
},

{
mission:"✔ Misi 8 - Benar atau Salah",
type:"tf",
question:"Jika suatu kumpulan data memiliki nilai rata-rata 70, maka sudah pasti tidak ada nilai yang kurang dari 60.",
answer:"Salah",
point:10,
time:60
},

{
mission:"📚 Misi 9 - Kuartil Bawah",
type:"essay",
question:"Diketahui data nilai: 6, 7, 8, 5, 9, 7. Tentukan nilai Kuartil Bawah (Q1)!",
answer:"6",
point:10,
time:60
},

{
mission:"🏆 Misi 10 - Simpangan Kuartil",
type:"essay",
question:"Data survei jumlah buku yang dibaca siswa: 2, 3, 4, 2, 5, 6, 3, 4, 3. Tentukan nilai simpangan kuartilnya!",
answer:"1",
point:15,
time:90
}

];
function showStory(){

const name =
document.getElementById("playerName").value.trim();

if(name===""){
alert("Silakan masukkan nama terlebih dahulu!");
return;
}

if(!musicStarted){

const music =
document.getElementById("bgMusic");

music.volume = 0.3;

music.currentTime = 13;
music.play();

musicStarted = true;
}

document.getElementById("coverPage").style.display="none";

document.getElementById("storyPage").style.display="block";

}

function startGame(){

const name = document.getElementById("playerName").value.trim();

if(name===""){
alert("Silakan masukkan nama terlebih dahulu!");
return;
}

document.getElementById("coverPage").style.display="none";
document.getElementById("quizPage").style.display="block";

loadQuestion();

}

function loadQuestion(){

answered = false;

const q = questions[currentQuestion];

document.getElementById("missionTitle").innerHTML = q.mission;

document.getElementById("question").innerHTML = q.question;

const answersDiv = document.getElementById("answers");

answersDiv.innerHTML = "";

document.getElementById("nextBtn").style.display="none";

if(q.type==="mcq"){

q.options.forEach(option=>{

const btn = document.createElement("div");

btn.classList.add("option");

btn.innerText = option;

btn.onclick = ()=>checkAnswer(option,btn);

answersDiv.appendChild(btn);

});

}

if(q.type==="tf"){

["Benar","Salah"].forEach(option=>{

const btn = document.createElement("div");

btn.classList.add("option");

btn.innerText = option;

btn.onclick = ()=>checkAnswer(option,btn);

answersDiv.appendChild(btn);

});

}

if(q.type==="essay"){

answersDiv.innerHTML = `
<input type="text" id="essayAnswer" placeholder="Tulis jawabanmu">
<br><br>
<button onclick="checkEssay()">Kirim Jawaban</button>
`;

}

updateProgress();
startTimer();

}

function checkAnswer(selected,element){
if(answered) return;

answered=true;

const q = questions[currentQuestion];

const options = document.querySelectorAll(".option");

options.forEach(opt=>{

if(opt.innerText===q.answer){
opt.classList.add("correct");
clearInterval(timerInterval);
}

if(opt.innerText===selected && selected!==q.answer){
opt.classList.add("wrong");
}

});

if(selected===q.answer){

score += q.point;

if(q.feedback){
alert(q.feedback);
}else{
alert("✅ Jawaban Benar!");
}

}else{

if(currentQuestion===0){
alert("❌ Kurang tepat. Ingat, mean diperoleh dari jumlah seluruh data dibagi banyak data.");
}else if(currentQuestion===5){
alert("❌ Kurang tepat. Coba hitung total nilai sebelum dan sesudah penambahan siswa.");
}else{
alert("❌ Jawaban kurang tepat.");
}
}

document.getElementById("nextBtn").style.display="inline-block";

}

function checkEssay(){
if(answered) return;

answered=true;

const q = questions[currentQuestion];

let input = document.getElementById("essayAnswer").value.trim();

if(input===q.answer){

score += q.point;

alert("✅ Jawaban Benar!");

}else{

alert("❌ Jawaban kurang tepat.\nJawaban yang benar: "+q.answer);
clearInterval(timerInterval);

}

document.getElementById("nextBtn").style.display="inline-block";

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}else{

showResult();

}

}

function updateProgress(){

const percent = ((currentQuestion)/questions.length)*100;

document.getElementById("progressBar").style.width = percent+"%";

}

function showResult(){
    saveResult();

    document.getElementById("bgMusic").pause();

document.getElementById("quizPage").style.display="none";

document.getElementById("resultPage").style.display="block";

const studentName = document.getElementById("playerName").value;

document.getElementById("studentName").innerHTML =
"👨‍🎓 "+studentName;

document.getElementById("finalScore").innerHTML =
"Skor Akhir: <strong>"+score+"</strong> dari 110";

let grade="";

if(score>=100){

grade="🏆 Ahli Statistika";

}else if(score>=85){

grade="🥇 Peneliti Data";

}else if(score>=70){

grade="🥈 Pengamat Data";

}else{

grade="📚 Perlu Latihan Lagi";

}

document.getElementById("finalGrade").innerHTML =
"Predikat: <strong>"+grade+"</strong>";

document.getElementById("progressBar").style.width="100%";

}

function startMission(){

document.getElementById("storyPage").style.display="none";

document.getElementById("quizPage").style.display="block";

loadQuestion();

}

function startTimer(){

clearInterval(timerInterval);

timeLeft = questions[currentQuestion].time;

document.getElementById("timer").innerText =
timeLeft;

timerInterval = setInterval(()=>{

timeLeft--;

document.getElementById("timer").innerText =
timeLeft;

if(timeLeft <= 0){

clearInterval(timerInterval);

alert("⏰ Waktu habis!");

document.getElementById("nextBtn").style.display =
"inline-block";

answered = true;

}

},1000);

}

async function saveResult(){

console.log("saveResult dijalankan");

const data = {
nama: document.getElementById("playerName").value,
skor: score,
predikat: getGrade()
};

try{

await fetch("https://script.google.com/macros/s/AKfycbw0giRsQb6ImnLOoFTe0yIuxXH7DVVfFON9QpP2P4rBH9EaS7KCpDvPBvKgOYoMXUw/exec",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

console.log("fetch berhasil");

}catch(error){

console.error(error);

}

}

function hitungMean(){

    let data =
        document
        .getElementById("inputMean")
        .value
        .split(",")
        .map(Number);

    let jumlah = 0;

    data.forEach(function(nilai){
        jumlah += nilai;
    });

    let mean = jumlah / data.length;

    document.getElementById("hasilMean")
        .innerHTML =
        "Mean = " + mean;
}

function simulasiMedian(){

    let data =
        document
        .getElementById("inputMedian")
        .value
        .split(",")
        .map(Number);

    data.sort(function(a,b){
        return a-b;
    });

    document.getElementById(
        "hasilUrut"
    ).innerHTML =
        "Data terurut: "
        + data.join(", ");

    let median;

    if(data.length % 2 == 1){

        median =
            data[
                Math.floor(
                    data.length/2
                )
            ];

    }else{

        let tengah1 =
            data[
                data.length/2 -1
            ];

        let tengah2 =
            data[
                data.length/2
            ];

        median =
            (tengah1+tengah2)/2;
    }

    document.getElementById(
        "hasilMedian"
    ).innerHTML =
        "Median = "
        + median;
}

function hitungModus(){

    let data =
        document
        .getElementById("inputModus")
        .value
        .split(",")
        .map(Number);

    let frekuensi = {};

    data.forEach(function(nilai){

        if(frekuensi[nilai]){
            frekuensi[nilai]++;
        }
        else{
            frekuensi[nilai] = 1;
        }

    });

    let modus = "";
    let terbesar = 0;

    for(let angka in frekuensi){

        if(frekuensi[angka] > terbesar){

            terbesar = frekuensi[angka];
            modus = angka;

        }

    }

    document.getElementById(
        "hasilModus"
    ).innerHTML =
        "Modus = " + modus;

    let teks = "";

    for(let angka in frekuensi){

        teks +=
            angka +
            " muncul " +
            frekuensi[angka] +
            " kali <br>";
    }

    document.getElementById(
        "frekuensiData"
    ).innerHTML = teks;

    buatDiagram(frekuensi);
}

function buatDiagram(frekuensi){

    let container =
        document.getElementById(
            "diagramContainer"
        );

    container.innerHTML = "";

    for(let angka in frekuensi){

        let bar =
            document.createElement("div");

        bar.className = "bar";

        bar.style.width =
            (frekuensi[angka] * 80) + "px";

        bar.innerHTML =
            angka +
            " (" +
            frekuensi[angka] +
            ")";

        container.appendChild(bar);
    }
}

const soal = [

{
    pertanyaan:
    "Rata-rata dari 5, 7, dan 9 adalah ...",
    pilihan:
    ["5","6","7","8"],
    jawaban:2,
    pembahasan:
    "(5+7+9)/3 = 7"
},

{
    pertanyaan:
    "Median dari 2,4,6,8,10 adalah ...",
    pilihan:
    ["4","5","6","8"],
    jawaban:2,
    pembahasan:
    "Nilai tengah adalah 6."
},

{
    pertanyaan:
    "Modus dari 4,5,5,6,7 adalah ...",
    pilihan:
    ["4","5","6","7"],
    jawaban:1,
    pembahasan:
    "Angka 5 paling sering muncul."
}

];

let nomor = 0;
let skor = 0;
let jawabanUser = [];

function tampilSoal(){

    pilihanUser = -1;

    if(nomor >= soal.length){
        selesai();
        return;
    }

    document.getElementById(
        "nomorSoal"
    ).innerHTML =
        "Soal " + (nomor+1);

    document.getElementById(
        "pertanyaan"
    ).innerHTML =
        soal[nomor].pertanyaan;

    let html = "";

    soal[nomor]
    .pilihan
    .forEach(function(
        pilihan,index){

        html +=
        `
        <div
        class="opsi"
        onclick="pilih(${index})">

        ${pilihan}

        </div>
        `;
    });

    document.getElementById(
        "pilihan"
    ).innerHTML =
        html;
}

let pilihanUser = -1;

function pilih(index){

    pilihanUser = index;

    const semuaOpsi =
        document.querySelectorAll(".opsi");

    semuaOpsi.forEach(function(item){
        item.classList.remove("terpilih");
    });

    if(semuaOpsi[index]){
        semuaOpsi[index]
            .classList.add("terpilih");
    }
}

function cekJawaban(){

    if(pilihanUser === -1){
        alert("Pilih jawaban terlebih dahulu!");
        return;
    }

    let semuaOpsi =
        document.querySelectorAll(".opsi");

    if(
        pilihanUser ==
        soal[nomor].jawaban
    ){

        semuaOpsi[pilihanUser]
            .classList.add("benar");

        skor += 100/soal.length;

    }else{

        semuaOpsi[pilihanUser]
            .classList.add("salah");

        semuaOpsi[
            soal[nomor].jawaban
        ].classList.add("benar");
    }

    setTimeout(function(){

        nomor++;
        updateProgress();
        tampilSoal();

    },1000);
}

function updateProgress(){

    let persen =
        (nomor/soal.length)*100;

    document
    .getElementById(
        "progressBar"
    )
    .style.width =
        persen + "%";
}

let detik = 600;

setInterval(function(){

    let menit =
        Math.floor(detik/60);

    let sisa =
        detik%60;

    document
    .getElementById(
        "waktu"
    )
    .innerHTML =
        menit + ":" +
        String(sisa)
        .padStart(2,"0");

    detik--;

    if(detik < 0){
        selesai();
    }

},1000);

function selesai(){

    document
    .querySelector(
        ".latihan-container"
    )
    .style.display =
        "none";

    document
    .getElementById(
        "hasilAkhir"
    )
    .style.display =
        "block";

    document
    .getElementById(
        "nilaiAkhir"
    )
    .innerHTML =
        "Nilai Kamu : "
        + Math.round(skor);

    let pembahasan = "";

    soal.forEach(function(
        item,index){

        pembahasan +=
        `
        <p>
        ${index+1}.
        ${item.pembahasan}
        </p>
        `;
    });

    document
    .getElementById(
        "pembahasan"
    )
    .innerHTML =
        pembahasan;
}

if(document.getElementById("pertanyaan")){
    tampilSoal();
}
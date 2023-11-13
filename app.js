
//* INPUTLAR

const gelirInput = document.querySelector("#gelir-input")
const harcamaAlani = document.querySelector("#harcama-alani")
const tarih = document.querySelector("#tarih")
const miktar = document.querySelector("#miktar")

//*  BUTONLAR

const ekleBtn = document.querySelector("#ekle-btn")
const kaydet = document.querySelector("#kaydet")
const temizleBtn = document.querySelector("#temizle-btn")
const sonucGoster = document.querySelector(".sonuc-goster")


//* TEXTCONTENTLER

let geliriniz = document.querySelector("#geliriniz")
let gideriniz = document.querySelector("#gideriniz")
let kalan = document.querySelector("#kalan")

//* TABLOLAR

const harcamaBody = document.querySelector("#harcama-body")
console.log(harcamaBody);



//* Hesap İşlemleri
let miktarToplam = 0;

//* LOCAL TANIMLAMA
// localStorage.setItem("geliriniz",0)




//?     **********  TIKLAMA OLAYLARI  **********   ////


//* EKLE BUTONUNA TIKLANDIĞINDA

ekleBtn.addEventListener("click", (e)=>{

    e.preventDefault();

        // formun varsayılan ayarlarına dönmesini engeller.

    //* LOCALSTORAGE İŞLEMLERİ


        let gelirValue = gelirInput.value
        if(isNaN(gelirValue)){
            alert("lütfen bir sayı giriniz")
        }
        else{
            localStorage.setItem("geliriniz",gelirInput.value);
            geliriniz.textContent = gelirValue;
        }
});


//* KAYDETE TIKLANDIĞINDA

kaydet.addEventListener("click", (e)=>{

        e.preventDefault()
        satirOlustur()
        harcamaAlaniHesapla()
        sil()



        // localStorage.set("harcamaBody",)
})


//* TEMİZLEYE TIKLANDIĞINDA

temizleBtn.addEventListener("click", ()=>{

    console.log("is clicked");
  
    geliriniz.textContent = 0;
    gideriniz.textContent = 0;
    kalan.textContent = 0;
    localStorage.clear();
    window.location.reload()
    localStorage.getItem("geliriniz",0)

})



//?   *********** WINDOW ***********

// WINDOW ONLOAD

window.onload = function() {
    let gelirStorage = localStorage.getItem("geliriniz",0)
    geliriniz.textContent = gelirStorage;
    console.log(gelirStorage);
    
    yourSpendLocal()
};



//?    *********   FONKSİYONLAR   *********


//* SATIR OLUŞTURMA FONKSİYONU

let spendList = [];

const satirOlustur = (tarihS=tarih.value, harcamaAlaniS=harcamaAlani.value,miktarS=miktar.value)=>{

           
            // satır oluştur
            let tr = document.createElement("tr")
            harcamaBody.appendChild(tr)
            tr.setAttribute("class", "yeniSatir")
            // harcamaBody.textContent = harcamaAlani.value
            

            // sütunları oluştur
            let tdTarih = document.createElement("td")
            tr.appendChild(tdTarih)
            tdTarih.textContent = tarihS;
            console.log(tarih);
            

            let tdHarcamaAlani = document.createElement("td")
            tr.appendChild(tdHarcamaAlani)
            tdHarcamaAlani.textContent = harcamaAlaniS
            console.log(harcamaAlani.value);


            let tdMiktar = document.createElement("td")
            tr.appendChild(tdMiktar)
            tdMiktar.setAttribute("class","tdMiktarC")
            tdMiktar.textContent = miktarS

            // Bu da hesaplar...
            // gider += Number(miktar.value)
            // console.log(gider);
            // gideriniz.textContent = gider;
         
    
            let tdIslem = document.createElement("td")
            tr.appendChild(tdIslem)
            let copI = document.createElement("i")

            // birden fazla class ekleme
            copI.setAttribute('class', 'fa-solid fa-trash')
            copI.setAttribute('style', 'font-size:1.5rem; color:red')
            // copI.style.color = "red";
            tdIslem.appendChild(copI)
            copI.style.cursor= "pointer"
            copI.style.color=" rgb(27, 171, 27)"


            // LOCAL STORAGE ASSIGN STEP
            let lineObject = {
                tarih: tarih.value,
                harcamaAlani: harcamaAlani.value,
                miktar: miktar.value
            }

            spendList.push(lineObject)
            
            localStorage.setItem("yourSpend", JSON.stringify(spendList)) || []
            // return spendList;



//    console.log(harcamaAlani);

   // miktarları çekmek için fonksiyon çağırıldı. 
   harcamaAlaniHesapla() 
   return;
   
}



// //* HESAPLAMA FONKSİYONU

const harcamaAlaniHesapla = () =>{

            let gelir = geliriniz.textContent

            let tumMiktarlar =  [...harcamaBody.querySelectorAll(".tdMiktarC")]

            console.log(tumMiktarlar);

            miktarToplam = tumMiktarlar.reduce((sum, item) =>sum + Number(item.textContent),0);


            gideriniz.textContent = miktarToplam;
            console.log(miktarToplam);

            let kalanD = gelir - miktarToplam
            kalan.textContent = kalanD;
            return miktarToplam;


            // local storage


            // let harcamaVerileri = [...harcamaBody.querySelectorAll(".yeniSatir")] 
            // console.log(harcamaVerileri);
   
                               
    
}


//* SİLME FONKSYİONU

function sil() {
    harcamaBody.addEventListener("click", (e)=>{

        console.log(e.target);
    
        //* * * * * * *SİLME İŞLEMİ* * * * * *
    
        if(e.target.classList.contains("fa-trash")){

            // let mktr = e.target.closest(".tdMiktarC");
             e.target.closest(".yeniSatir").remove();
             harcamaAlaniHesapla()
      
        }
  
    
    })


    
}




//* LOCAL FONKSİYONU

const yourSpendLocal = () =>{
    
    
    spendList = JSON.parse(localStorage.getItem("yourSpend", spendList)) || [];
    console.log(spendList);

    if(spendList){
        spendList.forEach(item =>{

            if(item.tarih){
               satirOlustur(item.tarih, item.harcamaAlani, item.miktar)
                console.log(satirOlustur); 
            }
            
        })
    }

   harcamaAlaniHesapla()
   sil()
   
}



//* GÖSTERE TIKLANDIĞINDA

sonucGoster.addEventListener("click",()=>{

     // bugün itibariyle birikimi yazdır. 
     let newDate = new Date().getFullYear()
     console.log(newDate);

     let newDate2 = new Date();
     // ayı çek
     let ayIsimleri = [
         "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
         "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
       ];

       let bulundugumuzAy = ayIsimleri[newDate2.getMonth()+1];

    console.log("is clicked");
    Swal.fire({
    title: "Toplam Birikim",
    text: `${newDate} yılı ${bulundugumuzAy} ayına ait toplam birikim tutarınız ${kalan.textContent} 'tl'dir. `,
    color: `white`,
    width: 600,
    padding: "3em",
    color: "#fff8dc",
    background: "url(money-cash.gif)",
    backdrop: `
            
            url("/images/nyan-cat.gif")
            left top
            no-repeat
                        `
                      });
                })




    








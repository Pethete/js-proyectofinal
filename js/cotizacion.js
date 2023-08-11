function ajax(){
    const url = "http://data.fixer.io/api/latest?access_key=f3a17844f6b64984b84432874a2bc98e&format=1";
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("uru").innerHTML = data.rates.UYU;
                document.getElementById("dolar").innerHTML = data.rates.USD;
                document.getElementById("argen").innerHTML = data.rates.ARS;
                document.getElementById("bras").innerHTML = data.rates.BRL;
            }
        };
        xhr.send();
}   
ajax();
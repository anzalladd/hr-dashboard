export default class Helper { 
    gettanggal(val) {
        var bulanIndo = [
          "-",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Juni",
          "Juli",
          "Agust",
          "Sept",
          "Okt",
          "Nov",
          "Des",
        ];
  
        var date = val.split(" ")[0];
  
        var tanggal = date.split("-")[2];
        var bulan = date.split("-")[1];
        var tahun = date.split("-")[0];
  
        return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
      } 
    getRupiah(val) {
        var bilangan = val;
  
        if (bilangan == 0 || bilangan == "0") {
          return "Rp. 0,-";
        }
        if (bilangan) {
          var number_string = bilangan.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);
  
          if (ribuan) {
            var separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
          }
  
          return "Rp. " + rupiah;
        }
      }
    checkMandatory(datapost, type){
      var result = true;

      if(type == 'object'){
        for (const property in datapost) {
          // console.log(`${property}: ${datapost[property]}`);
          if (datapost[property].toString().length > 0) {
            result = true;
            // console.log(`${property}: ${datapost[property].length}`);
          } else {
            result = false + property + datapost[property];
            break;
          }
        }
      }else if(type == 'string'){
        if (datapost.length > 0) {
          result = true;
        } else {
          result = false;
        }
      }else{
        result = false;
      }
      return result;
    }
}

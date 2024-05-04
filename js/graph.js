
var g = new Chart(document.getElementById("myChart"),{"type":"line","data":data,"options":{}});

//
// var index = 0;
// var country = ["India","China"];
// var type = "death_per_day";
//
// function next_push(){
//   if(getat(deaths_per_day_raw_data,"India",index)!= undefined){
//     data["labels"].push(index);
//     country.forEach((i) => {
//       const d = getat(deaths_per_day_raw_data,i,index);
//       (data["datasets"].find(element => element["label"] == i))["data"].push(d);
//     });
//
//
//     g.update();
//     index++;
//     setTimeout(next_push,1000);
//   }else{
//     console.log("Finished");
//   }
// }
//
// function getat(data,country,index){
//   const out = data.find(element => element.country_name == country);
//   if(out != undefined ){
//     return out.data[index][1];
//   }else{
//     console.log("Undefined country or no data.")
//   }
// }
//
// function get(data_name,country_name){
// }

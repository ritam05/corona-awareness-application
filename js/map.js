var map_colors =
  [
     {"cases": 10,"color" :"#D5D8DC"},
     {"cases": 100 ,"color":"#EC7063" },
     {"cases": 200,"color": "#C0392B"},
     {"cases": 400,"color": "#A93226"},
     {"cases": 800,"color": "#7B241C"},
     {"cases": 1600,"color": "#641E16"}
  ]

var state_id_mapping =
    [
      {"state": "Andaman and Nicobar Islands","id":"IN-AN"},
      {"state": "Andhra Pradesh","id":"IN-AP"},
      {"state": "Arunachal Pradesh","id":"IN-AR"},
      {"state": "Assam","id":"IN-AS"},
      {"state": "Bihar","id":"IN-BR"},
      {"state": "Chandigarh","id":"IN-CH"},
      {"state": "Chhattisgarh","id":"IN-CT"},
      {"state": "Delhi","id":"IN-DL"},
      {"state": "Dadra and Nagar Haveli","id":"IN-DN"},
      {"state": "Goa","id":"IN-GA"},
      {"state": "Gujarat","id":"IN-GJ"},
      {"state": "Himachal Pradesh","id":"IN-HP"},
      {"state": "Haryana","id":"IN-HR"},
      {"state": "Jharkhand","id":"IN-JH"},
      {"state": "Jammu and Kashmir","id":"IN-JK"},
      {"state": "Karnataka","id":"IN-KA"},
      {"state": "Kerala","id":"IN-KL"},
      {"state": "Lakshadweep","id":"IN-LD"},
      {"state": "Maharashtra","id":"IN-MH"},
      {"state": "Meghalaya","id":"IN-ML"},
      {"state": "Manipur","id":"IN-MN"},
      {"state": "Madhya Pradesh","id":"IN-MP"},
      {"state": "Mizoram","id":"IN-MZ"},
      {"state": "Nagaland","id":"IN-NL"},
      {"state": "Odisha","id":"IN-OR"},
      {"state": "Punjab","id":"IN-PB"},
      {"state": "Puducherry","id":"IN-PY"},
      {"state": "Rajasthan","id":"IN-RJ"},
      {"state": "Sikkim","id":"IN-SK"},
      {"state": "Telangana","id":"IN-TG"},
      {"state": "Tamil Nadu","id":"IN-TN"},
      {"state": "Tripura","id":"IN-TR"},
      {"state": "Uttar Pradesh","id":"IN-UP"},
      {"state": "Uttarakhand","id":"IN-UT"},
      {"state": "West Bengal","id":"IN-WB"}
    ]

var raw_state_data = null;
var raw_district_data =null;
var state_count = [];

function dataFetched()
{
  process_raw_data();
  updateCounters();
  state_count.pop(); //Removes unknown data
  console.log(state_count);
  colorGraph();
  setupModal();
}

function process_raw_data()
{

  raw_state_data["data"]["statewise"].forEach(state_data =>
    {
      var confirmed = state_data["confirmed"];
      var recovered = state_data["recovered"];
      var active = state_data["active"];
      var deaths = state_data["deaths"];
      var data = {"state":state_data["state"],"color":getColor(confirmed),"state_id":getStateIDFromName(state_data["state"]),"confirmed":confirmed,"deaths":deaths,"active":active,"recovered":recovered};
      state_count.push(data);
    });
}

function getStateIDFromName(name)
{
  var state  =  state_id_mapping.find( state => state["state"] == name)
  if(state != undefined){
    return state["id"];
  }else{
    return null;
  }
}

function getColor(count)
{
  if(count>=0 && count<10){
    return "#D5D8DC"
  }
  if(count>=10 && count<100){
    return "#EC7063"
  }
  if(count>=100 && count<200){
    return "#C0392B"
  }
  if(count>=200 && count<400){
    return "#A93226"
  }
  if(count>=400 && count<800){
    return "#7B241C"
  }
  if(count>=800 && count<1600){
    return "#641E16"
  }
  return "#FF0000"

}


function colorGraph(){
  $("document").ready(()=>
    {
      state_count.forEach(state =>
        {
          var state_id = "#"+state["state_id"];
          var state_color = state["color"];
          console.log(state_id);
          $(state_id).attr('style',`fill: ${state_color} !important`);
        });
    });
}

function setupModal()
{

}
function stateClick(state_id)
{
  var state_name = state_id_mapping.find(state => state["id"] == state_id)["state"];
  modalHandle(state_name);
}

function districtDataFetched(){}

function getCases(state_name)
{

  var confirmed = state_count.find(state => state["state"] == state_name)["confirmed"];
  var recovered = state_count.find(state => state["state"] == state_name)["recovered"];
  var deaths = state_count.find(state => state["state"] == state_name)["deaths"];
  var active = state_count.find(state => state["state"] == state_name)["active"];
  return {
      "confirmed":confirmed,
      "recovered":recovered,
      "deaths":deaths,
      "active":active
    }

}

function modalHandle(state_name)
{
    console.log("CLICKED ON "+state_name);
    var cases = getCases(state_name);
  var content =
  `
  <div class="modal-header">
      <h2 class="modal-title">${state_name}</h5>
      <button type="button" class="fechar_hover close" data-dismiss="modal">&times;</button>
  </div>
  <div class="modal-body">
  <h3> Confirmed Cases : ${cases["confirmed"]}  </h3>
  <h3> Active Cases : ${cases["active"]}  </h3>
  <h3> Recovered Cases : ${cases["recovered"]}  </h3>
  <h3> Deaths : ${cases["deaths"]}  </h3>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

  </div>
  `
  $("#statePopUpContent").html(content);
  $("#statePopUp").modal("show");

}

function updateCounters(){
  $("#totalCases").html(raw_state_data["data"]["total"]["confirmed"]);
  $("#recovered").html(raw_state_data["data"]["total"]["recovered"]);
  $("#deaths").html(raw_state_data["data"]["total"]["deaths"]);
}

fetch("https://api.covid19india.org/v2/state_district_wise.json")
  .then(response => response.json())
  .then(d => {
    raw_district_data= d;
    districtDataFetched();
  });
fetch("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise")
    .then(response => response.json())
    .then(d => {
      raw_state_data= d;
      dataFetched();
  });

/*
imports varible lineGraphData
*/

class lineGraph{
  /* AVAILABLE VARIABLES
  graph
  index
  data
  date
  speed
  */
  /* AVAILABLE FUNCTIONS
    distroy() : deletes instance of a graph
  */


  /*Create New graph with basic scafold*/
  constructor(elID,raw_data,graphDataType,selectedCountries,progressType)
  {
    this.graphDataType =graphDataType;
    this.progressType = progressType;
    this.lineGraphData =
      {
        "labels":[],
        "datasets":[]
      };
      this.speed=300;
      this.data = [];
    selectedCountries.forEach(country =>
      {

        var color = raw_data.find(c => c["country"] == country)["color"];
        var colorString = "rgb("+color["r"]+","+color["g"]+","+color["b"]+")";
        var countryData =
          {
            "country": country ,
            "index":0,
            "rgbColor":colorString,
            "data":[],
          }
        countryData["data"] =  raw_data.find(el => el["country"] == country)[graphDataType];
        this.data.push(countryData);
        console.log(this.data)
        var countryGraphData =
          {
            "label" : country,
            "data" : [],
            "borderColor": colorString,
            "fill":false,
            "lineTension" : 0.1
          }
        this.lineGraphData["datasets"].push(countryGraphData);
      });
      this.graph = new Chart(document.getElementById(elID),{"type":"line","data":this.lineGraphData,"options":{}});
  } //constructor ends
  distroy(){
    this.graph.destroy();
  }
  initAnimation()
  {
    if(this.progressType=="date")
    {
      this.index = 0;
      this.runAnimation()
    }else
    { //Progress by index
      this.setIndex();
    }
  }
  runAnimation()
  {
    if(this.areMoreFrames()){
      if(this.progressType == "date" ){
        this.updateByDate();
      }
      console.log(this.areMoreFrames());
      setTimeout(()=>{
        this.runAnimation();
      }, this.speed);
    }
  }
  areMoreFrames()
  {
    if(this.progressType=="date")
    {
      this.data.forEach( country =>
        {
          console.log(country)
          if(this.index >= country["data"].length){
            return false;
          }
        });
        return true;
    }else if(areMoreFramesprogressType == "index")
    {

    }else
    {
      return false;
    }
  }
  stopAnimation()
  {

  }
  updateByIndex()
  {

  }
  updateByDate()
  {

    var do_once = true;
    this.data.forEach(country =>
      {
        if(do_once){
          console.log(country["data"][this.index]["date"]);
          this.lineGraphData["labels"].push(country["data"][this.index]["date"]);
          do_once = false;
        }
        var d = country["data"][this.index]["data"];
        this.lineGraphData["datasets"].find(d => d["label"] == country["country"])["data"].push(d);
      });
    this.index++;
    this.graph.update();
  }
  setIndex()
  {

  }

}

var lgraph = null;
var type= "totalDeaths";
// function dataFetched(){
//   lgraph = new lineGraph("lineGraph",data,"totalDeaths",selectedCountries,"date");
// }

function setType(t){
  type = t;
}
function getID(name){
  if(name == "United Kingdom"){
    return "#UK";
  }
  if(name == "Korea, South"){
    return "#southKorea";
  }
  return "#"+name;
}

function start()
{
  selectedCountries = [];
  availableCountries.forEach(c =>
    {
      if($(getID(c)).is(":checked")){
        selectedCountries.push(c);
      }
    });
  if(lgraph !=  null ){
    lgraph.distroy();
    lgraph = null;
  }
  availableStates.forEach(c =>
    {
      if($("#"+c).is(":checked")){
        selectedCountries.push(c);
      }
    });

  console.log(type);
  lgraph = new lineGraph("lineGraph",data,type,selectedCountries,"date");
  lgraph.initAnimation();
}

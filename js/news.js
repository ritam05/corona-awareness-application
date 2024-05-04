var raw_news=null;

fetch("/news/raw.json")
  .then(response => response.json())
  .then(d => {
    raw_news = d;
    populateNews();
  });


function news(title,author,url,img,date,desc){
  return `<div class="col-md-6 col-lg-6 mb-4 mb-lg-4">
         <div class="h-entry">
           <a href="${url}"><img src="${img}" alt="${title}" class="img-fluid"></a>
           <div class="h-entry-inner">
             <h2 class="font-size-regular"><a href="${url}">${title}</a></h2>
             <div class="meta mb-4">by ${author} <span class="mx-2">•</span> ${date}</div>
             <p>${desc}</p>
           </div>
         </div>
       </div>`
}
var news_counter = 0;
function populateNews(){

  for(var i=0;i<6 && i<raw_news["totalResults"];i++)
  {
    var n = raw_news["articles"][i];
    $("#news").append(news(n["title"],n["source"]["name"],n["url"],n["urlToImage"],n["publishedAt"],n["description"]));
    news_counter++;
  }

}
function moreNews()
{
  console.log("More News");
  for(var i=news_counter; i<raw_news["totalResults"];i++)
  {
    var n = raw_news["articles"][i];
    $("#news").append(news(n["title"],n["source"]["name"],n["url"],n["urlToImage"],n["publishedAt"],n["description"]));
    news_counter++;
  }
}

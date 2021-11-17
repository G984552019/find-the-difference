const APPLICATION_KEY = "eb484faf117f19cdd9129b8f6605911c639196ee078731182a102a198acc107d";
const CLIENT_KEY = "d94735d2d6e3c602d2a8d98735a4664b94518526838ec0695821c9ab86625054";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "Scores";

let Scores = ncmb.DataStore(DBName);

let timer = null;
const max = 3;
let count = 1;
let value;
let highScore;
let eTime;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}


function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i=0; i<size*size; i++) {
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" + i);
    s.addEventListener("click", function() {
      if (this.textContent == q[qNum][1]) {
        //alert("正解");
        correct.play();
        if (count != max) {
          count++;
          while (cells.firstChild) {
            cells.removeChild(cells.firstChild);
          }
          gameStart();
        } else {
          clearTimeout(timer);
          //save
          let test = new Scores();
          let key = "time";
          test.set(key, eTime);
          test.save()
          .then(function(){
            console.log("成功");
          })
          .catch(function(err){
            console.log("エラー発生: " + err);
          });
          //load
          Scores
          .order("time")
          .fetchAll()
          .then(function(results){
            if(results[0].time >= eTime) {
              alert(eTime + "秒　ハイスコアです！！");
            }

          })
          .catch(function(err){
            console.log("エラー発生: " + err);
          });
        }
      } else {
        wrong.play();
      }
    });
    cells.appendChild(s);
    if (i % size == size - 1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  eTime = parseInt((now.getTime() - start.getTime()) / 1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}

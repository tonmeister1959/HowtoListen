// Define some variables__________

window.addEventListener('storage', event => console.log(event.key));
var audioContext = new AudioContext()
var previousbutton = null
var correctanswer
var myanswer = ""
var NumberofCorrectAnswers = 0
var TrialsCompleted = 0
var TotalTrials = 10
var dbincrement = canvas.height / 30
var NumberofBands = 2
var FilterTypes = "peaking"  // default values
var Qfactor = 1  // default values
var GainindB = 6  // default values
const centerFreq = [];
var NumberofButtons = 0
document.getElementById("canvas").style.width = "600px"
var canvasContent = canvas.getContext('2d')
canvasContent.width = "600px"
const data = [
  //{ Trial: 0, NumberofBands: 0, CorrectBand: 0, MyAnswer: 0 }
];

var starttime = Date.now()
var LevelPercentage = 0  // have to achieve 80% in a level to advance
var MinimumTrials = 0 // to to at least complete 5 trials to advance
var CorrectAnswersInLevel = 0
//componentDidMount()
CorrectFilterFrequency = 0
const Freq = [];
Freq[0] = 20
Freq[1] = 50
Freq[2] = 100
Freq[3] = 200
Freq[4] = 500
Freq[5] = 1000
Freq[6] = 2000
Freq[7] = 5000
Freq[8] = 10000
Freq[9] = 20000

var nFreqs = 1000; // This defines the resolution of the frequency response; note that they are linearly spaced
Freqs = new Float32Array(nFreqs),
  Mags = new Float32Array(nFreqs),
  Phases = new Float32Array(nFreqs)

for (var i = 0; i < nFreqs; ++i) Freqs[i] = 20000 / nFreqs * (i + 1)
var biquadFilter = new BiquadFilterNode(audioContext)
var CurrentFilter = "Peaking"

//****** Create Buttons that Correspond to Filters on Graphs that Users Click */
function CreateButtons(x, y, BandNumber) {
  const newButton = document.createElement('button');
  var currentbutton
  //console.debug (x)
  //newButton.style.zIndex = "5"
  newButton.style.position = "absolute"

  newButton.style.top = y
  newButton.style.left = x
  newButton.style.width = 35
  newButton.style.height = 35
  newButton.innerText = BandNumber
  newButton.id = "Button" + BandNumber

  newButton.addEventListener('click', function (e) {


    this.style.backgroundColor = 'green'

    myanswer = this.innerText
    handleclick(this.id)

  })

  document.body.appendChild(newButton)
NumberofButtons = NumberofButtons + 1
  myanswer = ""

}
function handleclick(buttonclicked) {
  //console.debug (buttonclicked.left)

  if (previousbutton == null) {
    previousbutton = buttonclicked
  }
  else {
    const elem = document.getElementById(previousbutton)
    elem.style.backgroundColor = ""
    //console.debug ('previous button clicked ') + previousbutton.id
    previousbutton = buttonclicked
    //console.debug (previousbutton)
  }
}
///******* Draw Frequency Graph on Canvas */
function DrawScale() {
  canvasContent.strokeStyle = 'black'
  canvasContent.setLineDash([1, 2])
for (let j = 0; j < 10; ++j) {
    var a = (Math.log(Freq[j] / 20)) / Math.log(2) * 30 //28// 30.10299957
    //a = a *
    // console.log(a) +  "  " + Freq[j]
    canvasContent.beginPath()
    canvasContent.moveTo(a, 0)
    canvasContent.lineTo(a, 300)  /// draws the vertical lines on the graph
    //canvasContentContent.beginPath()
    canvasContent.stroke()
  }
}

//************* Draw Filters on Graph*************  */
function DrawFilters(NumberofBands, Qfactor, GainindB, FilterTypes) {
  var NumberOctaves = 9.97
  var previousX = 0
  var previousY = 0
  var Number = 1
  canvasContent.beginPath
  canvasContent.clearRect(0, 0, 300, 600)

  alert (NumberofBands + "  " + Qfactor + "  " + GainindB + "  " + FilterTypes) 


  for (let index = 0; index < NumberofBands; index++) {
    centerFreq[index] = 25 * 2 ** (9.97 * Number / (NumberofBands * 2))
    Number = Number + 2
  
    biquadFilter.frequency.value = centerFreq[index]
    console.debug(centerFreq[index])
    biquadFilter.Q.value = Qfactor
    biquadFilter.gain.value = GainindB
    biquadFilter.type = FilterTypes
    console.debug(biquadFilter.type)
    biquadFilter.getFrequencyResponse(Freqs, Mags, Phases)

    //const half = canvasContent.height / 2
    canvasContent.strokeStyle = 'blue'
    canvasContent.setLineDash([0, 0])
    canvasContent.beginPath()

      // Draws the magnitude response of the filter
for (let i = 0; i < nFreqs; ++i) {
      x = (Math.log(Freqs[i] / 20)) / Math.log(2) * 30// 30.10299957
      x = x  // left of CanvasContent
      var magtodB = 10 * Math.log10(Mags[i])
      //console.debug (magtodB)

      var y = (magtodB * 10)  // 
      y = 70 - y
      canvasContent.moveTo(previousX, previousY)
      console.debug(x+ '  ' + y)
      canvasContent.lineTo(x, y)
      canvasContent.stroke()
      previousX = x
      previousY = y

    }

  }

  for (let i = 0; i < NumberofBands; ++i) {
    x = (Math.log(centerFreq[i] / 20)) / (Math.log(2)) * 60 //30.10299957
    x = x + 80// +35 offset 
    y = 10 // (canvas.height/ 30 ) //dbincrement 
    y = 200 - (GainindB * y)  // 0 dB - GainFactor * dbincrement

    //console.debug (x + '  ' + y)
  
    CreateButtons(x, y, i + 1) // Create buttons for each band to click on
    myanswer = ""
  }

  canvasContent.strokeStyle = 'black'

  const rand1 = Math.floor(Math.random() * NumberofBands)
  //console.debug (rand1)
  var x = canvasContent.left
  var y = canvasContent.top

  biquadFilter.frequency.value = centerFreq[rand1]
  CorrectFilterFrequency = biquadFilter.frequency.value
  correctanswer = rand1 + 1
  canvasContent.beginPath()
 
canvasContent.position = "absolute"
}




function SwitchEQ(WhichOne) {

  // user clicked on EA
  if (WhichOne == 0) {
    //alert ("EQ")
    flat.style.backgroundColor = ""
    eq.style.backgroundColor = "green"
    Done.style.backgroundColor = ""
    biquadFilter.type = FilterTypes
  }

  // User clicked on FLAT
  if (WhichOne == 1) {
    flat.style.backgroundColor = "green"
    eq.style.backgroundColor = ""
    Done.style.backgroundColor = ""
    biquadFilter.type = "allpass"
  }
  // User Clicked on DONE
  if (WhichOne == 2) {
    if (myanswer == "") {
      alert("please select your band by clicking on the appropriate button")
      return WhichOne
    }
    audioContext.suspend()
    flat.style.backgroundColor = ""
    eq.style.backgroundColor = ""
    Done.style.backgroundColor = "green"

    // Give feedback on answers
    if (myanswer == correctanswer) {
      var EndTime = Date.now()
      alert('You are correct! The Band is: ' + correctanswer + ' ( ' + Math.round(CorrectFilterFrequency) + ' Hz )')
      CorrectAnswersInLevel = CorrectAnswersInLevel + 1
      MinimumTrials = MinimumTrials + 1

      LevelPercentage = (CorrectAnswersInLevel / MinimumTrials) * 100
      NumberofCorrectAnswers = NumberofCorrectAnswers + 1
      TrialsCompleted = TrialsCompleted + 1

      Trials.innerText = "Trials: " + TrialsCompleted //+ " of " + TotalTrials
      var percentage = NumberofCorrectAnswers / TrialsCompleted * 100


      correct.innerText = "Correct Answers: " + percentage + " %"
    } else {
      var EndTime = Date.now()
      alert('Sorry, the correct answer is: Band ' + correctanswer + ' ( ' + Math.round(CorrectFilterFrequency) + ' Hz )')
      TrialsCompleted = TrialsCompleted + 1
      var percentage = NumberofCorrectAnswers / TrialsCompleted * 100


      Trials.innerText = "Trials: " + TrialsCompleted// + " of " + TotalTrials
      correct.innerText = "Correct Answers: " + (percentage.toFixed(1)) + " %"


    }
    // Start Next Trial

    var responsetime = (EndTime - starttime) / 1000
    //alert (responsetime)
    data.push({ Trial: TrialsCompleted, NumberofBands: NumberofBands, CorrectBand: correctanswer, MyAnswer: myanswer, CorrectFreq: Math.floor(CorrectFilterFrequency), MyFreq: Math.floor(centerFreq[myanswer - 1]), ResponseTimeinSec: responsetime })
    generateTable(data)

    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data);
    //previousanswer = null

RemoveButtons()
    if (LevelPercentage >= 80 && MinimumTrials >= 5) {
     NumberofBands = NumberofBands + 1
      console.debug(NumberofBands)
      MinimumTrials = 0
      LevelPercentage = 0
      CorrectAnswersInLevel = 0
      MinimumTrials = 0
    }
    else {



    }
    
    
    DrawFilters(NumberofBands, Qfactor, GainindB, FilterTypes)
    DrawScale()
    previousbutton = null
    flat.style.backgroundColor = ""
    eq.style.backgroundColor = "green"
    Done.style.backgroundColor = ""
    myanswer = ""
    audioContext.resume()



    starttime = Date.now()
  }
}

function generateTable(data) {
  let table = '<table>';


  table += '<tr><th>Trial</th><th>NumberofBands</th><th>CorrectBand</th><th>MyAnswer</th><th>CorrectFreq</th><th>MyFreq</th><th>Response time (s)</th></tr>';
  data.forEach(item => {
    table += `<tr><td>${item.Trial}</td><td>${item.NumberofBands}</td><td>${item.CorrectBand}</td><td>${item.MyAnswer}</td><td>${item.CorrectFreq}</td><td>${item.MyFreq}</td><td>${item.ResponseTimeinSec}</td></tr>`;
  });
  table += '</table>';
  return table;
}








start.onclick = () => {
  //alert (sessionStorage.getItem("Task"))
  audioContext.resume()
  //source.stop
  let source = new AudioBufferSourceNode(audioContext, { loop: true })
  let nFrames = audioContext.sampleRate
  source.buffer = audioContext.createBuffer(1, nFrames, audioContext.sampleRate)
  for (i = 0; i < nFrames; i++) source.buffer.getChannelData(0)[i] = 2 * Math.random() - 1
  source.connect(biquadFilter).connect(audioContext.destination)
  source.start()
  //start.style.visibility = "hidden"

  console.debug(sessionStorage.getItem("NumberofBands"))
  console.debug(sessionStorage.length)
  alert (sessionStorage.getItem("Task") + " " + sessionStorage.getItem("Filter") + " " + sessionStorage.getItem("Q") + " " + sessionStorage.getItem("Gain") + " " + sessionStorage.getItem("Program") + " " + sessionStorage.getItem("Skill"))


  if (sessionStorage.getItem("Filter") !== null) {
   NumberofBands = sessionStorage.getItem("Skill")
    NumberofBands = Number(NumberofBands)
    Qfactor = sessionStorage.getItem("Q")
    GainindB = sessionStorage.getItem("Gain")
    FilterTypes = sessionStorage.getItem("Filter")

  }
  //alert(  'starting skill'  + " " + sessionStorage.getItem("Skill"))
  RemoveButtons()
  DrawFilters(NumberofBands, Qfactor, GainindB, FilterTypes)
  DrawScale()
  eq.style.backgroundColor = "green"


}
function loadmenu() {
  document.getElementById("menu").innerHTML = '<object type="text/html" data = "http://localhost/HowtoListen/CurtainMenu.html" style="width:100%; height:100%;overflow:visible;" ></object>'

  //Document.getElementById("menu").style.display="block" 
  menu.style.display = "block"

}
function openNav() {
  document.getElementById("myNav").style.height = "70%";

}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";

}

function NextTrial() {

  closeNav()

}
function RemoveButtons() {
  
  if (NumberofButtons > 0) {
    for (let index = 1; index <= NumberofButtons; index++) {
      var elem = document.getElementById('Button' + index);
      console.debug(elem.parentNode.nodeName);
      elem.parentNode.removeChild(elem);
      
    }
   
  }
  NumberofButtons = 0
}
  

window.onstorage = (event) => {
  console.log(event.key) //returns the modified key
  console.log(event.oldValue) //returns the old value of a modified key
  console.log(event.newValue) //returns the new value of a modified key
  console.log(event.url) //the url of the document where the change occurred
  console.log(event.storageArea) //the localStorage object itself
}
const url = new URL(window.location.href);
const name = url.searchParams.get('name');



function closeMe()
{
  window.close
}
window.addEventListener(
  "message",
  (event) => {
    alert ("Message received: " + event.data);
//document.getElementById('start').click() 

    if (event.origin !== "http://localhost:80") return;
    //event.source.postMessage(
   // "hi there yourself! the secret response " + "is: rheeeeet!")
    window.close();

  }
    )





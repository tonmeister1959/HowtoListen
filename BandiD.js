// Define some variables__________
var audioContext = new AudioContext()
var previousbutton = null
var correctanswer
var myanswer = ""
var NumberofCorrectAnswers = 0
var TrialsCompleted = 0
var TotalTrials = 10
var dbincrement = canvas.height /30
var NumberofBands = 2
const centerFreq = [];

document.getElementById("canvas").style.width = "600px"
var canvasContent =  canvas.getContext('2d')
canvasContent.width = "600px"
//console.debug (document.getElementById("canvas").style.width)


const data = [  
  //{ Trial: 0, NumberofBands: 0, CorrectBand: 0, MyAnswer: 0 }
  ]; 

var starttime = Date.now()
var LevelPercentage = 0  // have to achieve 80% in a level to advance
var MinimumTrials = 0 // to to at least complete 5 trials to advance
var CorrectAnswersInLevel = 0
//componentDidMount()
CorrectFilterFrequency = 0
const Freq= [];
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





var canvasContent = canvas.getContext('2d')
//console.debug(document.getElementsByName('canvasContent').style.width)


var nFreqs = 2000; // This defines the resolution of the frequency response; note that they are linearly spaced
    Freqs = new Float32Array(nFreqs),
    Mags = new Float32Array(nFreqs),
    Phases = new Float32Array(nFreqs)

for (var i=0;i<nFreqs;++i) Freqs[i] = 20000/nFreqs*(i+1)
var biquadFilter = new BiquadFilterNode(audioContext,{frequency:1000,Q:1,gain:1})
var CurrentFilter = "Peaking"

//****** Create Buttons that Correspond to Filters on Graphs that Users Click */
function CreateButtons(x,y,BandNumber) {
  const newButton = document.createElement('button');
  var currentbutton
 console.debug (x)
//newButton.style.zIndex = "1"
  newButton.style.position = "absolute"
  newButton.style.top = y
  newButton.style.left = x
newButton.style.width = 25
  newButton.style.height = 25
  newButton.innerText = BandNumber
  newButton.id =  "Button" + BandNumber

  newButton.addEventListener('click',function(e) {
    
    
    this.style.backgroundColor = 'green'

myanswer = this.innerText
handleclick(this.id)

  })
document.body.appendChild(newButton)

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
      console.debug ('previous button clicked ') + previousbutton.id
      previousbutton = buttonclicked
  //console.debug (previousbutton)
    }
    }
  ///******* Draw Frequency Graph */
    function DrawScale() {    
    canvasContent.strokeStyle = 'black'
        canvasContent.setLineDash([1, 2])
        //canvasContent.setLineDash([0,0])
       
//console.log(document.getElementById('canvasContentContext').style.width)

        for (let j =0;j <10; ++j) {
         var a =  (Math.log(Freq[j]/20)) / Math.log(2) * 30 //28// 30.10299957
         //a = a *
         console.log(a) +  "  " + Freq[j]
         
         canvasContent.beginPath()
        canvasContent.moveTo(a,0)
      canvasContent.lineTo(a, 300)  /// draws the vertical lines on the graph
        //canvasContentContent.beginPath()
        canvasContent.stroke()
      }
   
      
     
       
    }

    //************* Draw Filter on Graph*************  */
    function DrawFilters(NumberofFilters, Qfactor, GainindB, FilterTypes) {
      var NumberOctaves = 9.97
       var Number = 1
       canvasContent.beginPath
//canvasContent.fillStyle = 'transparent'

      canvasContent.clearRect(0,0,300,600)
      

      
      for (let index = 0; index < NumberofFilters; index++) {
        centerFreq[index] = 25 * 2** (9.97 * Number/(NumberofFilters * 2))
        //console.debug (centerFreq[index])
       Number = Number + 2
       console.debug (centerFreq[index])
       biquadFilter.frequency.value  = centerFreq[index]
        biquadFilter.Q.value = Qfactor
        biquadFilter.gain.value = GainindB
        biquadFilter.type = "peaking"
        biquadFilter.getFrequencyResponse(Freqs,Mags,Phases)
        
        const half = canvasContent.height / 2
        canvasContent.strokeStyle = 'blue'
        canvasContent.setLineDash([0,0])
        canvasContent.beginPath()
  
        for (let i=0;i<nFreqs;++i) { 
          x =  (Math.log(Freqs[i]/20)) / Math.log(2)  * 30// 30.10299957
          
         canvasContent.lineTo(x,125 -Mags[i]*40)
         var a = x
         var b = 125 -Mags[i]*40
         canvasContent.moveTo(a,b)
       //canvasContent.lineTo(x,canvasContent.height-Mags[i]*100)
        canvasContent.stroke()
        }
        
       }
       
       for (let i=0;i <NumberofFilters;++i) {
       x =  (Math.log(centerFreq[i]/20))/ (Math.log(2)) * 60 //30.10299957
       console.debug (x + '  ' + centerFreq[i])
       x = x + 35 // offset 
       console.debug (x)
      CreateButtons(x,145,i+1 )
      myanswer = ""
       }
      
    canvasContent.strokeStyle = 'black'
   
const rand1 = Math.floor(Math.random() * NumberofFilters)
console.debug (rand1)
var x= canvasContent.left
var y = canvasContent.top 

   biquadFilter.frequency.value = centerFreq[rand1]
   CorrectFilterFrequency =  biquadFilter.frequency.value
   correctanswer = rand1 + 1
   canvasContent.beginPath()
   //canvasContent.strokerect(20,0,300,600)
   //canvasContent.strokerect(20,0,300,600)
   //canvasContent.stroke()
   canvasContent.position = "absolute"
  }




function SwitchEQ(WhichOne) {

// user clicked on EA
if (WhichOne == 0) {
  //alert ("EQ")
  flat.style.backgroundColor = ""
eq.style.backgroundColor = "green"
Done.style.backgroundColor = ""
  biquadFilter.type = "peaking"
}

// User clicked on FLAT
if (WhichOne ==1) {
flat.style.backgroundColor = "green"
eq.style.backgroundColor = ""
Done.style.backgroundColor = ""
 biquadFilter.type = "allpass"
}
// User Clicked on DONE
if (WhichOne ==2) { 
  if (myanswer == "") {
    alert ("please select your band by clicking on the appropriate button")
    return WhichOne
  }
  audioContext.suspend()
    flat.style.backgroundColor = ""
  eq.style.backgroundColor = ""
  Done.style.backgroundColor = "green"

  // Give feedback on answers
  if (myanswer == correctanswer) {
   var EndTime = Date.now()
    alert ('You are correct! The Band is: ' + correctanswer +  ' ( ' +  Math.round(CorrectFilterFrequency) + ' Hz )')
    CorrectAnswersInLevel =CorrectAnswersInLevel + 1
    MinimumTrials = MinimumTrials + 1
   
    LevelPercentage = (CorrectAnswersInLevel / MinimumTrials ) * 100
    NumberofCorrectAnswers = NumberofCorrectAnswers + 1
    TrialsCompleted = TrialsCompleted + 1
    console.debug (TrialsCompleted)
    Trials.innerText = "Trials: " + TrialsCompleted //+ " of " + TotalTrials
    var percentage = NumberofCorrectAnswers / TrialsCompleted * 100
    
    console.debug (percentage)
    correct.innerText = "Correct Answers: "+ percentage + " %"
  } else {
    var EndTime = Date.now()
    alert ('Sorry, the correct answer is: Band ' + correctanswer +   ' ( ' + Math.round(CorrectFilterFrequency) + ' Hz )')
    TrialsCompleted = TrialsCompleted + 1
    var percentage = NumberofCorrectAnswers / TrialsCompleted * 100
   
    console.debug (percentage)
    Trials.innerText = "Trials: " + TrialsCompleted// + " of " + TotalTrials
    correct.innerText = "Correct Answers: " +  (percentage.toFixed(1)) + " %"
 
    
  }
   // Start Next Trial
   
   var responsetime = (EndTime - starttime) / 1000
  //alert (responsetime)
   data.push ({Trial: TrialsCompleted,NumberofBands: NumberofBands,CorrectBand: correctanswer,MyAnswer: myanswer,CorrectFreq: Math.floor(CorrectFilterFrequency),MyFreq: Math.floor(centerFreq[myanswer-1]),ResponseTimeinSec:responsetime})
   generateTable(data)
   
   function generateTable(data) {  
    let table = '<table>'; 
    
   
    table += '<tr><th>Trial</th><th>NumberofBands</th><th>CorrectBand</th><th>MyAnswer</th><th>CorrectFreq</th><th>MyFreq</th><th>Response time (s)</th></tr>';  
    data.forEach(item => {  
    table += `<tr><td>${item.Trial}</td><td>${item.NumberofBands}</td><td>${item.CorrectBand}</td><td>${item.MyAnswer}</td><td>${item.CorrectFreq}</td><td>${item.MyFreq}</td><td>${item.ResponseTimeinSec}</td></tr>`;  
    });  
    table += '</table>';  
    return table;  
    }  
    const tableContainer = document.getElementById('table-container');  
  tableContainer.innerHTML = generateTable(data);  
   //previousanswer = null
  for (let index = 1; index < NumberofBands+1; index++) {
    
    var elem = document.getElementById ('Button' + index)
  elem.parentNode.removeChild(elem)
//return false
  }
  
   if (LevelPercentage >= 80 && MinimumTrials >=5 ) {
    NumberofBands = NumberofBands + 1
    MinimumTrials = 0
    LevelPercentage = 0
  CorrectAnswersInLevel = 0
MinimumTrials = 0}
    else {
      
      

    }
    //alert (LevelPercentage) + '   ' + MinimumTrials
DrawFilters(NumberofBands,1,6,'peaking')
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
 




  


start.onclick = () => {
  audioContext.resume()
  let source = new AudioBufferSourceNode(audioContext,{loop:true})
  let nFrames = audioContext.sampleRate
  source.buffer = audioContext.createBuffer(1,nFrames,audioContext.sampleRate)
  for (i=0;i<nFrames;i++) source.buffer.getChannelData(0)[i] = 2*Math.random()-1
  source.connect(biquadFilter).connect(audioContext.destination)

  source.start()
  start.style.visibility = "hidden"
  //DrawFilters(2,1,6,'peaking')
  DrawFilters(NumberofBands,1,6)
  DrawScale()
  eq.style.backgroundColor = "green"
  
  
}
function loadmenu() {
  document.getElementById("menu").innerHTML =  '<object type="text/html" data = "http://localhost/HowtoListen/CurtainMenu.html" style="width:100%; height:100%;overflow:visible;" ></object>'
  console.debug (menu.innerHTML)
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
  const urlParams = new URLSearchParams(window.location.search);
  const greetingValue = urlParams.get('greeting');
  //console.log(greetingValue); 

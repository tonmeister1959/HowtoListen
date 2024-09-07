// Define some variables__________
var audioContext = new AudioContext()
var previousbutton = null
var correctanswer
var myanswer = ""
var NumberofCorrectAnswers = 0
var TrialsCompleted = 0
var TotalTrials = 10
var dbincrement = canvas.height-20 /30
var NumberofBands = 2
const centerFreq = [];
const data = [  
  //{ Trial: 0, NumberofBands: 0, CorrectBand: 0, MyAnswer: 0 }

  ]; 

var starttime = Date.now()
var LevelPercentage = 0  // have to achieve 80% in a level to advance
var MinimumTrials = 0 // to to at least complete 5 trials to advance
var CorrectAnswersInLevel = 0



CorrectFilterFrequency = 0
var oct  =   Math.log(20000/20) / Math.log(2)
oct= 600 / oct
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



const FrequencyLabels = [10];  // these are the filter frequencies
FrequencyLabels[0] = "20"
FrequencyLabels[1] = "  50"
FrequencyLabels[2] = "  100"
FrequencyLabels[3] = " 200"
FrequencyLabels[4] = " 500"
FrequencyLabels[5] = " 1k"
FrequencyLabels[6] = " 2k"
FrequencyLabels[7] =  "   5k"
FrequencyLabels[8] =  "  10k"
FrequencyLabels[9] =  " 20k"

const dBLabel = [7]
 dBLabel[0] = "15"
  dBLabel[1] = "10"
  dBLabel[2] = "5"
  dBLabel[3] = "0 dB"
  dBLabel[4] = "-5"
  dBLabel[5] = "-10"
  dBLabel[6] = "-15"



var canvasContext = canvas.getContext('2d')
const ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "15px Verdana"; 
  for (let index = 0; index < FrequencyLabels.length; index++) {
    //const element = array[index];
    //ctx.fillText(FrequencyLabels[index], index * 60, 300)
    
  }





var nFreqs = 2000, // This defines the resolution of the frequency response; note that they are linearly spaced
    Freqs = new Float32Array(nFreqs),
    Mags = new Float32Array(nFreqs),
    Phases = new Float32Array(nFreqs)

for (var i=0;i<nFreqs;++i) Freqs[i] = 20000/nFreqs*(i+1)
var biquadFilter = new BiquadFilterNode(audioContext,{frequency:1000,Q:1,gain:1})
var CurrentFilter = "Peaking"

function CreateButtons(x,y,BandNumber) {
  const newButton = document.createElement('button');
  var currentbutton
 
  newButton.style.zIndex = 2
  newButton.style.position = "absolute"
  newButton.style.top = y
  newButton.style.left = x
  newButton.style.width = 25
  newButton.style.height = 25
  newButton.innerText = BandNumber
  newButton.id =  "Button" + BandNumber

  newButton.addEventListener('click',function(e) {
    console.debug (this.style.backgroundColor)
    
    this.style.backgroundColor = 'green'

myanswer = this.innerText
handleclick(this.id)

  })
document.body.appendChild(newButton)
myanswer = ""

}
  function handleclick(buttonclicked) {
   
    console.debug (buttonclicked)

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
  



  
 
  

  
    function DrawScale() {
        var x = 0
        var x1 = 0
        var y = 0
        var y1 = 0
        canvasContext.strokestyle = 'black'
        canvasContext.setLineDash([2, 5])
        canvasContext.setLineDash([0,0])
        for (let j =0;j <10; ++j) {
          x =  Math.log(Freq[j]/Freq[0]) / Math.log(2) * oct
      y = 0
      y1 = 300
      
        canvasContext.moveTo(x+20,y)
        canvasContext.lineTo(x+20,y1)
        //canvasContext.beginPath()
        canvasContext.stroke()
      }
   
      // puts frequencies on graph
      const ctx = document.getElementById("canvas").getContext("2d");
      ctx.font = "15px verdana";
      for (let index = 0; index < FrequencyLabels.length; index++) {
        //const element = array[index];
        ctx.fillText(FrequencyLabels[index], index * 63+20, 320)
        

      }
      for (let index = 0; index < dBLabel.length; index++) {
        console.debug (dBLabel[index])
        canvasContext.fillText(dBLabel[index], 0, index * 50 + 15)
        

      }
      
    }

    function DrawFilters(NumberofFilters, Qfactor, GainindB, FilterTypes) {
      var NumberOctaves = 9.97
      
      
      var Number = 1
      canvasContext.clearRect(20,0,canvas.width,canvas.height)
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
        canvasContext.beginPath()
        const half = canvas.height -65
        console.debug (dbincrement * 30)
      

        canvasContext.strokeStyle = 'blue'
        canvasContext.setLineDash([0,0])
        for (let i=1;i<nFreqs;++i) { 
          x =  Math.log(Freqs[i]/Freq[0]) / Math.log(2) * oct
          

          canvasContext.lineTo(x+20,half -Mags[i]*85)
       //canvasContext.lineTo(x+20,canvas.height-Mags[i]*90)
        canvasContext.stroke()
        }
        
       }
       
       for (let i=0;i <NumberofFilters;++i) {
       x =  (Math.log(centerFreq[i]/20)/ (Math.log(2)) * oct)
       console.log(x)
      CreateButtons(x+20,150,i+1 )
      myanswer = ""
       }
    canvasContext.strokeStyle = 'black'
   
const rand1 = Math.floor(Math.random() * NumberofFilters)
console.debug (rand1)

   biquadFilter.frequency.value = centerFreq[rand1]
   CorrectFilterFrequency =  biquadFilter.frequency.value
   correctanswer = rand1 + 1
   canvasContext.beginPath()
   canvasContext.rect(20,0,600,300)
   canvasContext.stroke()
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
    alert ('You are correct! The Band is: ' + correctanswer +  ' ( ' +  Math.floor(CorrectFilterFrequency) + ' Hz )')
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
    correct.innerText = "Correct Answers: " +  Math.trunc(percentage) + " %"
 
    
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

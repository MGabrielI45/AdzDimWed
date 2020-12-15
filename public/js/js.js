
//! Comment~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var nameMsg = document.getElementById('Name')
var Msg = document.getElementById('Msg')
var submit = document.getElementById('submit')
var failMsg = document.getElementById('FailMsg')
var commentsect = document.getElementById('ComSect')
var loadComm = document.getElementById('loadComm')



function validateForm(){
    if( nameMsg.value == "" || Msg.value ==""){
        submit.setAttribute('disabled', 'disabled');
    }else{
        submit.removeAttribute('disabled');
    }
}

async function comments(){
    submit.setAttribute('disabled', 'disabled');
    failMsg.innerHTML = "Loading . . ."
    failMsg.style.color = "grey"
    failMsg.animate([
        {opacity:0},
        {opacity:1}
    ],{
        duration:250,
        fill:"forwards",
    })

        let formDatas = new FormData()
        formDatas.append('name', nameMsg.value)
        formDatas.append('msg', Msg.value)
    
        let request = await fetch('/comment',{
            method: 'POST',
            body: new URLSearchParams(formDatas)  ,
            headers:{
                "Access-Control-Allow-Origin": '*'    
            },
        })
    
        let response = await request.json()
        if(!request.ok){
            failMsg.innerHTML = "X Something Went Wrong"
            failMsg.style.color = "red"
            
        }else{
            failMsg.innerHTML = "✓ Comment Sent"
            failMsg.style.color = "green"
            nameMsg.value = ''
            Msg.value = ''
        }
    
        failMsg.animate([
            {opacity:0},
            {opacity:1}
        ],{
            duration:500,
            fill:"forwards",
        })
    
        setTimeout(()=>{
            failMsg.animate([
                {opacity:1},
                {opacity:0}
            ],{
                duration:500,
                fill:"forwards",
            })
    
        queryComment(0,commentsect.childElementCount)
    },3000)

   
}

async function queryComment(numCom, numSkip){
    

    let formDatas = new FormData()
        formDatas.append('numCom', numCom)
        formDatas.append('numSkip', numSkip)

    let request = await fetch('/comments',{
        method: 'POST',
        body: new URLSearchParams(formDatas)
    })

    if(request.ok){
        let response = await request.json()
        
                
        try{
            response.data.forEach(data => {

                let para = document.createElement('p')
                let span = document.createElement('span')
                let text1 = document.createTextNode(data.msg)

                span.innerHTML = data.name

                para.appendChild(span)
                para.appendChild(text1)

                commentsect.appendChild(para)

            });

            if(response.data.length < 1){
                let text3 = document.createTextNode("There are no comments yet")
                commentsect.appendChild(text3)
            }
        }catch{
            let text4 = document.createTextNode("There is an error")
            commentsect.appendChild(text4)
        }

        if (commentsect.childElementCount < response.counts){
            
            loadComm.style.display = "block"
        }else{
            loadComm.style.display = "none"
        }

    }else{
        let text4 = document.createTextNode("There is an error")
        commentsect.appendChild(text4)
    }
}


//! Comment~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//? Open Invitation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var body = document.getElementsByTagName('body')[0]
var opening = document.getElementById('opening')
window.history.scrollRestoration = 'manual'

function openInv(){

    body.style.overflow = 'visible'
    autoScroll()
    
    queryComment(10,0)

}

function autoScroll(){
    scrollBy(0,3)
    if(scrollY < opening.clientHeight){
        setTimeout(autoScroll, 5)
    }else{
        opening.style.display = "none"
        scroll(0,0)
    }
    
}

//? Open Invitation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//* Counter~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var day = document.getElementById('days')
var hour = document.getElementById('hours')
var minute = document.getElementById('minutes')
var Counter = document.getElementById('counter')
const weddDate = new Date(2020,11,28,9).getTime()

var x = setInterval(counter,1000)

function counter(){
    let now = new Date().getTime()
    let distance = weddDate - now

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / ( 1000 * 60 * 60 ))
    let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));

    day.innerHTML = days 
    hour.innerHTML = hours 
    minute.innerHTML = minutes 

    if (distance <= 0){
        let text = document.createTextNode('the wedding has started')
        clearInterval(x)
        while(Counter.firstChild){
            Counter.removeChild(Counter.lastChild)
        }
        Counter.appendChild(text)
        console.log("it stopped");
    }

}



//* Counter~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//! audio

var volumeOn = document.getElementById('VolOn')
var volumeOff = document.getElementById('VolOff')
var audio = document.getElementById('audio')
var audio_on = false

function toogleAudio(){
    if(audio_on){
        audio.pause()
        volumeOn.style.display = "none"
        volumeOff.style.display = "block"
    }else{
        audio.play()
        volumeOn.style.display = "block"
        volumeOff.style.display = "none"
    }
    audio_on = !audio_on
}

//! audio
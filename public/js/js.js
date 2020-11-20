
//! Comment~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var nameMsg = document.getElementById('Name')
var Msg = document.getElementById('Msg')
var submit = document.getElementById('submit')
var failMsg = document.getElementById('FailMsg')
var commentsect = document.getElementById('ComSect')


function validateForm(){
    if( nameMsg.value == "" || Msg.value ==""){
        submit.setAttribute('disabled', 'disabled');
    }else{
        submit.removeAttribute('disabled');
    }
}

async function comments(){
    submit.setAttribute('disabled', 'disabled');

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
    },2000)

    queryComment()
}

async function queryComment(){
    let request = await fetch('/comments',{
        method: 'GET',
    })

    if(request.ok){
        let response = await request.json()
        
        while(commentsect.firstChild){
            commentsect.removeChild(commentsect.lastChild)
        }
                
        try{
            response.forEach(data => {

                let para = document.createElement('p')
                let br = document.createElement('br')
                let span = document.createElement('span')
                let text1 = document.createTextNode(data.msg)
                let text2 = document.createTextNode('_____________')

                span.innerHTML = data.name

                para.appendChild(span)
                para.appendChild(br)
                para.appendChild(text1)

                commentsect.appendChild(para)
                commentsect.appendChild(text2)
                commentsect.appendChild(br.cloneNode())
                commentsect.appendChild(br.cloneNode())

            });

            if(response.length < 1){
                let text3 = document.createTextNode("There are no comments yet")
                commentsect.appendChild(text3)
            }
        }catch{
            let text4 = document.createTextNode("There is an error")
            commentsect.appendChild(text4)
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
    

    queryComment()

}

function autoScroll(){
    scrollBy(0,3)
    if(scrollY < opening.clientHeight){
        setTimeout(autoScroll, 10)
    }else{
        opening.style.display = "none"
        scroll(0,0)
    }
    
}

//? Open Invitation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


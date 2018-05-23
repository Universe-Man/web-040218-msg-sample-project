document.addEventListener('DOMContentLoaded',function(event) {
    const apiUrl = 'http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/'
    const newMsgForm = document.getElementById('new-msg-form')
    const newMsgInputName = document.getElementById('new-msg-input-name')
    const newMsgInputMsg = document.getElementById('new-msg-input-msg')
    const container = document.getElementById('container')

    function generateHTMLForMsgObj(msgObj) {
        return `<p id='msg-id-${msgObj.id}' data-msg-msg='${msgObj.message}' data-msg-name='${msgObj.real_name}'>
                    ${msgObj.real_name} says ${msgObj.message}
                </p>`
    }

    function appendMsgToDom(msgObj) {
        container.innerHTML += generateHTMLForMsgObj(msgObj)
    }

    function prependMsgToDom(msgObj) {
        container.innerHTML = `${generateHTMLForMsgObj(msgObj)}${container.innerHTML}`
    }

    function fetchMessages() {
        fetch(apiUrl)
        .then( r=>r.json() )
        .then( msgsObjs => {
            msgsObjs.forEach( msgObj => {
                appendMsgToDom(msgObj)
            } )
        } )
    }

    function postNewMessageAndAppendToDom(name,msgContent) {
        // {message:{real_name:'string',message:'string'}}
        const config = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({message:{message:msgContent,real_name:name}})
        }
        fetch(apiUrl,config).then( r=>r.json() ).then(prependMsgToDom)
    }

    function handleNewMsg(event) {
        event.preventDefault()
        const name = newMsgInputName.value
        const msgContent = newMsgInputMsg.value
        postNewMessageAndAppendToDom(name,msgContent)
    }

    newMsgForm.addEventListener('submit',handleNewMsg)

    fetchMessages()
})
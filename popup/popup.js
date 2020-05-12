window.addEventListener('DOMContentLoaded', function() {

    var button = document.createElement('button');
    var popup = document.querySelector('.popup');
    var fileAddAttribute = 'content/addAttribute.js';
    var fileRemoveAttribute = 'content/removeAttribute.js';
    var buttonState;
    function changeButtonAppearance(targetButton){
        var button = targetButton;
        var classButton = button.className;
        if(classButton.indexOf('popup__button--active') !== -1 && button.innerText === 'Enable'){
            button.classList.remove('popup__button--active');
            button.innerText = "Disable";
            chrome.storage.local.set({'buttonstate': 'Disable'});
        }else{
            button.classList.add('popup__button--active');
            button.innerText = 'Enable';
            chrome.storage.local.set({'buttonstate': 'Enable'});
        }
        
    }
    function handlePageAttribute(){
        var classButton = button.className;
        if(classButton.indexOf('popup__button--active') !== -1 && button.innerText === 'Enable'){
            injetScriptPage(fileAddAttribute);
        }else{
            injetScriptPage(fileRemoveAttribute);
        }
    }
    function injetScriptPage(script){
        chrome.tabs.executeScript(null, {
            file: script
        });
    }
    function logStorage(){
        if(chrome.storage){
            chrome.storage.local.get('buttonstate', function(value){
                var result = value;
                console.log(result['buttonstate']);
            });
        }   
    }
    button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        changeButtonAppearance(this);
        handlePageAttribute();
        logStorage();
    });

    logStorage();
    chrome.storage.local.get('buttonstate', function(result){
        buttonState = result['buttonstate'];
        if(buttonState === 'Enable'){
            popup.appendChild(button);
            button.classList.add('popup__button');
            button.classList.add('popup__button--active');
            button.innerText = 'Enable';
            injetScriptPage(fileAddAttribute);
        }else{
            popup.appendChild(button);
            button.classList.add('popup__button');
            button.innerText = 'Disable';
        }
    });
});
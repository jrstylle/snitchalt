(function(){
    'use strict'; 
    var snitchAlt = snitchAlt || {};
    
    snitchAlt.setExtensionState = function (value){
        chrome.storage.local.set({'extensionState': value});
    }
    snitchAlt.changeButtonAppearance = function (state){
        if(state === 'Enabled'){
            switchButton.setAttribute('checked','');
        }else{
            switchButton.removeAttribute('checked');
            
        }
    }
    snitchAlt.handlePageAttribute = function (){
        var classButton = button.className;
        if(classButton.indexOf('popup__button--active') !== -1 && button.innerText === 'Enable'){
            injetScriptPage(fileAddAttribute);
        }else{
            injetScriptPage(fileRemoveAttribute);
        }
    }
    snitchAlt.injetScriptPage = function (script){
        chrome.tabs.executeScript(null, {
            file: script
        });
    }
    snitchAlt.logStorage = function (){
        chrome.storage.local.get('extensionState', function(result){
            extensionState = result['extensionState'];
            console.log('extension state: ', result['extensionState']);
        });
    }
    snitchAlt.init = function(){
        console.log('teste');

        var popup = document.querySelector('.popup');
        var switchButton = document.getElementById('switchButton');
        var fileAddAttribute = 'content/addAttribute.js';
        var fileRemoveAttribute = 'content/removeAttribute.js';
        var extensionState;

        chrome.storage.local.get('extensionState', function(result){
            extensionState = result['extensionState'];
            if(extensionState === 'Enabled'){
                snitchAlt.changeButtonAppearance(extensionState);
                snitchAlt.injetScriptPage(fileAddAttribute);
                console.log('extension enabled');

            }else{
                snitchAlt.changeButtonAppearance(extensionState);
                snitchAlt.injetScriptPage(fileRemoveAttribute);
                
            }
        });
        
        switchButton.addEventListener('change', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(switchButton.checked){
                snitchAlt.setExtensionState('Enabled');
                snitchAlt.injetScriptPage(fileAddAttribute);
                snitchAlt.changeButtonAppearance(extensionState);
            }else{
                snitchAlt.setExtensionState('Disabled')
                snitchAlt.injetScriptPage(fileRemoveAttribute);
                snitchAlt.changeButtonAppearance(extensionState)
            }
            
        });
    };

    window.addEventListener('DOMContentLoaded', snitchAlt.init());

})();
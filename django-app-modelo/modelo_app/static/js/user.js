const button = document.querySelector('#create-user-button');
button.addEventListener('click', function(event){
    event.preventDefault();
    const forms = document.querySelector('#create-user-form')
    const formsData = new FormData(forms);
}
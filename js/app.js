'use strict';

// Initiation Event
function Event() {
    this.checkSetup();

    this.gAuthbutton = document.getElementById('gAuthButton');
    this.fbButton = document.getElementById('fbButton');
    this.loginPage = document.getElementById('loginPage');
    this.dashboard = document.getElementById('dashboard');
    this.signOutLink = document.getElementById('signOutLink');
    
    this.accueil = document.getElementById('accueil');

    this.eventAddForm = document.getElementById('eventAddForm');
    this.eventAddButton = document.getElementById('eventAddButton');
    this.eventName = document.getElementById('eventName');
    this.eventDate = document.getElementById('eventDate');
    this.eventDetail = document.getElementById('eventDetail');


    //Binding action
    this.gAuthbutton.addEventListener('click', this.signIn.bind(this));
    this.signOutLink.addEventListener('click', this.signOut.bind(this));
    this.eventAddForm.addEventListener('submit', this.addEvent.bind(this));


    this.initFirebase();
}


Event.prototype.initFirebase = function() {
   
};


Event.prototype.signIn = function() {
  
};


Event.prototype.signOut = function() {

};


Event.prototype.onAuthStateChanged = function(user) {
  if (user) {
    this.dashboard.removeAttribute('hidden');
    this.loginPage.setAttribute('hidden', 'true');

  } else {
    this.loginPage.removeAttribute('hidden');
    this.dashboard.setAttribute('hidden', 'true');
  }
};

Event.prototype.loadDashbord = function() {

};


Event.MESSAGE_TEMPLATE = 
                    '<div class="card p-4">' +
                        '<div class="card-body d-flex justify-content-between align-items-center">' +
                            '<div>'+
                                '<span class="h4 name d-block font-weight-normal mb-2"></span>' +
                            '</div>' +
                            '<div class="detail"></div>'+
                        '</div>' +
                    '</div>';


Event.prototype.addEvent = function(event) {
  event.preventDefault();

  if(this.eventName.value.length && this.eventDate.value.length){
    let data = {
                    name: this.eventName.value, 
                    date: this.eventDate.value, 
                    detail: this.eventDetail.value,
                    statut: false
                };
    // firebase.database().ref('/').child("events").push(data).then(_=> {
    //     Snackbar.show({text: 'Evènement <u>' + data.name + '</u> enregistré avec succès !', actionText: 'Fermer', pos: 'top-center'});
    //     this.eventAddForm.reset();
    // });

    
  }
  
  
};

Event.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert("Vous n'avez pas encore configuré ni importé le SDK Firebase. ");
  }
};

window.onload = function() {
  window.Event = new Event();
};
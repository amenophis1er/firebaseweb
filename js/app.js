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



// Sets up shortcuts to Firebase features and initiate firebase auth.
Event.prototype.initFirebase = function() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};



// Signs-in Friendly Chat.
Event.prototype.signIn = function() {
  var GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
  // var provider = new firebase.auth.FacebookAuthProvider();
  this.auth.signInWithPopup(GoogleAuthProvider);
};

// Signs-out of Friendly Chat.
Event.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
  this.auth.signOut();
  // document.location.reload(true);
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
Event.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    this.dashboard.removeAttribute('hidden');
    this.loginPage.setAttribute('hidden', 'true');


    // console.log("Logged as ", user, this);

  } else { // User is signed out!
    this.loginPage.removeAttribute('hidden');
    this.dashboard.setAttribute('hidden', 'true');
  }
};

Event.prototype.loadDashbord = function() {
    this.eventsRef = this.database.ref('events');
    // Make sure we remove all previous listeners.
    this.eventsRef.off();

    // Loads the first 2 events with  statut=true and listen for new ones.
    var setEvent = function(data) {
    var val = data.val();
        this.displayEvent(data.key, val.name, val.date, val.detail);
        
    }.bind(this);
    this.eventsRef.orderByChild("statut").limitToFirst(2).equalTo(true).on('child_added', setEvent);
    this.eventsRef.orderByChild("statut").limitToFirst(2).equalTo(true).on('child_changed', setEvent);

};


Event.MESSAGE_TEMPLATE = 
                    '<div class="card p-4">' +
                        '<div class="card-body d-flex justify-content-between align-items-center">' +
                            '<div>'+
                                '<span class="h4 name d-block font-weight-normal mb-2"></span>' +
                            '</div>' +
                            '<div class="detail">loremloremlorem</div>'+
                        '</div>' +
                    '</div>';

Event.prototype.displayEvent = function(key, name, date, detail) {
    console.log("displayEvent==>", key, name, date, detail);
    
    this.accueil.removeAttribute('hidden');
    this.accueil.querySelector(".row").textContent = this.MESSAGE_TEMPLATE;
    container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    
    $("#accueil").removeAttr("hidden");
    $("#accueil row").append( "toto" );

    // alert($("#accueil").removeAttr("hidden").find(".row").length);
    // .find(".card:last")
    //     .find(".name").text(name).end()
    //     .find(".detail").html(detail).end()
    
    
};


Event.prototype.addEvent = function(event) {
  // TODO(DEVELOPER): Sign out of Firebase.
  event.preventDefault();


  if(this.eventName.value.length && this.eventDate.value.length){
    let data = {
                    name: this.eventName.value, 
                    date: this.eventDate.value, 
                    detail: this.eventDetail.value,
                    statut: false
                };
    firebase.database().ref('/').child("events").push(data).then(_=> {
        Snackbar.show({text: 'Evènement <u>' + data.name + '</u> enregistré avec succès !', actionText: 'Fermer', pos: 'top-center'});
        this.eventAddForm.reset();
    });

    console.log("Send", this.eventName.value, this.eventDate.value, this.eventDetail.value);
  }
  else{
    console.log("Some errors");
  }

  
};


// Checks that the Firebase SDK has been correctly setup and configured.
Event.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert("Vous n'avez pas encore configuré ni importé le SDK Firebase. ");
  }
};

window.onload = function() {
  window.Event = new Event();
  Event.loadDashbord();
};


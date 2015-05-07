var timeoutId = 0;
var timeoutClearId = 0;
var oneMin = 60000; // How many milliseconds
var bpm = 100;
var bpb = 4;
var beatCount = 1;
var turnedOn = false;

$(document).ready(function() {
    $("#bpmPlus").click(function() {
        var currentValue = parseFloat($("#bpm").val());
        $("#bpm").val(currentValue+1);
        bpm = parseFloat($("#bpm").val());
    })
    $("#bpmMinus").click(function() {
        var currentValue = parseFloat($("#bpm").val());
        $("#bpm").val(currentValue-1);
        bpm = parseFloat($("#bpm").val());
    })
    $("#bpm").change(function() {
        bpm = parseFloat($("#bpm").val());
    })

    $("#bpbPlus").click(function() {
        var currentValue = parseFloat($("#bpb").val());
        $("#bpb").val(currentValue+1);
        bpb = parseFloat($("#bpb").val());
    })
    $("#bpbMinus").click(function() {
        var currentValue = parseFloat($("#bpb").val());
        $("#bpb").val(currentValue-1);
        bpb = parseFloat($("#bpb").val());
    })
    $("#bpb").change(function() {
        bpb = parseFloat($("#bpb").val());
    })

    $("#start").click(function() {
        if (turnedOn) {
            return false;
        }
        beatCount = 1
        beat();
        turnedOn = true;
    })
    $("#stop").click(function() {
        clearTimeout(timeoutId);
        beatCount = 1
        turnedOn = false;
    })
    $(".help a").click(function() {
      $('.notes').toggleClass('hide');
    })
});
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
function noteChange() {
  var noteArray = ["Ab","A","A#","Bb","B","B#","C","C#","Dd","D","D#","Eb","E","F","F#","Gb","G","G#"];
  var note = shuffle(noteArray);
  $("#noteIndicator").text(note[0]).fadeIn(300);
}

function beat() {
    timeoutId = setTimeout("beat()", (oneMin / bpm));
    if (beatCount == 1) {
        barBeep();
		noteChange();
    }
    else {
        beep();
    }
    beatCount++;
    if (beatCount > bpb) {
        beatCount = 1;
    }
}

function beep() {
    $("#beatIndicator").removeClass('barBeep');
    $("#beatIndicator").addClass('beep');
	document.getElementById('beepOne').play();
}

function barBeep() {
    $("#beatIndicator").removeClass('beep');
    $("#beatIndicator").addClass('barBeep');
	document.getElementById('beepTwo').play();
}


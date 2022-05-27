let breakMinute = 5;
let sessionMinute = 25;
let defaultBreakLength = breakMinute * 60;
let defaultSessionLength = sessionMinute * 60;
let play = false;
let timerInterval;

$(document).ready(function () {
  const resetButton = $('#reset');
  const playPauseButton = $('#start_stop');
  const breakLength = $('#break-length')[0];
  const sessionLength = $('#session-length')[0];
  const incrementBreak = $('#break-increment');
  const decrementBreak = $('#break-decrement');
  const incrementSession = $('#session-increment');
  const decrementSession = $('#session-decrement');
  const status = $('#timer-label')[0];
  const timeLeft = $('#time-left')[0];
  const beep = $('#beep')[0];

  breakLength.textContent = `${defaultBreakLength / 60}`;
  sessionLength.textContent = `${defaultSessionLength / 60}`;

  timeLeft.textContent = `${Math.floor(defaultSessionLength / 60)
    .toString()
    .padStart(2, '0')}:${(defaultSessionLength % 60)
    .toString()
    .padStart(2, '0')}`;

  function showTime() {
    if (defaultSessionLength >= 0) {
      status.textContent = 'Session';
      timeLeft.textContent = `${Math.floor(defaultSessionLength / 60)
        .toString()
        .padStart(2, '0')}:${(defaultSessionLength % 60)
        .toString()
        .padStart(2, '0')}`;
    } else if (defaultBreakLength >= 0) {
      status.textContent = 'Break';
      timeLeft.textContent = `${Math.floor(defaultBreakLength / 60)
        .toString()
        .padStart(2, '0')}:${(defaultBreakLength % 60)
        .toString()
        .padStart(2, '0')}`;
    }
  }

  function startTimer() {
    if (play === true) {
      return (timerInterval = setInterval(() => {
        if (defaultSessionLength - 1 >= -1) {
          defaultSessionLength = defaultSessionLength - 1;
          if (defaultSessionLength === -1) {
            defaultBreakLength = breakMinute * 60;
            beep.play();
          }
        } else if (defaultBreakLength - 1 >= -1) {
          defaultBreakLength = defaultBreakLength - 1;
          if (defaultBreakLength === -1) {
            defaultSessionLength = sessionMinute * 60;
            beep.play();
          }
        }
        showTime();
        console.log(defaultSessionLength);
      }, 1000));
    }
  }

  function stopTimer(interval) {
    clearInterval(interval);
  }

  playPauseButton.click(() => {
    play = !play;
    if (play === true) {
      startTimer();
    } else {
      stopTimer(timerInterval);
    }
  });

  resetButton.click(() => {
    play = false;
    stopTimer(timerInterval);
    sessionMinute = 25;
    breakMinute = 5;
    defaultSessionLength = sessionMinute * 60;
    defaultBreakLength = breakMinute * 60;
    timeLeft.textContent = `${Math.floor(
      defaultSessionLength / 60
    ).toString()}:${(defaultSessionLength % 60).toString().padStart(2, '0')}`;
    sessionLength.textContent = `${defaultSessionLength / 60}`;
    breakLength.textContent = `${defaultBreakLength / 60}`;
    status.textContent = 'Session';
    beep.pause();
    beep.currentTime = 0;
  });

  incrementBreak.click(() => {
    if (breakMinute + 1 <= 60) {
      breakMinute = breakMinute + 1;
      defaultBreakLength = breakMinute * 60;
      breakLength.textContent = `${defaultBreakLength / 60}`;
    }
  });

  decrementBreak.click(() => {
    if (breakMinute - 1 >= 1) {
      breakMinute = breakMinute - 1;
      defaultBreakLength = breakMinute * 60;
      breakLength.textContent = `${defaultBreakLength / 60}`;
    }
  });

  incrementSession.click(() => {
    if (sessionMinute + 1 <= 60) {
      sessionMinute = sessionMinute + 1;
      defaultSessionLength = sessionMinute * 60;
      sessionLength.textContent = `${defaultSessionLength / 60}`;
      showTime();
    }
  });

  decrementSession.click(() => {
    if (sessionMinute - 1 >= 1) {
      sessionMinute = sessionMinute - 1;
      defaultSessionLength = sessionMinute * 60;
      sessionLength.textContent = `${defaultSessionLength / 60}`;
      showTime();
    }
  });
});

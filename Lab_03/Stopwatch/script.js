let timer;
let seconds = 0;

function stopwatch(sumSeconds) {
  let hours = String(Math.floor(sumSeconds / 3600));
  let minutes = String(Math.floor(sumSeconds / 60));
  let seconds = String(Math.floor(sumSeconds));

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (hours == 0 && minutes == 0) {
    return `${seconds}s`;
  }
  if (hours == 0) {
    return `${minutes}min ${seconds}s`;
  }
  return `${hours}h ${minutes}min ${seconds}s`;
}

function updateTimer() {
  document.getElementById("timer").textContent = stopwatch(seconds);
}

document.getElementById("start").addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      updateTimer();
    }, 1000);
  }
});

document.getElementById("stop").addEventListener("click", () => {
  timer = clearInterval(timer);
});

document.getElementById("reset").addEventListener("click", () => {
  timer = clearInterval(timer);
  seconds = 0;
  updateTimer();
});

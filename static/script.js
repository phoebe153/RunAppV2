function convert() {
  const paceInput = document.getElementById("pace").value;
  const speedInput = document.getElementById("speed").value;

  if (paceInput && !speedInput) {
    const [min, sec] = paceInput.split(":").map(Number);
    const totalMinutes = min + sec / 60;
    const speed = (60 / totalMinutes).toFixed(2);
    document.getElementById("speed").value = speed;
  } else if (speedInput && !paceInput) {
    const paceMinutes = 60 / parseFloat(speedInput);
    const min = Math.floor(paceMinutes);
    const sec = Math.round((paceMinutes - min) * 60)
      .toString()
      .padStart(2, "0");
    document.getElementById("pace").value = `${min}:${sec}`;
  }
}

function calculateCustomDistance() {
  const pace = document.getElementById("pace").value;
  const distance = parseFloat(document.getElementById("distance").value);
  const resultDiv = document.getElementById("customResult");

  if (!pace || !distance) {
    resultDiv.innerText = "Bitte Pace und Distanz eingeben.";
    return;
  }

  const [min, sec] = pace.split(":").map(Number);
  const totalSecPerKm = min * 60 + sec;
  const totalTime = totalSecPerKm * distance;

  const h = Math.floor(totalTime / 3600);
  const m = Math.floor((totalTime % 3600) / 60);
  const s = Math.round(totalTime % 60);

  resultDiv.innerText = `Zeit für ${distance} km: ${h}h ${m}m ${s}s`;
}

function calculateStandardDistances() {
  const pace = document.getElementById("pace").value;
  const resultDiv = document.getElementById("standardResults");

  if (!pace) {
    resultDiv.innerText = "Bitte zuerst Pace eingeben.";
    return;
  }

  const [min, sec] = pace.split(":").map(Number);
  const totalSecPerKm = min * 60 + sec;

  const distances = {
    "5 km": 5,
    "10 km": 10,
    "Halbmarathon (21.1 km)": 21.1,
    "Marathon (42.195 km)": 42.195
  };

  let html = "<ul>";
  for (const [label, dist] of Object.entries(distances)) {
    const totalTime = totalSecPerKm * dist;
    const h = Math.floor(totalTime / 3600);
    const m = Math.floor((totalTime % 3600) / 60);
    const s = Math.round(totalTime % 60);
    html += `<li>${label}: ${h}h ${m}m ${s}s</li>`;
  }
  html += "</ul>";
  resultDiv.innerHTML = html;
}

function selectRunner() {
  const runnerSelect = document.getElementById("runnerSelect");
  const selectedRunner = runnerSelect.value;
  const runnerResultBox = document.getElementById("runnerResultBox");
  const runnerResult = document.getElementById("runnerResult");

  if (!selectedRunner) {
    runnerResultBox.style.display = "none";
    runnerResult.innerHTML = "";
    return;
  }

  const runners = {
    "Eliud Kipchoge": { pace: "2:52", speed: "20.9 km/h", marathon: "2:01:09" },
    "Paula Radcliffe": { pace: "3:03", speed: "19.6 km/h", marathon: "2:15:25" },
    "Kenenisa Bekele": { pace: "2:53", speed: "20.8 km/h", marathon: "2:01:41" },
    "Haile Gebrselassie": { pace: "2:55", speed: "20.6 km/h", marathon: "2:03:59" },
    "Abebe Bikila": { pace: "3:01", speed: "19.9 km/h", marathon: "2:12:11" },
    "Konstanze Klosterhalfen": { pace: "3:00", speed: "20.0 km/h", marathon: "noch kein offizieller" }
  };

  const data = runners[selectedRunner];

  runnerResult.innerHTML = `
    <p><strong>${selectedRunner}</strong></p>
    <ul>
      <li><strong>Pace:</strong> ${data.pace} min/km</li>
      <li><strong>Geschwindigkeit:</strong> ${data.speed}</li>
      <li><strong>Marathon-Bestzeit:</strong> ${data.marathon}</li>
    </ul>
  `;

  runnerResultBox.style.display = "block";
}

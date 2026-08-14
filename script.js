// Basic client-side form handling: validate, show JSON, copy & download
const form = document.getElementById('appForm');
const result = document.getElementById('result');
const downloadBtn = document.getElementById('downloadBtn');

function gatherFormData() {
  const data = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    age: form.age.value.trim(),
    social: form.social.value.trim(),
    location: form.location.value.trim(),
    travelOk: form.travelOk.value || '',
    availability: form.availability.value.trim(),
    consent: form.consent.checked,
    submittedAt: new Date().toISOString()
  };
  return data;
}

function validateData(d) {
  if(!d.firstName || !d.lastName) return 'Please enter your first and last name.';
  if(!d.age) return 'Please enter your age.';
  if(!(d.consent)) return 'You must confirm that you are a teenager and accept the volunteering terms.';
  if(!d.location) return 'Please provide where you live.';
  if(!d.travelOk) return 'Please indicate whether you can travel to Olongapo City.';
  return '';
}

function showResult(message, data) {
  result.hidden = false;
  result.innerHTML = `<strong>${message}</strong><pre style="white-space:pre-wrap;margin-top:.5rem;">${JSON.stringify(data, null, 2)}</pre>
    <div style="margin-top:.5rem;">
      <button id="copyBtn" style="margin-right:.5rem;">Copy to clipboard</button>
      <button id="dlBtn">Download JSON</button>
    </div>`;
  document.getElementById('copyBtn').addEventListener('click', async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('Copied to clipboard');
  });
  document.getElementById('dlBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.firstName || 'application'}_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = gatherFormData();
  const err = validateData(data);
  if(err){
    alert(err);
    return;
  }
  // Show the data and allow download / copy
  showResult('Thank you — your application is ready. Copy or download it below to send it to the project organizer.', data);
});

downloadBtn.addEventListener('click', () => {
  const data = gatherFormData();
  const err = validateData(data);
  if(err){ alert(err); return; }
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.firstName || 'application'}_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

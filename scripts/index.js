// A few external library requires as an example
const BPromise = require('bluebird');
const attachFastClick = require('fastclick');
const axios = require('axios');

let state = {
  lastUploadedFileUrl: null,
};

const config = require('./config');

const x = document.querySelector('#x-text');
const y = document.querySelector('#y-text');
const z = document.querySelector('#z-text');

function motion(event) {
  x.innerHTML = `x: ${event.accelerationIncludingGravity.x}`;
  y.innerHTML = `y: ${event.accelerationIncludingGravity.y}`;
  z.innerHTML = `z: ${event.accelerationIncludingGravity.z}`;
}

function main() {
  console.log('Executing main() ..');
  console.log(`This bundle.js points to API_WS_URL=${config.API_WS_URL}`);

  var shakeEvent = new Shake({ threshold: 1.5 });
  shakeEvent.start();
  console.log(config)
  const ws = new WebSocket(config.API_WS_URL);
  window.addEventListener('shake', function() {
    const data = { type: 'whack', url: state.lastUploadedFileUrl };
    ws.send(JSON.stringify(data));
  }, false);

  ws.onmessage = function incoming(msg) {
    const data = JSON.parse(msg.data);
    if (data.type === 'match') {
      window.location = `${config.API_HTTP_URL}${data.url}`;
    }
  }

  function onKeyDown(e) {
    if (e.keyCode === 32) {
      const data = { type: 'space' };
      ws.send(JSON.stringify(data));
      e.preventDefault();
    }
  }

  document.addEventListener('keydown', onKeyDown, false);

  const inputEl = document.getElementById('file-input');
  function sendPic() {
    const data = new FormData();
    data.append('image', inputEl.files[0]);

    axios.post(`${config.API_HTTP_URL}/api/uploads`, data)
      .then((res) => {
        state.lastUploadedFileUrl = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  inputEl.addEventListener('change', sendPic, false);
}

window.onload = main;

const db = require('./db');

console.log('Initial Posts: ', db.get('videos').value());

module.exports.getVideoById = function(id) {
  return new Promise((resolve, reject) => {
    const requestedVideo = db.get('videos').find({ id }).value();

    resolve(requestedVideo);
  });
}

module.exports.getVideos = function() {
  return new Promise((resolve, reject) => resolve(db.get('videos').value()));
}

module.exports.createVideo = function({ title, duration, released }) {
  return new Promise((resolve, reject) => {
    const newVideoId = +db.get('idInc').value();
    const newVideo = {
      id: `${newVideoId}`,
      title,
      duration,
      released,
      watched: false,
    };

    db.get('videos')
      .push(newVideo)
      .write();
    db.set('idInc', newVideoId + 1)
      .write();

    resolve(newVideo);
  });
}
const videoA = {
  id: '1',
  title: 'foo',
  duration: 120,
  watched: false,
  released: true,
};

const videoB = {
  id: '2',
  title: 'foo2',
  duration: 3200,
  watched: false,
  released: false
};

const videos = [videoA, videoB];

module.exports.getVideoById = function(id) {
  return new Promise((resolve, reject) => {
    resolve(videos.find(video => video.id === id));
  });
}

module.exports.getVideos = function() {
  return new Promise((resolve, reject) => resolve(videos));
}

module.exports.createVideo = function({ title, duration, released }) {
  return new Promise((resolve, reject) => {

    const video = {
      id: Date.now,
      title,
      duration,
      released,
      watched: false,
    };

    videos.push(video);

    resolve(video);
  });
}
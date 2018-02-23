const videoA = {
  id: '1',
  title: 'foo',
  duration: 120,
  watched: false,
};

const videoB = {
  id: '2',
  title: 'foo2',
  duration: 3200,
  watched: true,
};

const videos = [videoA, videoB];

module.exports.getVideoById = function(id) {
  return new Promise((resolve, reject) => {
    resolve(videos.find(video => video.id === id));
  });
}
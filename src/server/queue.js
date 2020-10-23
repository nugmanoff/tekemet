const Fs = require('fs');
const Path = require('path');
const { PassThrough } = require('stream');
const Throttle = require('throttle');
const mm = require('music-metadata');

const { extname } = require('path');

const readDir = () => Fs.readdirSync(process.cwd(), { withFileTypes: true });
const isMp3 = (item) => item.isFile && extname(item.name) === '.mp3';
const readSongs = () =>
  readDir()
    .filter(isMp3)
    .map((songItem) => songItem.name);
const generateRandomId = () => Math.random().toString(36).slice(2);

var sinks = new Map();
var songs = readSongs();
var currentSong = null;

const makeResponseSink = () => {
  const id = generateRandomId();
  const responseSink = PassThrough();
  sinks.set(id, responseSink);
  return { id, responseSink };
};

const removeResponseSink = (id) => {
  sinks.delete(id);
};

const broadcastToEverySink = (chunk) => {
  for (const [, sink] of sinks) {
    sink.write(chunk);
  }
};

const getBitRate = async (song) => {
  try {
    const metadata = await mm.parseFile(Path.join(process.cwd(), song));
    return parseInt(metadata.format.bitrate);
  } catch (err) {
    return 128000; // reasonable default, 128kbp
  }
};

const playLoop = async (index) => {
  if (index >= songs.length) {
    index = 0;
  }
  currentSong = songs[index];

  if (currentSong) {
    const bitRate = await getBitRate(currentSong);
    const songReadable = Fs.createReadStream(currentSong);

    const throttleTransformable = new Throttle(bitRate);
    throttleTransformable.on('data', (chunk) => broadcastToEverySink(chunk));
    throttleTransformable.on('end', async () => {
      await playLoop(index + 1);
    });

    songReadable.pipe(throttleTransformable);
  }
};

const startStreaming = () => {
  // start with first
  playLoop(0);
};

module.exports = { makeResponseSink, removeResponseSink, startStreaming };

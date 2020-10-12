export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <img
          src="/images/background.jpg"
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            zIndex: 0,
          }}
        />
      </div>
      <audio
        controls
        src="http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_p"
        autoPlay
      >
        {' '}
      </audio>
    </div>
  );
}

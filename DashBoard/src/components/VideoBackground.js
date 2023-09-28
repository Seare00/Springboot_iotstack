import skybg from '../assets/skybg.mp4'

const VideoBackground = () => {
    return (
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={skybg} type="video/mp4" />
        </video>
      </div>
    );
};

export default VideoBackground
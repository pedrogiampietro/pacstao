import Hero from './components/Hero';
import InteractiveMap from './components/InteractiveMap';
import AudioPlayer from './components/AudioPlayer';
import CursorParticles from './components/CursorParticles';
import HallOfFame from './components/HallOfFame';
import BattleBracket from './components/BattleBracket';
import GraffitiWall from './components/GraffitiWall';
import VideoTeaser from './components/VideoTeaser';
import FlyerGenerator from './components/FlyerGenerator';
import LegacyTimeline from './components/LegacyTimeline';
import './index.css'

function App() {
  return (
    <div className="app-container">
      <CursorParticles />
      <Hero />
      <VideoTeaser />
      <BattleBracket />
      <FlyerGenerator />
      <HallOfFame />
      <LegacyTimeline />
      <InteractiveMap />
      <GraffitiWall />
      <AudioPlayer />
    </div>
  );
};

export default App

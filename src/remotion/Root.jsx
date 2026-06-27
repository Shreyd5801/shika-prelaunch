import { Composition } from 'remotion';
import { NightDrive } from './NightDrive';

export const RemotionRoot = () => (
  <Composition
    id="NightDrive"
    component={NightDrive}
    durationInFrames={300}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);

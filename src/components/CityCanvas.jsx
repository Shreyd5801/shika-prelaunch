/**
 * CityCanvas — pre-rendered Remotion night-drive video plate.
 *
 * Source:  my-video/src/Composition.tsx (Remotion)
 * Render:  cd my-video && npx remotion render MyComp out/night-drive.mp4
 * Assets:  public/video/night-drive.mp4  (4.9 MB, 6 s loop, 1080×1350, 30fps)
 *          public/video/night-drive-poster.jpg  (first-frame poster)
 *
 * The video contains: car interior base image (founder photo), animated
 * pink/magenta neon light streaks, bokeh blobs, rain droplets, car bump/sway.
 */
export default function CityCanvas({ style }) {
  return (
    <div className="layer" style={{ ...style, pointerEvents: 'none' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/video/night-drive.mp4"
        poster="/video/night-drive-poster.jpg"
        style={{
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center center',
          display:        'block',
        }}
      />
    </div>
  );
}

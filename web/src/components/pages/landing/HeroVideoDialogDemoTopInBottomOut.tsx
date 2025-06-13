import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/_FYRICFpGLw"
        thumbnailSrc="video-thumbnail.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/_FYRICFpGLw"
        thumbnailSrc="video-thumbnail.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

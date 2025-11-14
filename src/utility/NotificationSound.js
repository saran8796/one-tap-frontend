export class NotificationSound {
  constructor(soundFile = "/notification.wav") {
    this.sound = new Audio(soundFile);
    this.interval = null;
    this.isPlaying = false;
  }

  async playLoop() {
    if (this.isPlaying) return;

    try {
      this.isPlaying = true;

      // Initial play
      await this.sound.play();

      // Set up looping with interval
      this.interval = setInterval(async () => {
        if (this.sound) {
          this.sound.currentTime = 0;
          await this.sound.play().catch(() => {});
        }
      }, 2000);
    } catch (error) {
      console.log("Sound play failed:", error);
      this.isPlaying = false;
    }
  }

  stop() {
    this.isPlaying = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.sound) {
      this.sound.pause();
      this.sound.currentTime = 0;
    }
  }

  destroy() {
    this.stop();
    this.sound = null;
  }
}

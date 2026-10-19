const avatarStage = document.querySelector('.avatar-stage');

if (avatarStage) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const precisePointer = window.matchMedia('(pointer: fine)');
  let frame = 0;

  const resetAvatar = () => {
    avatarStage.style.setProperty('--avatar-x', '0px');
    avatarStage.style.setProperty('--avatar-y', '0px');
    avatarStage.style.setProperty('--avatar-rx', '0deg');
    avatarStage.style.setProperty('--avatar-ry', '0deg');
    avatarStage.style.setProperty('--light-x', '66%');
    avatarStage.style.setProperty('--light-y', '28%');
  };

  const moveAvatar = event => {
    if (reducedMotion.matches || !precisePointer.matches) return;
    const rect = avatarStage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      avatarStage.style.setProperty('--avatar-x', `${x * 13}px`);
      avatarStage.style.setProperty('--avatar-y', `${y * 7}px`);
      avatarStage.style.setProperty('--avatar-rx', `${y * -3.5}deg`);
      avatarStage.style.setProperty('--avatar-ry', `${x * 5.5}deg`);
      avatarStage.style.setProperty('--light-x', `${50 + x * 28}%`);
      avatarStage.style.setProperty('--light-y', `${42 + y * 25}%`);
    });
  };

  avatarStage.addEventListener('pointermove', moveAvatar);
  avatarStage.addEventListener('pointerleave', resetAvatar);
  reducedMotion.addEventListener?.('change', resetAvatar);
  precisePointer.addEventListener?.('change', resetAvatar);
}


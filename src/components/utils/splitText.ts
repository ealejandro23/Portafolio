// Simple split text utility - splits heading text into spans for animation
const setSplitText = () => {
  const targets = document.querySelectorAll('[data-split]')
  targets.forEach(el => {
    const text = el.textContent || ''
    el.innerHTML = text
      .split('')
      .map(char => `<span class="split-char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')
  })
}

export default setSplitText

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://swenkkdqcyvjqkdelbxa.supabase.co'
const SUPABASE_KEY = 'sb_publishable_aG3H15ixuGL5Q80I97pBMg_4mt61-vG'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Şimdilik test videoları (sonra Supabase'den çekeceğiz)
const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Test 1', category: 'muzik' },
  { id: '9bZkp7q19f0', title: 'Test 2', category: 'muzik' },
  { id: 'kJQP7kiw5Fk', title: 'Test 3', category: 'muzik' }
]

let currentIndex = 0
let player

// YouTube API hazır olduğunda
window.onYouTubeIframeAPIReady = () => {
  document.getElementById('loading').style.display = 'none'
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videos[0].id,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playsinline: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) nextVideo()
      }
    }
  })
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length
  player.loadVideoById(videos[currentIndex].id)
}

// Kaydırma algılama (dokunmatik)
let touchStartY = 0
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY
})
document.addEventListener('touchend', (e) => {
  const delta = touchStartY - e.changedTouches[0].clientY
  if (delta > 80) nextVideo()
})

// Butonlar
document.getElementById('nextBtn').onclick = nextVideo
document.getElementById('likeBtn').onclick = () => {
  alert('Beğendin! ❤️ (Algoritma yakında)')
}
document.getElementById('shareBtn').onclick = () => {
  alert('Paylaş (yakında)')
}
document.getElementById('dmBtn').onclick = () => {
  alert('DM özelliği yakında eklenecek')
}

console.log('ShortSio başladı!')

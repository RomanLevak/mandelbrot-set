import makeResponsiveCanvas from './make-canvas'
import calculateMandelbrotSet from './fractal-generator'

const canv = makeResponsiveCanvas(document.body, draw)
const ctx = canv.getContext('2d')

// coordinates
let
    re_min = -2.1,
    re_width = 3,
    im_min = -1.3,
    im_height = 2.6

function draw() {
    showLoader()

    const
        cvw = canv.width,
        cvh = canv.height,
        set = calculateMandelbrotSet(re_min, re_width,
                                     im_min, im_height,
                                     Math.min(cvh, cvw))
    setTimeout(() => {
        ctx.clearRect(0, 0, cvw, cvh)

        for(let y = set.length-1; y >= 0; --y)
            for(let x = set[y].length-1; x >=0 ; --x) {
                const r = (~~(set[y][x]*2.125)%255).toString(16)
                const g = (~~((set[y][x]+10)*2.125)%255).toString(16)
                const b = (~~((set[y][x]+8)*2.125)%255).toString(16)

                const color = '#' + [r, g, b].map(c => c.length == 1 ? '0' + c : c).join('')

                ctx.fillStyle = color
                ctx.fillRect(x, y, 1, 1)
            }
        hideLoader()
    }, 0)
}

// LOADER
const loader = document.querySelector('#loader')
const showLoader = () => loader.classList.remove('hidden')
const hideLoader = () => loader.classList.add('hidden')

// NAV
const nav = document.querySelector('#nav')
nav.addEventListener('click', e => {
    switch(e.target.id) {
        case 'up':
            goUp()
            break
        case 'down':
            goDown()
            break
        case 'right':
            goRight()
            break
        case 'left':
            goLeft()
            break
        case 'zoom-in':
            zoomIn()
            break
        case 'zoom-out':
            zoomOut()
            break
    }
})

const goUp = () => {
    im_min -= im_height/1.9
    draw()
}
const goDown = () => {
    im_min += im_height/1.9
    draw()
}
const goRight = () => {
    re_min += re_width/1.9
    draw()
}
const goLeft = () => {
    re_min -= re_width/1.9
    draw()
}

const zoomIn = () => {
    let re_center = re_min + re_width/2
    let im_center = im_min + im_height/2
    re_width *= 0.7
    im_height *= 0.7
    re_min = re_center - (re_width/2)
    im_min = im_center - (im_height/2)
    draw()
}

const zoomOut = () => {
    let re_center = re_min + re_width/2
    let im_center = im_min + im_height/2
    re_width /= 0.7
    im_height /= 0.7
    re_min = re_center - (re_width/2)
    im_min = im_center - (im_height/2)
    draw()
}

window.addEventListener('keypress', e => {
    switch(e.key) {
        case 'w': case 'W':
            goUp()
            break
        case 's': case 'S':
            goDown()
            break
        case 'd': case 'D':
            goRight()
            break
        case 'a': case 'A':
            goLeft()
            break
        case 'e': case 'E':
            zoomIn()
            break
        case 'q': case 'Q':
            zoomOut()
            break
    }
    draw()
})

draw()

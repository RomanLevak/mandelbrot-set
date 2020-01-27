function iterateMandelbrot(x_re, x_im, max_iter = 100) {
    const c_re = x_re
    const c_im = x_im

    for(let i = 0; i < max_iter; i++) {
        let re2 = x_re ** 2
        let im2 = -(x_im ** 2)
        let ab2 = 2 * x_re * x_im

        x_re = re2 + im2 + c_re
        x_im = ab2 + c_im

        if(Math.sqrt(x_re **2 + x_im ** 2) > 2)
            return i
    }

    return max_iter
}

function calculateMandelbrotSet(re_min=-1.5, re_width=3, im_min=-1.5, im_height=3, cvw=200) {
    const step = re_width / cvw

    let result = []

    for(let y = im_min; y < im_min + im_height; y += step) {
        let row = []

        for(let x = re_min; x < re_min + re_width; x += step)
            row.push(iterateMandelbrot(x, y))

        result.push(row)
    }

    return result
}

export default calculateMandelbrotSet

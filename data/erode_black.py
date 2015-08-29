'''
erode all black areas with non black neighbour pixels
https://en.wikipedia.org/wiki/Mathematical_morphology
'''

fileName = "countries"#.png

from PIL import Image


def main():
	imgIn = Image.open("%s.png"%fileName)
	w, h = imgIn.size
	pixIn = imgIn.load()

	imgOut = Image.new("L", (w,h), 0)
	pixOut = imgOut.load()

	for x in range(w):
		for y in range(h):
			pix = pixIn[x,y]
			if pix == 0:
				neighbours = kernel(pixIn, w, h, x, y)
				pixOut[x,y] = neighbours[0]
			else:
				pixOut[x,y] = pix

	# imgOut.show()
	imgOut.save("%s_dilation.png"%fileName)


def kernel(pixels, w, h, x, y):
	pixs = []

	pixs.append(pixels[(x-1)%w, (y-1)%h])
	pixs.append(pixels[x,       (y-1)%h])
	pixs.append(pixels[(x+1)%w, (y-1)%h])

	pixs.append(pixels[(x-1)%w, y])
	pixs.append(pixels[(x+1)%w, y])

	pixs.append(pixels[(x-1)%w, (y+1)%h])
	pixs.append(pixels[x,       (y+1)%h])
	pixs.append(pixels[(x+1)%w, (y+1)%h])

	pixs = [elem for elem in pixs if elem != 0] # filter out black

	pixs.append(pixels[x,       y])
	return pixs


if __name__ == '__main__':
	main()

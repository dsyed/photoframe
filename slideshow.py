#!/usr/bin/env python
'''A simple image/GIF slideshow.'''
from itertools import cycle
import Tkinter as tk

# foreign library, need to installed
from PIL import ImageTk

images = [
    'images/IMG_0668.JPG',
    'images/IMG_0670.JPG',
    'images/IMG_9830.gif'
]


class Imagewindow(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self.photos = cycle(
            ImageTk.PhotoImage(file=image) for image in images
        )
        self.displayCanvas = tk.Label(self)
        self.displayCanvas.pack()

    def slideShow(self):
        p = ImageTk.PhotoImage(file='images/IMG_0668.JPG')
        print p
    # img = next(self.photos)
    # self.displayCanvas.config(image=img)
    # self.after(50, self.slideShow) # 0.05 seconds

    def run(self):
        self.mainloop()


root = Imagewindow()
width = root.winfo_screenwidth()
height = root.winfo_screenwidth()
root.overrideredirect(True)
root.geometry('%dx%d' % (width*1, height*1))
root.slideShow()
root.run()

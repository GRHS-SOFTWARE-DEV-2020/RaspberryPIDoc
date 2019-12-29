
This directory contains the documentation for all sorts of components used on the raspberrypi boards.

Looking around I couldn't find an already made full documentation set for the RaspberryPI series
so this is my attempt at it. I plan to release this collection shortly on Github as a public project
so that others can use it and maintain / add-on to it as well.

Ideally some of these will have XMLs that can be used by the compiler / operating system to aid in
cross-platform compatibility. But we will see about that in the future.



Documentation Directory Prefix Definition:

int_ = mostly physical interfaces documentation
mem_ = on_board or otherwise connected non-volatile memory documentation
prot_ = protocols both low and high level documentation
soc_ = SoC documentation
gpu_ = GPU component or GPU software (think OpenGL) documentation
fpu_ = FPU (floating point unit) component or important FPU software (think NEON) documentation
cpu_ = CPU documentation
arch_ = programming / system architecture documentation
vform_ = video / closely related format documentation, for things like MPEG and AVC



raspberrypi Xx = raspberrypi collated documentation. each should have an XML document within used
by my other tooling to aid in cross-platform compatibility. these contain links to other documentation
for ease-of-use along with any information I've found online or discovered myself that may be useful.
I will also add in links for purchasing and other useful things alongside the normal documentation.
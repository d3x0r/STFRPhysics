
# On parallel Transport

[Demo](https://d3x0r.github.io/STFRPhysics/3d/indexSphereMap2.html)

![Screenshot](CurvatureScreenshot.png)

This is an experiment with parallel transporting a frame for some wandering functions.  There are 5 Line segments which
turn by some amount and then each take 100 steps of some arc-length, The frame that they are in is parallel transported, and the
path that they end up taking depending on the `Curvature` slider, will join back in only 2-4 segments.

There's a second line that take a turn for each step, which results in a circular parallel transport.   It is 400 steps.  There
is no control for the step length of this curve...

Each frame is shown with its relative right/up/forward facing.  XYZ is RGB repsetively (x=red,y=green,z=blue).

Increasing the curvature from near 0 to 1 makes it so that 3 turns of 90 degrees arrive back at the pole, with a 90 degree facing change.

Increasing the curvature to 2 makes it so you get back the the same pole with only a single 90 degree turn; (from the default settings, if the
step length was different it wouldn't nessecarily end up back at the pole.  With the default settings every 2x curvature change results in the same basic paths around the sphere.



The sliders in the `Step` Column control the length each step along a segment is.
The sliders in the `Turn Angle` column control the angle of the turn before beginning the path.




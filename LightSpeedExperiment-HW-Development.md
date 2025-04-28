



# Introduction


[Experiment design/idea](LightSpeedExperiment.md)

There's 3 boxes/pieces - 1 is a central detector, and 2 detectors which are clones/copies/the same thing; so there's only 2 types of things, and at this time I need help most with emitters....

The Central Detector - could be built from parts - but I think I found a combination of parts that can just plug together.   It was originally a high resolution clock with low jitter that was going to timestamp incoming signals to be read by a PC for later analysis.  Talking to someone they help me understand how a TDC (lidar range sensor) might be used instead - which is essentially what I was doing with the signals anyway.

Then there One signal provides a start trigger and the other provides a stop.

## Emitters


These lasers are 2 miles - the laser diode is embedded in the focusing lens, and can be unsoldered from the board - it's got 3 leads (power, ground, and power feedback(current limit is usually connected to this, but for such a short pulse, and a long delay in-between - there's not much worry about that (see Alpha Phoenix video below))).
https://www.amazon.com/Cyahvtl-Flashlight-Rechargeable-Adjustable-Suitable/dp/B09V1C8827/ref=sr_1_6


https://www.digikey.com/en/products/detail/connor-winfield/OH320-CC-700503CF-010-0M/13687442 (http://www.conwin.com/datasheets/cx/cx309.pdf)

Product search/lookup with the above....
(https://www.digikey.com/en/products/filter/oscillators/172?s=N4IgjCBcpgHAzFUBjKAzAhgGwM4FMAaEAeygG0R5YwA2eRI%2BAdgBYWAmBy5pgVnZBE2ATjAAGJoMrU6AgLpEADgBcoIAMrKATgEsAdgHMQAXyLteiaCFSRMuQiXLgx7YVNq9JCkCrWbdhiamIDRIIDoAJmrmXL6QGtr6RkTKAJ6KeGoYOKjGxkA)

__Divider__ - take 10mhz clock to 1 second.

Generate short pulse (several nanosecond range, every second.... could be 100ns which is 1 clock tick - maybe the divider can be fed to some logic to gate the pulse?)

And then something to drive the pulse on the laser diode...

This Alpha Phoenix video is about a similar problem... like the 10-15m mark he's talking about how to turn on the diode fast - he settled on the board below... (data sheet link)
https://www.youtube.com/watch?v=IaXdSGkh8Ww
https://www.digikey.com/en/products/detail/picolas-gmbh/LDP-V-10-70/18684122
https://www.picolas.de/wp-content/uploads/2023/06/LDP-V_10-70_datasheet_Rev1905.pdf

!  (I keep forgetting this) This should also have a switch to enable a continuous mode for targeting... and that should be power limited...

Also, a method to reset the divider; in such a way that maybe both boards could be connected, and breaking the connection resets the divider, and start ticking?   - but then I would also want one of them to be offset (eh - maybe I can just position one slightly further away to get it biased so the stop trigger signal never happens before the start trigger on the TDC... the total difference is only a +/-24 nanoseconds, (long story short, light goes about 1 foot per nanosecond)  so I can just move one 30 feet further away...   But still, in this, I do need a method to sync the clocks....

It was also suggested to use LoRA radio - which looking at various modules for that seems to be about 300mw or 25-26dBm to have a good signal at 2 miles - although parabolic reflectors on the antennas can work to improve sensitivity?  (It is line of sight since I'm using lasers... Lora is sort of a complex protocol though - and includes even a WAN layer for distributed networking.... and all of that sort of stuff adds delays/potential jitter - its bad enough that 900Mhz waves you need at least a couple to sense 'Signal' ... a bare LoRA that could generate (I would call it 'break' signal) for a short time, and a receiver that could hear that could be used to instead use a pulse to sync the remote clocks... might take a couple times to get the skew right maybe - but then maybe just having an extra delay of a few microseconds on one of them (which would make them not quite clones) )... 

## rambling...

The TDC chip below actually can support a wide range of measurements and down to a few millimeter resolution... it's got a ring oscillator that ticks 60ps ticks in a ring, which when it reaches the end of its ring it ticks a lower resolution counter and turns off - until the stop signal, then it starts the ring again for the last little bit of difference....


## Central Detector



Photodetector (2)
https://www.newport.com/f/nanosecond-photodetectors?srsltid=AfmBOop0GICb--wYTr9u1pOCzjZ3BZPd1H8VruJji0A6BWXnSmiL59m-
(+coax cable to TDC)

TDC (Time-to-Digital Converter)
https://www.digikey.com/en/products/detail/texas-instruments/TDC7200EVM/5213889  (start/stop signals from photodetectors)

LoRA Transmitter?  
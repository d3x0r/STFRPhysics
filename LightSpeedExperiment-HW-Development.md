



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
## Central Detector



Photodetector (2)
https://www.newport.com/f/nanosecond-photodetectors?srsltid=AfmBOop0GICb--wYTr9u1pOCzjZ3BZPd1H8VruJji0A6BWXnSmiL59m-
(+coax cable to TDC)

TDC (Time-to-Digital Converter)
https://www.digikey.com/en/products/detail/texas-instruments/TDC7200EVM/5213889  (start/stop signals from photodetectors)


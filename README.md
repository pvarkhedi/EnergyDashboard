This is a website dashboard that showcases the energy data from Springfield.

----
FEATURES:
The key feature is all the five parts (3 graphs, pie chart, and table/legend) are all
synced by a mouseover. This means that the user can run the cursor over the graphs and
see an indepth breakup of the different kinds of data on that specific day.

Another feature is that the first graph shows the brakup of how the energy is split up
between the 8 uses. It shows this using a stacked area chart. 

The visual aspect of this was enhanced by the use of Highcharts. It made the charts
and graphs look nice and made them easy to read. 

----
DRAWBACKS/LIMITATIONS:
Appearance: One drawback of using Highcharts and creating a grid was that there was a 
lot of white space. Even if all the margins/padding wer eliminated there was white space.
I think this takes away from the sophistication of the dasboard. However, it does make
it easy to read. 

Functionality: This first drawback is that the cursor is only synced with the first graph
if its one that graph. Otherwise only the last 4 parts are synced.
Another drawback is that the syncronization only works if the first chart is spilling over the edge.
If all 8 parts are under the top of the charting space the syncronization does not work. 

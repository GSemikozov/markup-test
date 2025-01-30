# Markup Test

## Working with the Layout (PDF files)

1. Part of the color palette is taken by picker, but judging by the quality - these are very approximate values.
2. [https://placehold.co](https://placehold.co) is used as placeholders for pictures.
3. Indents, font sizes, and sizes of elements - designed "by eye", but in compliance with the structure of blocks.
4. Semantic markup is used during layout, which is good for screen readers and those who navigate the site via keyboard.
5. The layout is based on the principles of adaptive design, in particular, adaptive grids, media queries, and rem are used.
6. SVG icons are inserted inline in HTML - they are not duplicated and there is no point in loading separately (for example, via SVG sprite, but then a live server is required for everything to be displayed correctly). In general, there are many options for working with SVG icons that can be reused and not cluttered/not bloated the markup.

## News Section

1. I did not transfer all the content from PDF, I think there is no point in this.
2. Show more button - I did not implement the functionality for dynamic loading of articles. But - in general, this is not difficult to do, but we can fetch data from any relevant service with pagination.

## Graph

1. I did not implement a panel with switching by months 1-to-1 as in PDF. I added the output of the current day to the button, but it seems more useful to me to add a year if we can switch between months of different years.
2. Graph UI - based on the chart.js library. You can customize until the visual is one-to-one as in PDF.
3. At first, I limited the height of the graph as in PDF, but then changed my mind (you can see it in the commits) - it seems to me that the UX is better if you leave support `maintainAspectRatio` as intended.

## What to Improve

- Agree or refine the visual for tablet.
- Implement functionality for loading articles.
- Perfect the visual of the graph.

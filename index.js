const canvas = d3.select(".canvas");
const svg = canvas.append("svg").attr("height", 600).attr("width", 800);

//grouping element
const group = svg.append("g")
.attr("transform", "translate(0, 200)");

//append shapes
group.append("rect")
    .attr("height", 100)
    .attr("width", 200)
    .attr("fill", "green")
    .attr("x",20)
    .attr("y",20);
group.append("circle")
    .attr("r", 50)
    .attr("cx", 300)
    .attr("cy", 70)
    .attr("fill", "pink");
group.append("line")
    .attr("x1", 370)
    .attr("x2",400)
    .attr("y1",20)
    .attr("y2",120)
    .attr("stroke", "red")
    .attr("stroke-width", 3);
svg.append("text")
    .attr("x", 20)
    .attr("y", 200)
    .attr("fill", "gray")
    .text("test code!")
    .style("font-size", 22);
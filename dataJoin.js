const data = [
    {"height":100, "width":200, "fill":'purple'},
    {"height":60, "width":100, "fill":'pink'},
    {"height":30, "width":50, "fill":'blue'}
]
const svg = d3.select("svg");

let rect = svg.selectAll('rect')
    .data(data)
    .attr("height",d=>d.height)
    .attr("width", d=>d.width)
    .attr("fill", d=>d.fill)
    .enter().append('rect')
    .attr("height",d=>d.height)
    .attr("width", d=>d.width)
    .attr("fill", d=>d.fill);

console.log(rect);
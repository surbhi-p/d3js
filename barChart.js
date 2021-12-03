// append svg container
const svg = d3.select(".canvas")
                    .append('svg')
                    .attr('height', 600)
                    .attr('width', 600)

//create margin and dimentions
const margins = {'top':20, 'left': 100, 'bottom':100, 'right': 20};
const graphWidth = 600 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const graph = svg.append('g')
                .attr('height', graphHeight)
                .attr('width', graphWidth)
                .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

const xAxisGroup = graph.append('g')
                        .attr('transform', 'translate(' + 0 + ',' + graphHeight + ')');
const yAxisGroup = graph.append('g');

d3.json("menu.json").then(data => {
    const rects = graph.selectAll('rect')
        .data(data);
    // y for linear scale
    const y = d3.scaleLinear()
                .range([graphHeight, 0])
                .domain([0,d3.max(data, d => d.orders)]);
    
    const x = d3.scaleBand()
                .range([0, 500])
                .domain(data.map(item => item.name))
                .paddingInner(0.2)
                .paddingOuter(0.2)
        
    // const min = d3.min(data, d => d.orders);
    // const max = d3.max(data, d => d.orders);
    // const ext = d3.extent(data, d => d.orders);
    // console.log(min , max , ext);

    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    //append the enter selection to the DOM
    rects.enter().append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // create and call the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
})
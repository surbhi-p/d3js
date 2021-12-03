// select svg container
const svg = d3.select("svg");

d3.json("menu.json").then(data => {
    const rects = svg.selectAll('rect')
        .data(data);
    // y for linear scale
    const y = d3.scaleLinear()
                .range([0, 500])
                .domain([0,1000]);
    
    const x = d3.scaleBand()
                .range([0, 500])
                .domain(data.map(item => item.name))
                .paddingInner(0.2)
                .paddingOuter(0.2)
        console.log(x("veg curry"))

    rects.attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));

    //append the enter selection to the DOM
    rects.enter().append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));
})
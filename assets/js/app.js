// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 500;

// Definte the chart's margins as an object
var chartMargin = {
	top: 30,
	right: 30,
	bottom: 30,
	left: 30
};

//Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// create an SVG element
var svg = d3
	.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);
	.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")

// Initial Params
var chosenXAxis = "income";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(data, d => d[chosenXAxis]),
			d3.max(data, d => d[chosenXAxis])])
		.range([0, width]);

	return xLinearScale;
}

// Load csv data
d3.csv("../data/data.csv", function(error, dataset) {
	if (error) throw error;
	console.log(dataset);

	// parse data
	dataset.forEach(function(data) {
		data.income = +data.income;
		data.obesity = +data.obesity;
	});

	// xLinearScale function above csv import
	var xLinearScale = xScale(data, chosenXAxis);

	// Create y scale function
	var yLinearScale = d3.scaleLinear()
    	.domain([0, d3.max(data, d => d.obesity)])
    	.range([height, 0]);

	// Create initial axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	// append x axis
	var xAxis = chartGroup.append("g")
		.classed("x-axis", true)
	    .attr("transform", `translate(0, ${height})`)
	    .call(bottomAxis);

	// append y axis
	chartGroup.append("g")
		.call(leftAxis);

  	element = chartGroup.append("g")
  		.selectAll("g")
	    .data(data)

	var elementEnter = element.enter()
		.append("g")
		.attr("transform", function(data,index) {
			return "translate(" + xLinearScale(data.income) + "," + yLinearScale(data.obesity) + ")";
		});

  	// append initial circles
  	elementEnter
	    .append("circle")
	    .attr("r", 20)
	    .attr("fillcolor", "orange")
	    .attr("opacity", ".6");

	// append y axis
	elementEnter.append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("dy", 5)
	    .attr("font-size", 12)
	    .attr("fillcolor", "white")
	    .attr("text-anchor", "middle")
	    .text(function(data,index) {
	    	return data.abbr;
	    });

});
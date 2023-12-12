const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

let year = 0

let interval;
let formattedData;

const svg = d3.select("#chart-area").append("svg")
 .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
 .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
 	.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const yearText = g.append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT/3)
    .attr("font-size", "45px")
    .attr("text-anchor", "middle")
	.attr("class", "year-label")
    .text("2022");

// X label
g.append("text")
 .attr("class", "x axis-label")
 .attr("x", WIDTH / 3)
 .attr("y", HEIGHT + 60)
 .attr("font-size", "20px")
 .attr("text-anchor", "middle")
 .text("Points")

// Y label
const yLabel = g.append("text")
 .attr("class", "y axis-label")
 .attr("x", - (HEIGHT / 2))
 .attr("y", -60)
 .attr("font-size", "20px")
 .attr("text-anchor", "middle")
 .attr("transform", "rotate(-90)")
 .text("Final Ranking")


// money spent over the course of the season
const x = d3.scaleLinear()
	.range([0, WIDTH])
	.domain([8, 759])

// teams constructor ranking - reversed axis because 1 is "on top"
const y = d3.scaleLinear()
    .range([0, HEIGHT])
    .domain([1, 10])

const area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([0, 1000])

// const teamColor = d3.scaleOrdinal().range(["blue", "green", "yellow", "red", "pink", "brown", "slateblue", "grey1", "orange"])
var teamColor = d3.scaleOrdinal().range(d3.schemePaired);

// x axis
const xAxisGroup = g.append("g")
 .attr("class", "x axis")
 .attr("transform", `translate(0, ${HEIGHT})`)

// y axis
const yAxisGroup = g.append("g")
 .attr("class", "y axis")

 const xAxisCall = d3.axisBottom(x)
	// setting custom x axis tick values
	// .tickValues([400,4000,40000])
	// .tickFormat(d3.format("$"));
	.ticks(10)


 xAxisGroup.call(xAxisCall)
	 .selectAll("text")
	  .attr("cy", "10")
	  .attr("cx", "-5")
	  .attr("text-anchor", "end")
	  .attr("transform", "rotate(-40)")

  const yAxisCall = d3.axisLeft(y)
		.ticks(10)
		.tickFormat(d => d);
   yAxisGroup.call(yAxisCall)


const teams = ["mercedes", "red_bull", "ferrari", "mclaren", "aston_martin", 
"alpine", "williams", "alpha_tauri", "alfa_romeo", "haas"]

const legend = g.append("g")
	.attr("transform", `translate(${WIDTH}, ${HEIGHT - 250})`)

teams.forEach((team, i) => {
	const legendRow = legend.append("g")
		.attr("transform", `translate(0, ${i * 20})`)

	legendRow.append("rect")
    .attr("width", 10)
    .attr("height", 10)
		.attr("fill", teamColor(team))

	legendRow.append("text")
    .attr("x", -10)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .style("text-transform", "capitalize")
    .text(team)
})

// data retrieval and binding from json
d3.json("data/data2.json").then(function(data){
	formattedData = data.map(year => {
		// for each team (per year)
		return year["teams"].map(team => {
			// convert the strings into numbers
			team.points = Number(team.points)
			team.final_ranking = Number(team.final_ranking)
			// return team obj
			return team
		})
	})

	// the initial call to load the data into the first year (currently 2022)
	update(formattedData[year], "2022")
})

function step() {
	year = (year < 2) ? year + 1 : 0;
	update(formattedData[year])
}

$("#play-button")
	.on("click", function() {
		const button = $(this)
		if (button.text() === "Play") {
			button.text("Pause")
			interval = setInterval(step, 100)
		}
		else {
			button.text("Play")
			clearInterval(interval)
		}
	})

$("#reset-button")
	.on("click", () => {
		year = 0
		update(formattedData[0])
	})

$("#team-select")
	.on("change", () => {
		update(formattedData[year])
})


function update(data) {
	const t = d3.transition().duration(100);


	const team = $("#team-select").val()

	const teamChoice = data.filter( d => {
		if(team === "all") {
			return true
		}
		else {
			return d.team == team; // will evaluate to true
		}
	})





	// JOIN new data with old elements
	const circles = g.selectAll("circle")
    	.data(teamChoice, (d) => {
			return d["team"]  //
		})

    // EXIT old elements not present in new data.
   	circles.exit()
     	.remove()

  	// ENTER new elements present in new data...
  	circles.enter().append("circle")
		.attr("fill", d => teamColor(d["team_name"]))
    	// AND UPDATE old elements present in new data.
    	.merge(circles)
    	.transition(t)
      		.attr("cx", d => { return x(d["points"]) })
      		.attr("cy", d => { return y(d["final_ranking"]) })
			.attr("r", d => Math.sqrt(area(d.final_ranking) / Math.PI))

	
	
	
	
			// JOIN new data with old elements
	// const cars = g.selectAll("image")
    // 	.data(teamChoice, (d) => {
	// 		return d["team"]  //
	// 	})

    // // EXIT old elements not present in new data.
   	// cars.exit()
    //  	.remove()

  	// // ENTER new elements present in new data...
	//   cars.enter().append("image")
	//   .attr("width", WIDTH / 10)
	//   .attr("height", HEIGHT)
	//   .attr("xlink:href", d => "images/" + d["team_name"] + ".png")
	//   .merge(cars)
	//   .transition(t)
	//   .attr("x", d => x(d["points"]))
	//   .attr("y", d => y(d["final_ranking"]));

	// JOIN new data with old elements
	// const cars = g.selectAll("text")
    // 	.data(teamChoice, (d) => {
	// 		return d["team"]  //
	// 	})

    // // EXIT old elements not present in new data.
   	// cars.exit()
    //  	.remove()

  	// // ENTER new elements present in new data...
	//   cars.enter().append("text")
	//   .attr("width", WIDTH / 10)
	//   .attr("height", HEIGHT)
	//   .merge(cars)
	//   .transition(t)
	//   .attr("x", d => x(d["points"]))
	//   .attr("y", d => y(d["final_ranking"]));


	// yearText.text((2022 + year).toString());
}

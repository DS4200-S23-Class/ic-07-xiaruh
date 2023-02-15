const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 100}

const data = [55000, 48000, 27000, 66000, 90000]

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME2 = d3.select('#vis1')
					.append('svg')
						.attr('height', FRAME_HEIGHT)
						.attr('width', FRAME_WIDTH)
						.attr('class', 'frame');

// scaling functions
const MAX_Y = d3.max(data, (d) => {return d;});
console.log('Max x: ' + MAX_Y);

// scale function
// domain is input, range is output
const Y_SCALE = d3.scaleLinear()
					.domain([0, (MAX_Y + 10000)])
					.range([0, VIS_WIDTH]);

FRAME2.selectAll('points')
		.data(data)
		.enter()
		.append('circle')
			.attr('cy', (d) => {
				return (Y_SCALE(d) + MARGINS.top);
			})
			.attr('cx', MARGINS.bottom)
			.attr('r', 20)
			.attr('class', 'point');

// add an axis
FRAME2.append('g')
		.attr('transform', 
			'translate(' + MARGINS.bottom + ',' +  MARGINS.top + ')')
		.call(d3.axisLeft(Y_SCALE).ticks(6))
			.attr('font-size', '20px');


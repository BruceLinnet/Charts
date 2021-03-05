//d3.select('body').style('background-color', 'black');

let sdb = [];

function fillArray(data){
 sdb = data;
 //.log(sdb);
 //console.log(sdb[2].id);
 barChart();
}; 

axios
    .get('https://sdb.socialstyrelsen.se/api/v1/sv/graviditeterforlossningarochnyfodda/alder')
    .then(response => {
        //console.log(response.data);
        return fillArray(response.data);
    })
    .catch(error => console.error(error));

//BarChart
function barChart(){
const xScale = d3.scaleBand().domain(sdb.map((dataPoint) => dataPoint.text)).rangeRound([0, 250]).padding(0.1); // alla element har samma bredd
const yScale = d3.scaleLinear().domain([0, 50]).range([200, 0]); //ger olika höjd

const container = d3.select('svg')
    .classed('container', true);

const bars = container
    .selectAll('.bar')
    .data(sdb)
    .enter() // hittar datan som inte visas än (render)
    .append('rect') //lägger till divar för varje datapunkt som inte visas än
    .classed('bar', true) //ger divarna css-klassen bar
    .attr('width', xScale.bandwidth())
    .attr('height', (data) => 200 - yScale(data.id)) //tar den totala max höjden och tar bort varje-värde
    .attr('x', data => xScale(data.text)) //xScale hämtar varje datapunkt för data.region (dvs fyra olika regioner på x-axeln)
    .attr('y', data => yScale(data.id)) //hämtar varje datapunkt för data.value (dvs fyra olika höjder/värden på y6 axeln)
    .on("mouseover", function(){
        d3.select(this)
          .style("opacity", 0.5)
          console.log('tja');
        })
    .on("mouseout", function(){
        d3.select(this)
            .style("opacity", 1)
            console.log('tja');
        });
};



//LineChart


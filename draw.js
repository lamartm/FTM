import nlMap from './nlMap.js'

export async function drawMapVisu() {
    const nlData = await nlMap()
    const path = d3.geoPath()

    const width = 975;
    const height = 510;

    const svg = d3.select('#map')
    .append('svg')
    .attr("viewBox", [0, 0, width, height])

    const g = svg.append('g')

    const projection = d3.geoMercator().scale(5000).center([5.1, 52])
    const pathGenerator = path.projection(projection)

    const provincies = g
    .append('g')
    
    .attr('fill', '#42428f')
    .attr('stroke', '#2c2c2e')
    .attr("stroke-width", .7)
    .selectAll('path')
    
    .data(topojson.feature(nlData, nlData.objects.provincie_2020).features)
    .join('path')
    .attr('class', 'provincie')
    .attr('d', pathGenerator)
    .append('title')
    .text()
    
    const dashboardURL="https://docs.google.com/spreadsheets/d/e/2PACX-1vRWbcLP_nYqgbSj8ONiIay7HSmAlW37PMCUFW607PiLilUpPTOYAwzyFEXQOrgUdJwXx6mlaMN9PEvw/pub?gid=1884793021&single=true&output=csv"

    async function fetch(url) {
        const data = await d3.csv(url);
        return data;
    }

 makeBarChart()

 async function makeBarChart() {
    const deData = await fetch(dashboardURL)
    const xValuePartij = deData.map(function(d) { return d.partij })
    const xValueGender = deData.map(function(d) { return d.gender })

    const margin = {top: 50, bottom: 20, left: 40, right: 20}
    const xScalePartij = d3.scaleBand()
                     .domain(xValuePartij)
                     .rangeRound([0, 600])
                     .padding(0.1)
    const xScaleGender = d3.scaleBand()
                     .domain(xValueGender)
                     .rangeRound([0, xScalePartij.bandwidth()])
                     .padding(0.1)
    const yScale = d3.scaleLinear()
                     .domain([0,10])
                     .range([300,0])

    let manData = []
    let vrouwData = []
    
    const cleanedData = deData.map(d => {
                        if(isNaN(d["percentage totaal"])) {
                            d["percentage totaal"] = +d["percentage totaal"].toString().replace(/,/g,".")
                        
                        } else {
                            d["percentage totaal"] = d["percentage totaal"]
                        }
                        return d
                    })
                    
    cleanedData.forEach(d => {
                         if(d.gender == "man"){
                         var tempObj = {age: d.age, partij: d.partij, geo: d.geo, man: d["percentage totaal"]}
                         manData.push(tempObj)
                         } else {
                            var tempObj = {age: d.age, partij: d.partij, geo: d.geo, vrouw: d["percentage totaal"]}
                            vrouwData.push(tempObj)
                         }
                     })

    const xAxis = d3.axisBottom(xScalePartij)
                    
    const yAxis = d3.axisLeft(yScale)
                    .tickSize(-600)
                    .tickFormat(function(d){return d+ "%"})
    
    
    const container = d3.select('#barchart')
        .append('svg')
        .classed('container', true)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    
    const yAxisG = container.append('g').call(yAxis)
    
    const xAxisG = container.append('g').call(xAxis)
                 .attr('transform', `translate(0,300)`)
        
    
        xAxisG.selectAll('.tick line').remove()  
    
    
    
        container.append('text')
                 .classed('title', true)
                 .attr('x', -8)
                 .attr('y', -20)
    
    const selectOption = document.getElementById("select")
    
   
    let provincieSelectie
    

    g.selectAll('.provincie').on('click', clicked)
   
    makeBar(selectOption.value, "Drenthe")


    function myFunc() {return provincieSelectie}
    selectOption.addEventListener('change', (e) => {
        
        makeBar(selectOption.value, myFunc())
    })

    function clicked (d) {

        provincieSelectie = d.properties.statnaam
        myFunc()
    }
    function makeBar(selectedAge, selectedProvincie) {
        
        function filterArray (d) {
            
            if (d.age == selectedAge && d.geo == selectedProvincie) {
                return d
            }
        } 

        var newManArray = manData.filter(filterArray)
        var newWomanArray = vrouwData.filter(filterArray)

        console.log(newManArray)
        const rectMale = container.selectAll('.man').data(newManArray)
     container
        .selectAll('.man').transition().duration(1000)
        .attr('y', d => yScale(d.man))
        .attr('height', d => 300 - yScale(d.man))
        rectMale.enter()
        .append('rect')
        .attr('class', 'man')
        .attr('width', xScalePartij.bandwidth()/2)
        .attr('height', d => 300 - yScale(d.man))
        .attr('x', d => xScalePartij(d.partij))
        .attr('y', d => yScale(d.man))
        .attr('fill', "#3486B8")

        .exit().remove()
    
        const rectWoman = container.selectAll(".vrouw").data(newWomanArray)
    container
        .selectAll('.vrouw').transition().duration(1000)
        .attr('y', d => yScale(d.vrouw))
        .attr('height', d => 300 - yScale(d.vrouw))
        rectWoman.enter()
        .append('rect')
        .attr('class', 'vrouw')
        .attr('width', xScalePartij.bandwidth()/2)
        .attr('height', d => 300 - yScale(d.vrouw))
        .attr('x', d => xScalePartij(d.partij) + xScalePartij.bandwidth()/2)
        .attr('y', d => yScale(d.vrouw))
        .attr('fill', "#CE25BE")

        .exit().remove()
}
    }}
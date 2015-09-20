function drawGraph(datePriceObject) {
	var flightInfo = separateJSON(datePriceObject, 'flight');
	var hotelInfo = separateJSON(datePriceObject, 'hotel');

	var totalPrices = [];
	for (var i=0; i < flightInfo.prices.length; i++) {
		var sum = parseFloat(flightInfo.prices[i]) + parseFloat(hotelInfo.prices[i]);
		totalPrices.push(sum.round(2));
	}

	var ctx = document.getElementById("myChart").getContext("2d");

	var data = {
	    labels: flightInfo.dates,
	    datasets: [
	        {
	            label: "Total",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: totalPrices
	        },
	        {
	            label: "Hotel",
	            fillColor: "rgba(200,200,215,0.2)",
	            strokeColor: "rgba(200,200,215,1)",
	            pointColor: "rgba(200,200,215,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(200,200,215,1)",
	            data: hotelInfo.prices
	        },
	        {
	            label: "Flight",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: flightInfo.prices
	        },
	    ]
	};

	var myLineChart = new Chart(ctx).Line(data, {
		//responsive : true,
	    animation: true,
	    tooltipFillColor: "rgba(0,0,0,0.8)",                
	    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
	});
}

function separateJSON(datePriceObject, parameter) {
	var data = datePriceObject[parameter];

    data = data.sort(function(a, b) {
    	a_split = a.date.split('-');
    	b_split = b.date.split('-');
    	if (a_split[0] < b_split[0]) {
    		return -1;
    	} else if (a_split[0] > b_split[0]) {
    		return 1;
    	} else {
    		if (a_split[1] < b_split[1]) {
	    		return -1;
	    	} else if (a_split[1] > b_split[1]) {
	    		return 1;
	    	} else {
	    		if (a_split[2] < b_split[2]) {
		    		return -1;
		    	} else if (a_split[2] > b_split[2]) {
		    		return 1;
		    	} else {
		    		return 0;
		    	}
	    	}

    	}
    });
 
 	var dates = [];
 	var prices = [];
	$.each(data, function(key, value) {
		dates.push(value.date);
		prices.push(value.price);
	});
	return {
		'dates': dates,
		'prices': prices,
	}
}

Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};
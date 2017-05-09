var app = angular.module("scheduleApp");

app.service("scheduleService",function($http){
	this.getSchedule = function() {
		return $http.get("/api/mschedule").then(function(response){
			return response.data;
		})
	}
	
	this.getScheduleContent = function(date) {
		return $http.get("/api/mschedule/content?date=" + date);
	}
	
	this.postSchedule = function(newitem) {
		
//		newitem.date = new Date(newitem.date);
//		newitem.date = newitem.date.toString();
//		console.log(newitem.date);
		
		
		return $http.post("/api/mschedule", newitem).then(function(response){
//			response.data.date = new Date(response.data.date);
//			console.toLocaleString(response.data)
			return response.data;
		})
	}
		
	
	this.removeSchedule = function(id) {
		return $http.delete("/api/mschedule/" + id).then(function(response){
			return "you item has been deleted";
		})
	}
	
	
	this.saveSchedule = function(newitem) {
		return $http.put("/api/mschedule/"+ newitem._id, newitem).then(function(response){
			return response.data;
		})
	}
});


app.service("mapservice",function($http) {
	
	var config = {
		headers:{
	'X-Mashape-Key':'dfnU4hYGHxmshVKRvFYPvQND3Cfdp1sXuUpjsnhzljyW6zmpc0'	
		}

		
	};
	
	this.getMapdata1 = function(mapdata) {
		var url = 'https://michele-zonca-google-geocoding.p.mashape.com/geocode/json?address=' + mapdata;
		return $http.get(url,config).then(function(response){
//			console.log(response.data);
			return response.data;			
		});
	}
	
	
})


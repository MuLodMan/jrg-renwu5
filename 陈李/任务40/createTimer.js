function createTimer(){

    var timer = {

    	start: function(){
    		this.t1 = Date.now()
    	},

    	end: function(){
    		this.t2 = Date.now()
    	},

    	get: function(){
    		var diff = this.t2 - this.t1
    		return diff
    	}
    }

    return timer

}

var timer1 = createTimer();
var timer2 = createTimer();
timer1.start();
for(var i=0;i<100;i++){
    console.log(i);
}
timer2.start();
for(var i=0;i<100;i++){
    console.log(i);
}
timer1.end();
timer2.end();
console.log(timer1.get());
console.log(timer2.get());
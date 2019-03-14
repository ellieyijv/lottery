export default class Timer {
   
    countDown(end, update, handle){
        let restTime = end - ((new Date()).getTime())
       
        if(restTime <= 0){
            handle()
        }else{
            const day = 24*60*60*1000;
            const hour = 60*60*1000;
            const minute = 60*1000;
            const second = 1000;
            let last_day = Math.floor(restTime/day);
            let last_hour = Math.floor((restTime - last_day*day)/hour);
            let last_minute = Math.floor((restTime - last_day*day - last_hour*hour)/minute);
            let last_second = Math.floor((restTime - last_day*day - last_hour*hour - last_minute*minute)/second);
            let showTimeArr = [];
            if(last_day>0){
                showTimeArr.push(`${last_day}day`);
            }
            if(showTimeArr.length || last_hour>0){
                showTimeArr.push(`${last_hour}hours`);
            }
            if(showTimeArr.length || last_minute>0){
                showTimeArr.push(`${last_minute}minutes`);
            }
            if(showTimeArr.length || last_second>0){
                showTimeArr.push(`${last_second}seconds`);
            }
            this.last_time = showTimeArr.join(' ');
            update(this.last_time);
            setTimeout(()=> {
                this.countDown(end, update, handle)
                
            }, 1000)
            
        }
    }
}


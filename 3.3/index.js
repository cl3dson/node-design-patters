import {EventEmitter} from 'events'

class TimedEventEmitter extends EventEmitter {
  constructor(limit, callback){
    super()
    this.maximumMs = limit
    this.callback = callback
    this.reachedLimit = false
    this.totalTicks = 0
  }

  emitError(){
     const error = new Error("Error: timestamp is divisible by 5")
     this.emit('error', error )
     this.callback(error, this.totalTicks)
  }
  
  init(){
    setImmediate(() => {
      const timestamp = Date.now()
      if(timestamp%5 === 0){
        this.emitError()
      }else {
        this.emit("tick")
      }
    })
    
    
    const interval = setInterval(() => {
      if(!this.reachedLimit){
        const timestamp = Date.now()
        if(timestamp%5 === 0){
           this.emitError()
        }else{
            this.emit("tick")
        this.totalTicks+=1
        }
      }
    }, 50)
    
    setTimeout(() => {
      clearInterval(interval)
      this.reachedLimit = true
      this.callback(null, this.totalTicks)
    }, this.maximumMs)
    

    return this
  }
}

const emitterBuilder = (maximumMs, callback) => {
  const emitter = new TimedEventEmitter(maximumMs, callback)

  emitter.on('error', (err) => console.log(err))
  
  return emitter.init()
}

emitterBuilder(1000, (error, ticks) => {
  if(error){
    console.log("error happened");
  }
  else{
    console.log(`${ticks} have passed`)
  }
});
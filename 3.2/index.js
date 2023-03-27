import {EventEmitter} from 'events'

class TimedEventEmitter extends EventEmitter {
  constructor(limit, callback){
    super()
    this.maximumMs = limit
    this.callback = callback
    this.reachedLimit = false
    this.totalTicks = 0
  }

  init(){

    const interval = setInterval(() => {
      if(!this.reachedLimit){
        this.emit("tick")
        this.totalTicks+=1
      }
    }, 50)
    
    setTimeout(() => {
      clearInterval(interval)
      this.reachedLimit = true
      this.callback(this.totalTicks)
    }, this.maximumMs)
    

    return this
  }
}

const emitterBuilder = (maximumMs, callback) => {
  const emitter = new TimedEventEmitter(maximumMs, callback)
  return emitter.init()
}

emitterBuilder(1000, (ticks) => console.log(`${ticks} have passed`));
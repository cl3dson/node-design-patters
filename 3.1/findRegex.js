import { EventEmitter} from 'events'
import { readFileSync } from 'fs'

export class FindRegex extends EventEmitter {
    
    constructor(regex){
        super()
        this.regex = regex;
        this.files = []
    }
    
    addFile(path){
        this.files.push(path)
        return this
    }
    
    find(){
        this.emit("regex_find_started", this.files)
        for(const file of this.files ){
            let data
            try {
              data = readFileSync(file, 'utf8')
            } catch (e) {
              this.emit("read_file_failed", e)
              return this
            }

            this.emit("file_read_success", file, data)

            const matches = data.match(this.regex)
            if(matches){
              for(const match of matches){
                this.emit("match_found", file, match)
              }
            }
        }
    }
}
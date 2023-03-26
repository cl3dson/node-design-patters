import {FindRegex} from './findRegex.js'

const matcherInstance = new FindRegex("Cledson");

matcherInstance.addFile("./test1")

matcherInstance.on("regex_find_started", (files) => {
  console.log("find started on files " + files)
})

matcherInstance.find()



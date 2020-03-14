

async function createServer() {
  return {
    test: 1
  }
}


const server = createServer()
  .then(server => {
    console.log(server)
  })


console.log(server)

let test = {
  test,
  test2
}


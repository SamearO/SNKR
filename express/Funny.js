function sendEmail(user){
    console.log("EMAIL SENT")
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

let users = ["bob", "dave", "mary", "jan", "alex", "steve", "andrew", "pop"]

let restrains = [["bob", "jan"], ["dave", "mary"], ["alex", "andrew"], ["steve", "pop"]]

function match(users, restraints){

    if(restrains.length == 0)
    console.log("NO FAMILY ENTERED")
    if(restraints.length == 1)
    console.log("ONLY ONE FAMILY")

}


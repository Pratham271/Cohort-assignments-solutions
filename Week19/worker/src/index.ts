import { createClient } from "redis";

const client = createClient()

async function processSubmission(submission:string){
    const { problemId, userId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId} and userId ${userId}`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    await new Promise(resolve => setTimeout(resolve,1000))
    console.log(`Finished processing submission for problemId ${problemId}.`);
    client.publish("problem_done", JSON.stringify({ problemId,userId, status: "TLE" }));

}

async function startWorker(){
    try {
        await client.connect()
        console.log("Worker connected to Redis")

        while(true){
            try {
                const submission = await client.brPop("problems", 0)
                // @ts-ignore
                await processSubmission(submission.element)
            } catch (error) {
                console.log("Error processing submission",error)
                 // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }

    } catch (error) {
        console.log("Failed to connect to redis",error)
    }  
}

startWorker()
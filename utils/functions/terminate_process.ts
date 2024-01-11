import { Server } from "http";

// Define an interface for the options
interface TerminateOptions {
  coredump: boolean;
  timeout: number;
}

export const terminateProcess = (server: Server, options: TerminateOptions = { coredump: false, timeout: 500 }) => {
  // Exit function
  const exit = (code: number): void => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err?: Error) => {
    if (err && err instanceof Error) 
    {
      console.log(`-------AN ERROR OCCURRED---------, Error message: ${err.message}, Error stack: ${err.stack}, Reason of killing the process : ${reason}`);
    }

    // Attempt a graceful shutdown
    server.close(() => exit(code));
    setTimeout(() => exit(code), options.timeout).unref();
  };
};

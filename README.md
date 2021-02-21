![dashboard](./dashboard.png)

### dev w/ vscode:
```
clj -M:repl:dev:scratch
```
Command palette (SHIFT+CTRL+P):   
**Calva: Connect to a running REPL server in your project**   
\> **Clojure CLI**
\> **localhost:xxxx**   

Load current file and dependencies: **CTRL+ALT+C + Enter**
Evaluate current form: **CTRL+Enter**

Experiment in scratch/scratch.clj

### test watch
```
clj -M:test/watch
```

### test
```
clj -M:test
```

### prod (temporary – build jar later)

clj -M:prod -m app.prod

### TODO: oauth & google drive
maybe helpful:
https://stackoverflow.com/questions/28078490/google-drive-oauth2-without-browser

### dev in Raspberry Pi

Mount host machine directory to RPi
```
sshfs user@host:/host/directory /rpi/directory
```

- connect via SSH
- set the terminal session to use the RPi's display
- start the application in REPL
```
$ ssh user@host
$ export DISPLAY=:0
$ clj -M:repl:dev:scratch
```

Tunnel ports in another terminal window on host machine
```
$ ssh -L :5555:localhost:5555 remoteuser@remotehost -p 22 -N -v
```

and connect to the REPL via editor!

### other

Raspberry Pi cannot show a jpg image??? I wonder what the issue is. JavaFX?

Do this for event handlers: https://github.com/cljfx/cljfx/blob/master/examples/e15_task_tracker.clj#L53-L63

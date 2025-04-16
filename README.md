### app-ts
the _home dashboard_ app, running on a Raspberry Pi, 11" screen

![ui](./home-dashboard-ui.png)

### mobile
Controls the app

### server
Provides an API for the app

### more
MQTT broker runs on the Raspberry Pi.

Everything is contained within the local network.

---

Run this on raspberry pi:
```sh
$ mosquitto -p 1884 -d
```

Also run this on raspberry pi (zrcni/temperature-reader repo)
```sh
$ job.sh
```

and finally start home dashboard with app-ts folder's start_remote.sh

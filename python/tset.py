from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler

def on_created(event):
    print(f"hey, {event.src_path} has been created!")

def on_deleted(event):
    print(f"what the f**k! Someone deleted {event.src_path}!")

def on_modified(event):
    # print(f"hey buddy, {event.src_path} has been modified")
    lastline = lire_fichier(event.src_path)
    # print(lastline)
    lastlinesp = lastline.split(" ")
    rsitime = lastlinesp[0].replace(":","")
    # print(rsitime)
    istime = time.localtime(int(rsitime))
    print(f"{istime.tm_hour}: {istime.tm_min}")
    print(lastlinesp)
    if "connected" in lastline:
        print(f"connected {lastlinesp[5]} {lastlinesp[7]}\n")
        # print(lastlinesp)
    if "disconnct" in lastline:
        print(f"disconnct {lastlinesp[2]} \n")
        # print(lastlinesp)
    if "closed" in lastline:
        print(f"closed {lastlinesp[2]} \n")
        # print(lastlinesp, "\n")

def on_moved(event):
    print(f"ok ok ok, someone moved {event.src_path} to {event.dest_path}")



if __name__ == "__main__":
    my_event_handler = FileSystemEventHandler()

my_event_handler.on_created = on_created
my_event_handler.on_deleted = on_deleted
my_event_handler.on_modified = on_modified
my_event_handler.on_moved = on_moved

path = "/var/log/mosquitto/mosquitto.log"
go_recursively = True
my_observer = Observer()
my_observer.schedule(my_event_handler, path, recursive=go_recursively)
my_observer.start()
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    my_observer.stop()
    my_observer.join()
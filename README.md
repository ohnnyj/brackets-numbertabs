Number Tabs Extension for Brackets
---

Toggle between documents using:

* Active Pane: Cmd/Ctrl + #(1-9)
* Inactive Pane: Opt/Alt + #(1-9)

####Key Bindings####
This may be helpful for international (i.e. non-English) keyboards.
You can override the keybinding in your keymap.json file (Debug -> Open User Key Map).

The keys follow this pattern:

ohnny.numbertabs.(active|inactive).[1-9].

So, if you wanted to override the behaviour for the first tab of the active pane you would have:

```JavaScript
"overrides": {
  "Cmd-Shift-1":     "ohnnyj.numbertabs.active.1"
}
```

####Release Notes:

**0.0.5**

* Change from Opt/Alt + Cmd/Ctrl to just Opt/Alt for switching from active to inactive pane.

**0.0.4**

* Adds support for jumping between panes.

![Screenshot](https://raw.githubusercontent.com/ohnnyj/brackets-numbertabs/master/screenshot.jpg)

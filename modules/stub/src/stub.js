window.__gpp_addFrame = function (n) {
  if (!window.frames[n]) {
    if (document.body) {
      var i = document.createElement("iframe");
      i.style.cssText = "display:none";
      i.name = n;
      document.body.appendChild(i);
    } else {
      window.setTimeout(window.__gppaddFrame, 10, n);
    }
  }
};
window.__gpp_stub = function () {
  var b = arguments;
  __gpp.queue = __gpp.queue || [];
  __gpp.events = __gpp.events || [];

  if (!b.length || (b.length == 1 && b[0] == "queue")) {
    return __gpp.queue;
  }

  if (b.length == 1 && b[0] == "events") {
    return __gpp.events;
  }

  var cmd = b[0];
  var clb = b.length > 1 ? b[1] : null;
  var par = b.length > 2 ? b[2] : null;
  if (cmd === "ping") {
    return {
      gppVersion: "1.0", // must be “Version.Subversion”, current: “1.0”
      cmpStatus: "stub", // possible values: stub, loading, loaded, error
      cmpDisplayStatus: "hidden", // possible values: hidden, visible, disabled
      supportedAPIs: ["tcfeuv2", "tcfcav2", "uspv1"], // list of supported APIs
      cmpId: 31, // IAB assigned CMP ID, may be 0 during stub/loading
    };
  } else if (cmd === "addEventListener") {
    if (!("lastId" in __gpp)) {
      __gpp.lastId = 0;
    }
    __gpp.lastId++;
    var lnr = __gpp.lastId;
    __gpp.events.push({
      id: lnr,
      callback: clb,
      parameter: par,
    });
    return {
      eventName: "listenerRegistered",
      listenerId: lnr, // Registered ID of the listener
      data: true, // positive signal
      pingData: {
        gppVersion: "1.0",
        cmpStatus: "stub",
        cmpDisplayStatus: "hidden",
        supportedAPIs: ["tcfeuv2", "tcfva", "usnat"],
        cmpId: 31,
      },
    };
  } else if (cmd === "removeEventListener") {
    var success = false;
    for (var i = 0; i < __gpp.events.length; i++) {
      if (__gpp.events[i].id == par) {
        __gpp.events.splice(i, 1);
        success = true;
        break;
      }
    }
    return {
      eventName: "listenerRemoved",
      listenerId: par, // Registered ID of the listener
      data: success, // status info
      pingData: {
        gppVersion: "1.0",
        cmpStatus: "stub",
        cmpDisplayStatus: "hidden",
        supportedAPIs: ["tcfeuv2", "tcfva", "usnat"],
        cmpId: 31,
      },
    };
  } else if (cmd === "getGPPData") {
    //return null; //CMPs can decide to return null during load
    return {
      sectionId: 3,
      gppVersion: 1,
      sectionList: [],
      applicableSections: [0] /*may be filled by publisher*/,
      gppString: "",
      pingData: {
        gppVersion: "1.0",
        cmpStatus: "stub",
        cmpDisplayStatus: "hidden",
        supportedAPIs: ["tcfeuv2", "tcfva", "usnat"],
        cmpId: 31,
      },
    };
  }
  //these commands must not be queued but may return null while in stub-mode
  else if (cmd === "hasSection" || cmd === "getSection" || cmd === "getField") {
    return null;
  }
  //queue all other commands
  else {
    __gpp.queue.push([].slice.apply(b));
  }
};
window.__gpp_msghandler = function (event) {
  var msgIsString = typeof event.data === "string";
  try {
    var json = msgIsString ? JSON.parse(event.data) : event.data;
  } catch (e) {
    var json = null;
  }
  if (typeof json === "object" && json !== null && "__gppCall" in json) {
    var i = json.__gppCall;
    window.__gpp(
      i.command,
      function (retValue, success) {
        var returnMsg = {
          __gppReturn: {
            returnValue: retValue,
            success: success,
            callId: i.callId,
          },
        };
        event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, "*");
      },
      "parameter" in i ? i.parameter : null,
      "version" in i ? i.version : 1
    );
  }
};
if (!("__gpp" in window) || typeof window.__gpp !== "function") {
  window.__gpp = window.__gpp_stub;
  window.addEventListener("message", window.__gpp_msghandler, false);
  window.__gpp_addFrame("__gppLocator");
}

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
  if (!b.length) {
    return __gpp.queue;
  }
  var cmd = b[0];
  var clb = b.length > 1 ? b[1] : null;
  var par = b.length > 2 ? b[2] : null;
  if (cmd === "ping") {
    return {
      gppVersion: "1.0", // must be “Version.Subversion”, current: “1.0”
      cmpStatus: "stub", // possible values: stub, loading, loaded, error
      cmpDisplayStatus: "hidden", // possible values: hidden, visible, disabled
      apiSupport: ["tcfeuv2", "tcfcav2", "uspv1"], // list of supported APIs
      currentAPI: "", // name of detected API once CMP is loaded
      cmpId: 0, // IAB assigned CMP ID, may be 0 during stub/loading
    };
  } else if (cmd === "addEventListener") {
    __gpp.events = __gpp.events || [];
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
    };
  } else if (cmd === "removeEventListener") {
    var success = false;
    __gpp.events = __gpp.events || [];
    for (var i = 0; i < __gpp.events.length; i++) {
      if (__gpp.events[i].id == par) {
        __gpp.events[i].splice(i, 1);
        success = true;
        break;
      }
    }
    return {
      eventName: "listenerRemoved",
      listenerId: par, // Registered ID of the listener
      data: success, // status info
    };
  }
  //these commands must not be queued but may return null while in stub-mode
  else if (cmd === "hasSection" || cmd === "getSection" || cmd === "getField" || cmd === "getGPPData") {
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
      i.parameter
    );
  }
};
if (!("__gpp" in window) || typeof window.__gpp !== "function") {
  window.__gpp = window.__gpp_stub;
  window.addEventListener("message", window.__gpp_msghandler, false);
  window.__gpp_addFrame("__gppLocator");
}

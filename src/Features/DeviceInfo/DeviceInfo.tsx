import React from 'react';

type DeviceInfo = {
    hostType?: "desktop-browser" | "mobile-browser" | "mobile-webview";
    deviceType?: "mobile" | "desktop";
    deviceName?: "IPhone" | "IPad" | "IPod" | "Android" | "WebOS";
}

function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>();

  const getIOSDevice = (): "IPhone" | "IPad" | "IPod" | undefined => {
    const { userAgent } = navigator;
    if(Boolean(userAgent.match(/iPhone/))) {
       return "IPhone";
    }

    if(Boolean(userAgent.match(/iPad/))) {
        return "IPad";
    }

    if(Boolean(userAgent.match(/iPod/))) {
        return "IPod";
    }

    return;
  }
  const getDeviceInfo = () => {
    const { userAgent } = navigator;
    if(Boolean(userAgent.match(/; wv/))) {
        setDeviceInfo({
            hostType: "mobile-webview",
            deviceType: "mobile",
            deviceName: "Android",
        })
        return;
     }

     if(Boolean(userAgent.match(/Android/))) {
        setDeviceInfo({
            hostType: "mobile-browser",
            deviceType: "mobile",
            deviceName: "Android",
        })
        return;
     }

    
    const iosDevice = getIOSDevice();

     if(iosDevice && Boolean(userAgent.match(/Mobile\/(?!.*Safari)/))) {
        setDeviceInfo({
            hostType: "mobile-webview",
            deviceType: "mobile",
            deviceName: iosDevice,
        })
        return;
     } 

     if(iosDevice) {
        setDeviceInfo({
            hostType: "mobile-browser",
            deviceType: "mobile",
            deviceName: iosDevice,
        })
        return;
     }

     if(!Boolean(userAgent.match(/Mobi/))) {
        setDeviceInfo({
            hostType: "desktop-browser",
            deviceType: "desktop",
            deviceName: "WebOS",
        })
        return;
     }

  }
  React.useEffect(getDeviceInfo, []);
  return (
    <div className="DeviceInfo">
      <b>{deviceInfo?.hostType}</b>
      <br />
      <b>{deviceInfo?.deviceType}</b>
      <br />
      <b>{deviceInfo?.deviceName}</b>
    </div>
  );
}

export default DeviceInfo;

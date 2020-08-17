import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  deviceListObj  = {
    "total_results":49,
    "search_results":[
      {
        "device_id":"834ASDFASD9834",
        "serial_num":"00003434ASDFADF",
        "device_name":"ADennis_SLB",
        "created_at":"2019-11-06T21:28:18.071Z",
        "updated_at":"2019-12-06T22:42:16.649Z",
        "last_contacted":"2019-12-06T22:46:09.644Z",
        "device_cap":[
          {
            "feature":"reboot",
            "product_family":"SLB"
          },
          {
            "feature":"shutdown",
            "product_family":"SLC"
          },
          {
            "feature":"firmware",
            "product_family":"SLB"
          },
          {
            "feature":"config",
            "product_family":"SLB"
          }
        ]
      },
      {
        "device_id":"89837ASDF23",
        "serial_num":"ASDF98932AAS",
        "device_name":"EMG75_AK",
        "created_at":"2020-02-25T00:00:30.95Z",
        "updated_at":"2020-03-05T01:39:39.208Z",
        "last_contacted":"2020-03-05T01:39:59.159Z",
        "device_cap":[
          {
            "feature":"reboot"
          },
          {
            "feature":"shutdown",
            "product_family":"SLB"
          },
          {
            "feature":"firmware",
            "product_family":"EMG7500"
          },
          {
            "feature":"config",
            "product_family":"EMG7500"
          }
        ]
      },
      {
        "device_id":"UJASDUF98798JASDF",
        "serial_num":"13445ASD323SS",
        "device_name":"SLC_4fb6",
        "created_at":"2020-03-19T08:14:56.04Z",
        "updated_at":"2020-03-19T08:14:56.04Z",
        "last_contacted":"2020-03-19T10:11:46.269Z",
        "device_cap":[
          {
            "feature":"reboot",
            "product_family":"SLC"
          },
          {
            "feature":"shutdown",
            "product_family":"SLC200"
          },
          {
            "feature":"firmware",
            "product_family":"SLB"
          },
          {
            "feature":"config",
            "product_family":"SLB"
          }
        ]
      },
      {
        "device_id":"00204AI75HE1XXFFAS",
        "serial_num":"JKDIUHD3AS",
        "device_name":"GlennSLC8000",
        "created_at":"2019-03-28T16:20:09.367Z",
        "updated_at":"2020-05-01T18:53:14.493Z",
        "last_contacted":"2020-05-01T19:52:43.556Z",
        "device_cap":[
          {
            "feature":"reboot",
            "product_family":"SLC200"
          },
          {
            "feature":"shutdown",
            "product_family":"SLC200"
          },
          {
            "feature":"firmware",
            "product_family":"SLC"
          },
          {
            "feature":"config",
            "product_family":"SLC"
          }
        ]
      },
      {
        "device_id":"00204AI75HE1XXAAAFFAS",
        "serial_num":"JKDIUAAAHD3AS",
        "device_name":"JOHNSLC8000",
        "created_at":"2019-03-28T16:20:09.367Z",
        "updated_at":"2020-05-01T18:53:14.493Z",
        "last_contacted":"2020-05-01T19:52:43.556Z",
        "device_cap":[
          {
            "feature":"reboot",
            "product_family":"SLC"
          },
          {
            "feature":"shutdown",
            "product_family":"SLB"
          },
          {
            "feature":"firmware",
            "product_family":"SLC200"
          },
          {
            "feature":"config",
            "product_family":"SLC"
          }
        ]
      }
    ]
  };
  deviceList :any[] = [];
  multiSel: boolean = false;
  singleSel: boolean = false;
  deviceData: any[] = [];
  isRebootVisible: boolean = false;
  isShutdownVisible: boolean = false;
  isFirmwareVisible: boolean = false;
  isConfigVisible: boolean = false;
  constructor() {
    this.deviceList = this.deviceListObj?.search_results;
  }

  ngOnInit(): void {
  }

  selectAll() {
    if(this.multiSel) {
      this.deviceData = [];

      this.isRebootVisible = true;
      this.isShutdownVisible = true;
      this.isFirmwareVisible = true;
      this.isConfigVisible = true;
      this.deviceList.forEach((dev) => {
        dev.singleSel = true;
      });
      this.deviceData = this.deviceList;

    } else {
      this.deviceData = [];
      this.isRebootVisible = false;
      this.isShutdownVisible = false;
      this.isFirmwareVisible = false;
      this.isConfigVisible = false;
      this.deviceList.forEach((dev) => {
        dev.singleSel = false;
      });
    }
    console.log('multi device data', this.deviceData);
  }

  selectOne(deviceIndex: number, device) {
    if(device.singleSel) {
      this.deviceData.push(device);
    } else if(!device.singleSel) {
      this.deviceData.splice(deviceIndex, 1);
    }
    let rebootList = [];
    let shutdownList = [];
    let firmwareList = [];
    let configList = [];

      this.deviceData.forEach((dev) => {
        if(dev.device_cap[0].feature === 'reboot' && dev.device_cap[0]?.product_family) {
          rebootList.push(dev.device_cap[0].product_family);
        }
        if(dev.device_cap[1].feature === 'shutdown' && dev.device_cap[1]?.product_family) {
          shutdownList.push(dev.device_cap[1].product_family);
        }
        if(dev.device_cap[2].feature === 'firmware' && dev.device_cap[2]?.product_family) {
          firmwareList.push(dev.device_cap[2].product_family);
        }
        if(dev.device_cap[3].feature === 'config' && dev.device_cap[3]?.product_family) {
          configList.push(dev.device_cap[3].product_family);
        }
      });
      console.log('dev rebootList is....', rebootList);
    console.log('dev shutdownList is....', shutdownList);
    console.log('dev firmwareList is....', firmwareList);
    console.log('dev configList is....', configList);
    let rebootDuplicates = [];
    let shutdownDuplicates = [];
    let firmwareDuplicates = [];
    let configDuplicates = [];
    if (rebootList.length > 1) {
      rebootDuplicates = rebootList.filter((item) => {
        return rebootList.indexOf(item) !== rebootList.lastIndexOf(item);
      });
      console.log('rebootDuplicates res is....', rebootDuplicates);
    }
    if (shutdownList.length > 1) {
      shutdownDuplicates = shutdownList.filter((item) => {
        return shutdownList.indexOf(item) !== shutdownList.lastIndexOf(item);
      });
      console.log('shutdownDuplicates res is....', shutdownDuplicates);
    }
    if (firmwareList.length > 1) {
      firmwareDuplicates = firmwareList.filter((item) => {
        return firmwareList.indexOf(item) !== firmwareList.lastIndexOf(item);
      });
      console.log('firmwareDuplicates res is....', firmwareDuplicates);
    }
    if (configList.length > 1) {
      configDuplicates = configList.filter((item) => {
        return configList.indexOf(item) !== configList.lastIndexOf(item);
      });
      console.log('configDuplicates res is....', configDuplicates);
    }
    this.isRebootVisible = rebootDuplicates.length>1 ? true : false;
    this.isShutdownVisible = shutdownDuplicates.length>1 ? true : false;
    this.isFirmwareVisible = firmwareDuplicates.length>1 ? true : false;
    this.isConfigVisible = configDuplicates.length>1 ? true : false;
  }

  //Filter
  rebootFamily() {
    let resList = [];
    this.deviceList.forEach((dev) => {
      if(dev.device_cap[0].feature === 'reboot' && dev.device_cap[0]?.product_family) {
        resList.push(dev);
      }
    });
  }

  shutDownFamily() {

  }

  firmwareFamily() {

  }

  configFamily() {

  }
}

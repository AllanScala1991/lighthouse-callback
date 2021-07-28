const Log = require('lighthouse-logger');

export default class PrinterService {
  private result;

  constructor () {
    this.result = '\n';
  }

  group(val, breaks = 0) {
    this.result+= `${Log.bold}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  title(val, breaks = 0) {
    this.result+= `${Log.bold}${Log.dim}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  subtitle(val, breaks = 0) {
    this.result+= `${Log.dim}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  warning(val, breaks = 0) {
    this.result+= `${Log.yellow}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  danger(val, breaks = 0) {
    this.result+= `${Log.red}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  success(val, breaks = 0) {
    this.result+= `${Log.green}${val}${Log.reset}`;
    if (breaks > 0) this.break(breaks);
  }

  break(times = 1) {
    for(let i=0;i < times;i++) {
      this.result+= `\n`;
    }
  }

  print() {
    console.log(this.result);
  }
}